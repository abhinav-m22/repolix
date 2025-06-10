import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

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
})