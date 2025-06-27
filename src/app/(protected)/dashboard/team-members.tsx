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
                className="relative hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                onClick={() => setOpen(true)}
                aria-label="View all team members"
            >
                <Users className="w-5 h-5" />
                {members && members.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                        {members.length}
                    </span>
                )}
            </Button>

            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => setOpen(false)}
                    />

                    {/* Modal */}
                    <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-50 rounded-lg">
                                    <Users className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900">Team Members</h2>
                                    <p className="text-sm text-gray-500">
                                        {members ? `${members.length} member${members.length !== 1 ? 's' : ''}` : 'Loading...'}
                                    </p>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-full hover:bg-gray-100"
                                onClick={() => setOpen(false)}
                                aria-label="Close"
                            >
                                <XIcon className="w-4 h-4 text-gray-500" />
                            </Button>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            {isLoading ? (
                                <div className="flex items-center justify-center py-12">
                                    <div className="flex items-center gap-3 text-gray-500">
                                        <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
                                        <span>Loading team members...</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-1 max-h-96 overflow-y-auto">
                                    {members && members.length > 0 ? (
                                        members.map((member, index) => (
                                            <div
                                                key={member.id}
                                                className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200 group"
                                            >
                                                {/* Avatar */}
                                                <div className="relative flex-shrink-0">
                                                    <img
                                                        src={member.user.imageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.user.firstName + ' ' + member.user.lastName)}&background=e5e7eb&color=374151&size=48`}
                                                        alt={`${member.user.firstName} ${member.user.lastName}`}
                                                        className="w-12 h-12 rounded-full border-2 border-gray-200 object-cover"
                                                    />
                                                </div>

                                                {/* Info */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2">
                                                        <h3 className="font-medium text-gray-900 truncate">
                                                            {member.user.firstName} {member.user.lastName}
                                                        </h3>
                                                    </div>
                                                    <div className="flex items-center gap-1 mt-1">
                                                        <MailIcon className="w-3 h-3 text-gray-400" />
                                                        <p className="text-sm text-gray-500 truncate">
                                                            {member.user.email}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-12">
                                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                                                <Users className="w-8 h-8 text-gray-400" />
                                            </div>
                                            <h3 className="text-lg font-medium text-gray-900 mb-2">No team members</h3>
                                            <p className="text-gray-500">Invite team members to collaborate on this project.</p>
                                            <Button className="mt-4" size="sm">
                                                Invite Members
                                            </Button>
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