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
                <DialogContent className="bg-[#0A0F1C]/95 backdrop-blur-sm border-none">
                    <DialogHeader>
                        <DialogTitle className="text-xl text-white">Invite Team Members</DialogTitle>
                    </DialogHeader>
                    <p className='text-sm text-white/60'>
                        Here's the link to invite team members to your project
                    </p>
                    <Input
                        className='mt-4 bg-[#1A1F3C] border-none text-[#60A5FA] focus:ring-0'
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
                className="relative hover:bg-white/5 transition-colors duration-200 group"
                variant='ghost'
                title="Invite team members"
            >
                <UserPlus className="w-4 h-4 text-white" />
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                    Invite team members
                </span>
            </Button>
        </>
    )
}

export default InviteButton