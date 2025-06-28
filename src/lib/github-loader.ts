import { GithubRepoLoader } from "@langchain/community/document_loaders/web/github";
import { generateEmbedding, summarizeCode } from "./gemini";
import { Document } from "@langchain/core/documents";
import { db } from "@/server/db";
import { github } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Octokit } from "octokit";

export const loadGithubRepo = async (githubUrl: string, githubToken?: string) => {
    const loader = new GithubRepoLoader(githubUrl, {
        accessToken: githubToken || "",
        branch: "main",
        ignoreFiles: ['package-lock.json', 'yarn.lock', 'pnpm-lock.yaml', 'bun.lock', 'bun.lockb'],
        recursive: true,
        unknown: 'warn',
        maxConcurrency: 5
    })

    const docs = await loader.load()
    return docs
}

// console.log(await loadGithubRepo('https://github.com/abhinav-m22/portfolio-v2'))

export const indexGithubRepo = async (projectId: string, githubUrl: string, githubToken?: string) => {
    const docs = await loadGithubRepo(githubUrl, githubToken)
    const allEmbeddings = await generateEmbeddings(docs);

    await Promise.allSettled(allEmbeddings.map(async (embedding, index) => {
        // console.log(`Processing ${index + 1} of ${allEmbeddings.length}`);
        if (!embedding) return

        const sourceCodeEmbedding = await db.sourceCodeEmbedding.create({
            data: {
                summary: embedding.summary,
                sourceCode: embedding.sourceCode,
                fileName: embedding.fileName,
                projectId,
            }
        })

        await db.$executeRaw`
        UPDATE "SourceCodeEmbedding"
        SET "summaryEmbedding" = ${embedding.embedding}::vector
        WHERE "id" = ${sourceCodeEmbedding.id};
        `
    }))
}

const generateEmbeddings = async (docs: Document[]) => {
    return await Promise.all(docs.map(async (doc) => {
        const summary = await summarizeCode(doc)
        const embedding = await generateEmbedding(summary)
        return {
            summary,
            embedding,
            sourceCode: JSON.parse(JSON.stringify(doc.pageContent)),
            fileName: doc.metadata.source,
        }
    }))
}

const getFileCount = async (path: string, octokit: Octokit, githubOwner: string, githubRepo: string, acc: number = 0) => {
    const { data } = await octokit.rest.repos.getContent({
        owner: githubOwner,
        repo: githubRepo,
        path
    })

    if (!Array.isArray(data) && data.type === 'file') {
        return acc + 1
    }

    if (Array.isArray(data)) {
        let fileCount = 0
        const dirs: string[] = []

        for (const item of data) {
            if (item.type === 'dir') {
                dirs.push(item.path)
            } else {
                fileCount++
            }
        }

        if (dirs.length > 0) {
            const dirCounts = await Promise.all(
                dirs.map(dirPath => getFileCount(dirPath, octokit, githubOwner, githubRepo, 0))
            )
            fileCount += dirCounts.reduce((acc, count) => acc + count, 0)
        }

        return acc + fileCount
    }

    return acc
}

export const checkCredits = async (githubUrl: string, githubToken?: string) => {
    const octokit = new Octokit({ auth: githubToken })

    const githubOwner = githubUrl.split('/')[3]
    const githubRepo = githubUrl.split('/')[4]

    if (!githubOwner || !githubRepo) return 0

    const fileCount = await getFileCount('', octokit, githubOwner, githubRepo, 0)

    return fileCount
}