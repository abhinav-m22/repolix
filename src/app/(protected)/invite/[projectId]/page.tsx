import { redirect } from 'next/navigation'
import { acceptInvite } from '@/app/actions/invite'
import React from 'react'

type Props = {
    params: Promise<{ projectId: string }>
}

const InviteHandler = async (props: Props) => {
    const { projectId } = await props.params
    
    try {
        await acceptInvite(projectId)
        return redirect('/dashboard')
    } catch (error) {
        console.error('Error accepting invite:', error)
        return redirect('/dashboard')
    }
}

export default InviteHandler