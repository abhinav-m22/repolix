'use client'

import useProject from '@/hooks/use-project'
import { api } from '@/trpc/react'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Users, XIcon, MailIcon } from 'lucide-react'

const TeamMembers = () => {
    const { projectId } = useProject();
    const { data: members, isLoading } = api.project.getTeamMembers.useQuery({ projectId });
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button
                size="icon"
                variant="ghost"
                className="relative hover:bg-white/5 transition-colors duration-200 group"
                onClick={() => setOpen(true)}
                aria-label="Team members"
                title="Team members"
            >
                <Users className="w-5 h-5 text-white" />
                {members && members.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                        {members.length}
                    </span>
                )}
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                    Team members
                </span>
            </Button>

            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/80"
                        onClick={() => setOpen(false)}
                    />

                    {/* Modal */}
                    <div className="relative bg-[#0A0F1C]/95 backdrop-blur-sm rounded-xl w-full max-w-md max-h-[90vh] overflow-hidden">
                        {/* Header */}
                        <div className="flex items-center justify-between p-6">
                            <div className="flex items-center gap-3">
                                <Users className="w-6 h-6 text-white" />
                                <div>
                                    <h2 className="text-xl text-white">Team Members</h2>
                                    <p className="text-sm text-white/60">
                                        {members ? `${members.length} member${members.length !== 1 ? 's' : ''}` : 'Loading...'}
                                    </p>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-full hover:bg-white/10"
                                onClick={() => setOpen(false)}
                            >
                                <XIcon className="w-5 h-5 text-white/60" />
                            </Button>
                        </div>

                        {/* Content */}
                        <div className="px-6 pb-6">
                            {isLoading ? (
                                <div className="flex items-center justify-center py-8">
                                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {members && members.length > 0 ? (
                                        members.map((member) => (
                                            <div
                                                key={member.id}
                                                className="flex items-center gap-4"
                                            >
                                                {/* Avatar */}
                                                <div className="relative flex-shrink-0 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                                    {member.user.imageUrl ? (
                                                        <img
                                                            src={member.user.imageUrl}
                                                            alt={`${member.user.firstName} ${member.user.lastName}`}
                                                            className="w-10 h-10 rounded-full object-cover"
                                                        />
                                                    ) : (
                                                        <span className="text-lg text-white">
                                                            {member.user.firstName?.[0] || 'A'}
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Info */}
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-medium text-white truncate">
                                                        {member.user.firstName} {member.user.lastName}
                                                    </h3>
                                                    <p className="text-sm text-white/60 truncate">
                                                        {member.user.email}
                                                    </p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-8">
                                            <p className="text-white/60">No team members yet</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default TeamMembers