'use client'

import useProject from '@/hooks/use-project'
import { cn } from '@/lib/utils'
import { api } from '@/trpc/react'
import { AlertCircle, ExternalLink, GitCommit, Loader2 } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { EmptyState } from '@/components/ui/empty-state'
import { Skeleton } from '@/components/ui/skeleton'
import { TableRowSkeleton } from '@/components/ui/loading-skeleton'
import { formatDistanceToNow } from 'date-fns'

const CommitLog = () => {
    const { projectId, project } = useProject()
    const { data: commits, isLoading } = api.project.getCommits.useQuery(
        { projectId: projectId! },
        { enabled: !!projectId }
    )

    if (isLoading) {
        return (
            <div className="space-y-4 animate-pulse p-4">
                <TableRowSkeleton />
                <TableRowSkeleton />
                <TableRowSkeleton />
            </div>
        )
    }

    if (!commits || commits.length === 0) {
        return (
            <EmptyState
                icon={GitCommit}
                title="No commits found"
                description="We couldn't find any commits in this repository."
                className="bg-transparent backdrop-blur-md border-white/10 m-4"
            />
        )
    }

    // Helper function to format commit summaries
    const formatSummary = (summary: string) => {
        if (!summary) return null;
        
        // Split by asterisks and format each bullet point
        const parts = summary.split('*').filter(part => part.trim());
        
        if (parts.length === 0) {
            return <p className="text-xs text-white/70">{summary}</p>;
        }
        
        return (
            <ul className="list-disc space-y-1 pl-5 text-xs text-white/70">
                {parts.map((part, i) => (
                    <li key={i}>{part.trim()}</li>
                ))}
            </ul>
        );
    };

    return (
        <ul className='space-y-6 py-4 px-4'>
            {commits.map((commit, idx) => {
                const commitDate = new Date(commit.date);
                const timeAgo = formatDistanceToNow(commitDate, { addSuffix: true });
                
                return (
                    <li 
                        key={commit.id} 
                        className={cn(
                            'relative flex gap-x-4 group',
                            idx % 2 === 0 ? 'animate-fadeIn animate-delay-[100ms]' : 'animate-fadeIn animate-delay-[200ms]'
                        )}
                    >
                        <div className={cn(
                            idx === commits.length - 1 ? 'h-6' : '-bottom-6',
                            'absolute left-0 top-0 flex w-6 justify-center'
                        )}>
                            <div className='w-px bg-white/20 group-hover:bg-cyan-400/50 transition-colors duration-300'></div>
                        </div>

                        <div className='relative mt-4 flex size-6 flex-none items-center justify-center rounded-full bg-blue-950/70 ring-1 ring-cyan-500/30 text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.1)]'>
                            <GitCommit className='size-3' />
                        </div>
                        
                        <div className='flex-auto rounded-lg border border-white/10 bg-white/5 backdrop-blur-md p-4 shadow-sm transition-all duration-200 group-hover:border-cyan-500/20 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.1)] w-full'>
                            <div className='flex flex-col sm:flex-row sm:justify-between gap-2 mb-2'>
                                <div className='flex items-center gap-2'>
                                    <img 
                                        src={commit.authorAvatarUrl} 
                                        alt={`${commit.authorName}'s avatar`} 
                                        className='size-6 rounded-full ring-1 ring-cyan-500/30 shadow-sm' 
                                    />
                                    <span className='text-sm font-medium text-white'>
                                        {commit.authorName}
                                    </span>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <time dateTime={commit.date} className='text-xs text-white/70'>
                                        {timeAgo}
                                    </time>
                                    <Link 
                                        target='_blank' 
                                        rel='noopener noreferrer' 
                                        href={`${project?.githubUrl}/commit/${commit.hash}`} 
                                        className='text-xs text-white/70 hover:text-cyan-400 flex items-center ml-2 transition-colors'
                                    >
                                        <span className='hidden sm:inline mr-1'>View commit</span>
                                        <ExternalLink className='size-3' />
                                    </Link>
                                </div>
                            </div>
                            <h4 className='font-medium text-sm leading-tight text-white'>
                                {commit.message}
                            </h4>
                            {commit.summary && (
                                <div className='mt-3 border-l-2 border-cyan-500/30 pl-3 py-1'>
                                    {formatSummary(commit.summary)}
                                </div>
                            )}
                        </div>
                    </li>
                );
            })}
        </ul>
    );
};

export default CommitLog;