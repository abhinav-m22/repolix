import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
});

export const summarizeCommitAI = async (diff: string) => {
    const response = await model.generateContent([
        `You are an expert programmer and your task is to summarize the following code changes in a concise manner using the provided git diff.
        For every file, there are a few metadata lines, for example:
        \'\'\'
        diff --git a/lib/index.js b/lib/index.js
        index 1234567..89abcde 100644
        --- a/lib/index.js
        +++ b/lib/index.js
        \'\'\'

        This means that \'lib/index.js\' has been modified in this commit. Note that this file path is only an example, the file path can be anything.

        Git diff format reminder:
        - Lines starting with '+' are additions.
        - Lines starting with '-' are deletions.
        - Lines starting with neither are context lines.

        Guidelines:
        - Use short, precise bullet points (max one line each).
        - Avoid verbose explanations or unnecessary details.
        - Group similar changes when possible.
        - Do NOT copy lines from the diff or include examples.
        - Focus on the main changes, not every single line.
        - Language should be clear and professional.

        EXAMPLE SUMMARY CONTENTS:
        \'\'\'
        * Raised the amont of returned recordings from 10 to 20 in the file [packages/server/src/recordings.ts]
        * Fixed a typo in the github action workflow file [.github/workflows/ci.yml]
        * Moved the \'octokit\' initialization to a separate file [src/octokit.ts]
        * Added OpenAI integration for completions [src/lib/openai.ts]
        * Added a new function to handle user authentication [src/auth.ts]
        * Lowered numeric tolerance for test files.
        \'\'\'

        Most commits will have less comments than this example list. The last comment does not have a file path, because there were more than two relevant files in the hypothetical commit. Do not include parts of the example in your response, it is only an example of how the summary should look like.`,

        `Please summarize the following git diff in a concise manner, using bullet points for each change. The summary should be clear and easy to understand, focusing on the main changes made in the commit. Here is the git diff: \n\n${diff}`,
    ]);

    return response.response.text();
}
