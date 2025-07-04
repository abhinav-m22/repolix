'use client'

import { Button } from '@/components/ui/button'
import useProject from '@/hooks/use-project'
import useRefresh from '@/hooks/use-refresh'
import { api } from '@/trpc/react'
import { ArchiveIcon } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'sonner'

const ArchiveButton = () => {
    const [open, setOpen] = useState(false)
    const archiveProject = api.project.archiveProject.useMutation()
    const { projectId } = useProject()
    const refresh = useRefresh()

    const handleArchive = () => {
        archiveProject.mutate({ projectId }, {
            onSuccess: () => {
                toast.success("Project Archived")
                refresh()
                setOpen(false)
            },
            onError: () => {
                toast.error("Error archiving project")
                setOpen(false)
            }
        })
    }

    return (
        <>
            <Button
                disabled={archiveProject.isPending}
                size='sm'
                variant='destructive'
                className='cursor-pointer relative hover:bg-white/5 transition-colors duration-200 group'
                onClick={() => setOpen(true)}
            >
                <ArchiveIcon />
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                    Delete Project
                </span>
            </Button>
            {open && (
                <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-white/20 z-50">
                    <div className="bg-white rounded-lg shadow-xl p-6 w-80 mx-4">
                        <h2 className="text-lg font-semibold mb-4">Archive Project</h2>
                        <p className="mb-6 text-gray-600">Are you sure you want to archive this project? This action cannot be undone.</p>
                        <div className="flex justify-end gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setOpen(false)}
                                disabled={archiveProject.isPending}
                                className='cursor-pointer'
                            >
                                Cancel
                            </Button>
                            <Button
                                size="sm"
                                onClick={handleArchive}
                                disabled={archiveProject.isPending}
                                className="cursor-pointer"
                            >
                                {archiveProject.isPending ? 'Archiving...' : 'Archive'}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ArchiveButton