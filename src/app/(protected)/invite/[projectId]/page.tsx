import { db } from '@/server/db'
import { auth, clerkClient } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
    params: Promise<{ projectId: string }>
}

const InviteHandler = async (props: Props) => {
    const { projectId } = await props.params
    const { userId } = await auth()
    if (!userId) {
        return redirect('/sign-in')
    }

    const dbUser = await db.user.findUnique({
        where: {
            id: userId
        }
    })

    const client = await clerkClient()
    const user = await client.users.getUser(userId)

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

    const project = await db.project.findUnique({
        where: {
            id: projectId
        }
    })

    if (!project) {
        return redirect('/dashboard')
    }

    try {
        await db.userProject.create({
            data: {
                userId: userId,
                projectId: projectId
            }
        })
    } catch (error) {
        console.error("Error adding user to project:", error)
        throw new Error("Failed to add user to project")
    }

    return redirect(`/dashboard`)
}

export default InviteHandler