import { db } from '@/server/db';
import { Octokit } from 'octokit';
import axios from 'axios';
import { summarizeCommitAI } from './gemini';

export const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
});

type Response = {
    hash: string;
    message: string;
    authorName: string;
    authorAvatarUrl: string;
    date: string;
}

export const getCommitHashes = async (githubUrl: string): Promise<Response[]> => {

    const [owner, repo] = githubUrl.split('/').slice(-2);
    if (!owner || !repo) {
        throw new Error("Invalid GitHub URL");
    }

    const { data } = await octokit.rest.repos.listCommits({
        owner: owner,
        repo: repo,
    })

    const sortedCommits = data.sort((a: any, b: any) => new Date(b.commit.author.date).getTime() - new Date(a.commit.author.date).getTime()) as any[]

    return sortedCommits.slice(0, 10).map((commit: any) => ({
        hash: commit.sha as string,
        message: commit.commit.message ?? "",
        authorName: commit.commit?.author?.name ?? "",
        authorAvatarUrl: commit?.author?.avatar_url ?? "",
        date: commit.commit?.author.date ?? ""
    }))

}

export const pollCommits = async (projectId: string) => {
    const { project, githubUrl } = await fetchProjectGithubUrl(projectId)
    const commits = await getCommitHashes(githubUrl)

    const unprocessedCommits = await filterUnprocessedCommits(projectId, commits)
    // console.log(unprocessedCommits);

    const summarizedCommits = await Promise.allSettled(unprocessedCommits.map(commit => {
        return summarizeCommits(githubUrl, commit.hash);
    }))

    const summaryResults = summarizedCommits.map((res) => {
        if (res.status === 'fulfilled') {
            return res.value as string
        }
        return "";
    })

    const commitData = await db.commit.createMany({
        data: summaryResults.map((summary, index) => {
            console.log(`Processing commit ${index + 1}`);

            return {
                projectId: projectId,
                hash: unprocessedCommits[index]!.hash,
                message: unprocessedCommits[index]!.message,
                authorName: unprocessedCommits[index]!.authorName,
                authorAvatarUrl: unprocessedCommits[index]!.authorAvatarUrl,
                date: unprocessedCommits[index]!.date,
                summary,
            }
        })
    })

    return commitData
}

async function fetchProjectGithubUrl(projectId: string) {
    const project = await db.project.findUnique({
        where: {
            id: projectId,
        },
        select: {
            githubUrl: true
        }
    })

    if (!project?.githubUrl) {
        throw new Error("Project has no GitHub URL")
    }

    return { project, githubUrl: project?.githubUrl }
}

async function filterUnprocessedCommits(projectId: string, commits: Response[]) {
    const processedCommits = await db.commit.findMany({
        where: {
            projectId
        }
    })

    const unprocessedCommits = commits.filter((commit) => !processedCommits.some((processedCommits) => processedCommits.hash === commit.hash))

    return unprocessedCommits
}

async function summarizeCommits(githubUrl: string, commitHash: string) {
    const { data } = await axios.get(`${githubUrl}/commit/${commitHash}.diff`, {
        headers: {
            Accept: 'application/vnd.github.v3.diff',
        }
    })

    return await summarizeCommitAI(data) || ""
}
