'use client'
import useProject from '@/hooks/use-project'
import { ExternalLink, Github } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import CommitLog from './commit-log'
import QuestionCard from './question-card'
import ArchiveButton from './archive-button'
import InviteButton from './invite-button'
import TeamMembers from './team-members'

const Dashboard = () => {
    const { project } = useProject()
    return (
        <div>
            <div className='flex items-center justify-between flex-wrap gap-y-4'>
                <div className='w-fit rounded-md bg-primary px-4 py-3'>
                    <div className='flex items-center'>
                        <Github className='size-5 text-white' />
                        <div className='ml-2'>
                            <p className='text-sm font-md text-white'>
                                This project is linked to {' '}
                                <Link
                                    href={project?.githubUrl ?? ''}
                                    className='inline-flex items-center text-white/80 hover:underline'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >
                                    {project?.githubUrl}
                                    <ExternalLink className='ml-1 size-4' />
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>

                <div className='h-4'></div>

                <div className='flex items-center gap-4'>
                    <TeamMembers />
                    <InviteButton />
                    <ArchiveButton />
                </div>

            </div>

            <div className='mt-4'>
                <div className='grid grid-cols-1 gap-4 sm:grid-cols-5'>
                    <QuestionCard />
                    MeetCard
                </div>
            </div>

            <div className='mt-8'>
                <CommitLog />
            </div>
        </div>
    )
}

export default Dashboard