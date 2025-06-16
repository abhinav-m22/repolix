'use server'

import { streamText } from 'ai'
import { createStreamableValue } from 'ai/rsc'
import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { generateEmbedding } from '@/lib/gemini'
import { db } from '@/server/db'

const google = createGoogleGenerativeAI({
    apiKey: process.env.GEMINI_API_KEY,
})

export async function askQuestion(question: string, projectId: string) {
    const stream = createStreamableValue()
    const queryVector = await generateEmbedding(question)
    const vectorQuery = `[${queryVector.join(',')}]`

    const result = await db.$queryRaw`
    SELECT "fileName", "sourceCode", "summary", 1 - ("summaryEmbedding" <=> ${vectorQuery}::vector) AS "similarity"
    FROM "SourceCodeEmbedding"
    WHERE 1 - ("summaryEmbedding" <=> ${vectorQuery}::vector) > 0.4
    AND "projectId" = ${projectId}
    ORDER BY "similarity" DESC
    LIMIT 10
    ` as { fileName: string; sourceCode: string; summary: string }[]

    let context = ''

    for (const doc of result) {
        context += `source: ${doc.fileName}\ncode content: ${doc.sourceCode}\nsummary of file: ${doc.summary}\n\n`
    }
    // console.log("Context: ", context);

    (async () => {
        const { textStream } = await streamText({
            model: google('gemini-1.5-flash'),
            prompt: `
            You are an expert ai code assistant who answers questions about codebase. Your target audience will range from junior to senior software developers. AI assistant should provide accurate and concise answers to the questions asked. AI is well-behaved and does not make up answers. AI assistant should use the context provided to answer the question. If the context is not enough, AI assistant should say that it does not have enough information to answer the question. AI is always friendly, kind and informative. If the question is about the code or a specific file, AI assistant should provide the detailed answer giving step-by-step instructions.

            START OF CONTEXT
            ${context}
            END OF CONTEXT

            START OF QUESTION
            ${question}
            END OF QUESTION

            AI assistant will take into account the CONTEXT provided in a conversation and will answer the question based on the context provided. AI assistant will not apologize for previous responses, but instead will indicate new information that is relevant to the question asked. AI assistant will not invent anything on their own that is not drawn from the context provided. Answer in markdown syntax, with appropriate code blocks and formatting. Be as detailed as possible in your answer, make sure there is no ambiguity in your answer.
            `,
        })

        for await (const delta of textStream) {
            stream.update(delta)
        }

        stream.done()
    })()

    return {
        output: stream.value,
        fileReferences: result
    }
}