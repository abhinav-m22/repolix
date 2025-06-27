import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { pollCommits } from "@/lib/github";
import { indexGithubRepo } from "@/lib/github-loader";

export const projectRouter = createTRPCRouter({
    createProject: protectedProcedure.input(
        z.object({
            name: z.string(),
            githubUrl: z.string().url(),
            githubToken: z.string().optional(),
        })
    ).mutation(async ({ ctx, input }) => {
        // console.log(input);
        const project = await ctx.db.project.create({
            data: {
                name: input.name,
                githubUrl: input.githubUrl,
                UserProject: {
                    create: {
                        userId: ctx.user.userId!,
                    }
                },
                githubToken: input.githubToken ? input.githubToken : null,
            },
        });

        await indexGithubRepo(project.id, input.githubUrl, input.githubToken);
        await pollCommits(project.id);

        return project;
    }),
    getProjects: protectedProcedure.query(async ({ ctx }) => {
        return await ctx.db.project.findMany({
            where: {
                UserProject: {
                    some: {
                        userId: ctx.user.userId!,
                    }
                },
                deletedAt: null,
            }
        })
    }),
    getCommits: protectedProcedure.input(
        z.object({
            projectId: z.string(),
        })
    ).query(async ({ ctx, input }) => {
        pollCommits(input.projectId).then().catch(console.error)
        return await ctx.db.commit.findMany({
            where: {
                projectId: input.projectId,
            }
        })
    }),
    saveAnswer: protectedProcedure.input(z.object({
        projectId: z.string(),
        question: z.string(),
        answer: z.string(),
        fileReferences: z.any()
    })).mutation(async ({ ctx, input }) => {
        return await ctx.db.question.create({
            data: {
                answer: input.answer,
                fileReferences: input.fileReferences,
                projectId: input.projectId,
                question: input.question,
                userId: ctx.user.userId!
            }
        })
    }),
    getQuestions: protectedProcedure.input(z.object({
        projectId: z.string()
    })).query(async ({ ctx, input }) => {
        return await ctx.db.question.findMany({
            where: {
                projectId: input.projectId
            },
            include: {
                user: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
    }),
    archiveProject: protectedProcedure.input(z.object({
        projectId: z.string()
    })).mutation(async ({ ctx, input }) => {
        return await ctx.db.project.update({
            where: {
                id: input.projectId,
            },
            data: {
                deletedAt: new Date(),
            }
        })
    }),
    getTeamMembers: protectedProcedure.input(z.object({
        projectId: z.string()
    })).query(async ({ ctx, input }) => {
        return await ctx.db.userProject.findMany({
            where: {
                projectId: input.projectId,
            },
            include: {
                user: true,
            },
            orderBy: {
                user: {
                    firstName: 'asc',
                }
            }
        })
    })
})