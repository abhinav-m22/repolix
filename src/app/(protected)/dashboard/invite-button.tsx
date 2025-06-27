'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import useProject from '@/hooks/use-project'
import { UserPlus } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

const InviteButton = () => {

    const { projectId } = useProject()
    const [open, setOpen] = useState(false)
    const [inviteLink, setInviteLink] = useState('')

    useEffect(() => {
        if (typeof window !== 'undefined' && projectId) {
            setInviteLink(`${window.location.origin}/invite/${projectId}`)
        }
    }, [projectId])

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Invite Team Members</DialogTitle>
                    </DialogHeader>
                    <p className='text-sm text-gray-500'>
                        Here's the link to invite team members to your project
                    </p>
                    <Input
                        className='mt-4'
                        readOnly
                        onClick={() => {
                            if (inviteLink) {
                                navigator.clipboard.writeText(inviteLink)
                                toast.success("Copied!")
                            }
                        }}
                        value={inviteLink}
                    />
                </DialogContent>
            </Dialog>
            <Button
                size='sm'
                onClick={() => setOpen(true)}
                className="relative group hover:bg-blue-50 hover:border-blue-200 transition-all duration-200 cursor-pointer border border-gray-200 shadow-sm hover:shadow-md"
                variant='ghost'
            >
                <UserPlus className="w-4 h-4 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" />

            </Button>
        </>
    )
}

export default InviteButton