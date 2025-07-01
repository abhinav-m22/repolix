'use server'

import { db } from '@/server/db';
import { getCommitHashes } from '@/lib/github';
import { loadGithubRepo } from '@/lib/github-loader';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

async function generateGuideSection(docs: any[], context: string, prompt: string) {
    try {
        const relevantContent = docs
            .filter(doc => doc.pageContent && doc.pageContent.length > 0)
            .map(doc => `File: ${doc.metadata.source}\n${doc.pageContent}`)
            .join('\n\n')
            .slice(0, 30000); // Limit content length

        const response = await model.generateContent([
            `You are an expert programmer analyzing a GitHub repository. ${context}
             
             Based on the following repository content, ${prompt}
             
             Keep your response clear, concise, and actionable. Use professional language.
             Focus on the most important information that will help new contributors.
             
             Repository content:
             ${relevantContent}`,
        ]);

        return response.response.text();
    } catch (error) {
        console.error('Error generating guide section:', error);
        return 'Information not available.';
    }
}

async function analyzeDependencies(docs: any[]) {
    const packageFiles = docs.filter(doc =>
        doc.metadata.source.match(/package\.json$|requirements\.txt$|Gemfile$|build\.gradle$/i)
    );

    if (packageFiles.length === 0) {
        return [];
    }

    try {
        const response = await model.generateContent([
            `Analyze these dependency files and list the key dependencies and their purposes:
             
             ${packageFiles.map(doc => `File: ${doc.metadata.source}\n${doc.pageContent}`).join('\n\n')}
             
             Format your response as a JSON array of objects with 'name' and 'purpose' properties.
             Include only the most important dependencies. Limit to 10 items.`
        ]);

        const result = JSON.parse(response.response.text());
        return Array.isArray(result) ? result : [];
    } catch {
        return [];
    }
}

export async function getOnboardingSummary(projectId: string) {
    try {
        // First, try to get cached summary
        const cached = await db.onboardingSummary.findUnique({
            where: { projectId }
        });

        if (cached) {
            return {
                success: true,
                data: cached,
                cached: true
            };
        }

        // If not cached, fetch project info
        const project = await db.project.findUnique({
            where: { id: projectId }
        });

        if (!project) {
            throw new Error('Project not found');
        }

        // Generate new summary
        const commits = await getCommitHashes(project.githubUrl);
        const docs = await loadGithubRepo(project.githubUrl, project.githubToken || undefined);

        // Generate comprehensive guide sections
        const [
            about,
            architecture,
            codeStyle,
            testing,
            deployment,
            contributing
        ] = await Promise.all([
            generateGuideSection(docs,
                'Provide a project overview.',
                'summarize what this project does, its main features, and its current status.'
            ),
            generateGuideSection(docs,
                'Analyze the system architecture.',
                'explain the high-level architecture, main components, and how they interact.'
            ),
            generateGuideSection(docs,
                'Review the code style.',
                'describe the coding standards, conventions, and best practices used in this project.'
            ),
            generateGuideSection(docs,
                'Examine testing practices.',
                'explain how testing is done, what frameworks are used, and how to write and run tests.'
            ),
            generateGuideSection(docs,
                'Look at deployment processes.',
                'describe how the project is deployed, including environments and CI/CD if present.'
            ),
            generateGuideSection(docs,
                'Focus on contribution workflow.',
                'explain the step-by-step process for making contributions, from forking to submitting PRs.'
            )
        ]);

        // Analyze key folders
        const keyFolders = Array.from(new Set(docs.map((doc: any) => {
            const parts = doc.metadata.source.split('/');
            return parts.length > 1 ? `${parts[0]}/${parts[1]}` : parts[0];
        })))
            .filter(folder => !folder.startsWith('.') && !folder.includes('node_modules'));

        // Find setup instructions
        const setupDoc = docs.find((doc: any) => /setup|install|getting[-_]?started/i.test(doc.metadata.source));
        const setup = setupDoc
            ? await generateGuideSection([setupDoc],
                'Focus on setup instructions.',
                'provide clear step-by-step instructions for setting up the development environment.'
            )
            : 'See README or package.json for setup instructions.';

        // Analyze dependencies
        const dependencies = await analyzeDependencies(docs);

        // Get first issues suggestions from recent commits
        const firstIssues = commits
            .slice(0, 5)
            .map((c: any) => ({
                message: c.message,
                hash: c.hash.slice(0, 7),
                author: c.authorName
            }));

        // Save to database
        const summary = await db.onboardingSummary.create({
            data: {
                projectId,
                about,
                keyFolders,
                setup,
                firstIssues,
                architecture,
                codeStyle,
                testing,
                deployment,
                dependencies,
                contributing
            }
        });

        return {
            success: true,
            data: summary,
            cached: false
        };

    } catch (error: any) {
        console.error('Error generating onboarding summary:', error);
        return {
            success: false,
            error: error.message || 'Failed to generate onboarding summary'
        };
    }
}

export async function regenerateOnboardingSummary(projectId: string) {
    try {
        // Delete existing summary if any
        await db.onboardingSummary.deleteMany({
            where: { projectId }
        });

        // Generate new summary
        return await getOnboardingSummary(projectId);

    } catch (error: any) {
        console.error('Error regenerating onboarding summary:', error);
        return {
            success: false,
            error: error.message || 'Failed to regenerate onboarding summary'
        };
    }
} 