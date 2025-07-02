'use client'
import useProject from '@/hooks/use-project'
import { ExternalLink, Github, Users } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import CommitLog from './commit-log'
import QuestionCard from './question-card'
import ArchiveButton from './archive-button'
import InviteButton from './invite-button'
import TeamMembers from './team-members'
import ProjectStats from './project-stats'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

const Dashboard = () => {
    const { project } = useProject()
    
    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col space-y-4">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <Card className="bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] text-white w-full lg:max-w-md shadow-lg">
                        <CardContent className="p-4 flex items-center gap-4">
                            <div className="rounded-full bg-white/10 p-2 flex-shrink-0">
                                <Github className="h-5 w-5" />
                            </div>
                            <div className="overflow-hidden">
                                <CardDescription className="text-white/70">
                                    Connected Repository
                                </CardDescription>
                                <Link
                                    href={project?.githubUrl ?? '#'}
                                    className="text-sm font-medium flex items-center hover:underline truncate text-white"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span className="truncate">{project?.githubUrl || 'Not connected'}</span>
                                    <ExternalLink className="ml-1 h-3 w-3 flex-shrink-0" />
                                </Link>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex flex-wrap items-center gap-3">
                        <TeamMembers />
                        <InviteButton />
                        <ArchiveButton />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>AI-powered Repository Assistant</CardTitle>
                        <CardDescription>Ask questions about your codebase to get instant, contextual answers.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <QuestionCard />
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader>
                        <CardTitle>Project Stats</CardTitle>
                        <CardDescription>Key metrics for your project</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ProjectStats />
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Commit History</CardTitle>
                    <CardDescription>Recent commits in your repository</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <CommitLog />
                </CardContent>
            </Card>
        </div>
    )
}

export default Dashboard