'use server'

import { db } from '@/server/db'
import { auth, clerkClient } from '@clerk/nextjs/server'
import { cookies } from 'next/headers'

export async function acceptInvite(projectId: string) {
    const { userId } = await auth()
    if (!userId) {
        throw new Error('User not authenticated')
    }

    // Check if user exists in our database
    const dbUser = await db.user.findUnique({
        where: { id: userId }
    })

    // Get user details from Clerk
    const client = await clerkClient()
    const user = await client.users.getUser(userId)

    // Create user if not exists
    if (!dbUser) {
        await db.user.create({
            data: {
                id: userId,
                email: user.emailAddresses[0]?.emailAddress,
                imageUrl: user.imageUrl,
                firstName: user.firstName,
                lastName: user.lastName
            }
        })
    }

    // Verify project exists
    const project = await db.project.findUnique({
        where: { id: projectId }
    })

    if (!project) {
        throw new Error('Project not found')
    }

    // Add user to project
    try {
        await db.userProject.create({
            data: {
                userId: userId,
                projectId: projectId
            }
        })
    } catch (error) {
        // Ignore duplicate entry error if user is already in project
        if (!(error instanceof Error) || !error.message.includes('Unique constraint')) {
            console.error("Error adding user to project:", error)
            throw new Error("Failed to add user to project")
        }
    }

    // Set the project ID in a cookie
    const cookieStore = await cookies()
    cookieStore.set('repolix-project-id', projectId, {
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true
    })

    return { success: true }
}
