'use client'

import { Tabs, TabsContent } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import React, { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { lucario } from 'react-syntax-highlighter/dist/esm/styles/prism'

type Props = {
    fileReferences: { fileName: string; sourceCode: string; summary: string }[]
}

const CodeReferences = ({ fileReferences }: Props) => {

    const [tab, setTab] = useState(fileReferences[0]?.fileName)
    if (fileReferences.length === 0) return null

    return (
        <div className='w-full mt-6'>
            <h3 className='text-sm font-semibold text-white mb-3 flex items-center gap-2'>
                <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                Referenced Files
            </h3>

            <Tabs value={tab} onValueChange={setTab} className='w-full'>
                <div className='flex gap-1 bg-blue-950/40 p-1 rounded-lg mb-3 overflow-x-auto'>
                    {fileReferences.map((file) => (
                        <button
                            key={file.fileName}
                            className={cn(
                                'px-3 py-2 text-xs font-medium rounded-md transition-all duration-200 whitespace-nowrap flex-shrink-0 border border-transparent',
                                tab === file.fileName
                                    ? 'bg-white/10 backdrop-blur-md text-white shadow-sm border-white/20 shadow-[0_0_10px_rgba(34,211,238,0.1)]'
                                    : 'text-white/70 hover:text-white hover:bg-white/5'
                            )}
                            onClick={() => setTab(file.fileName)}
                        >
                            <span className='truncate max-w-[150px]' title={file.fileName}>
                                {file.fileName}
                            </span>
                        </button>
                    ))}
                </div>

                {fileReferences.map(file => (
                    <TabsContent
                        key={file.fileName}
                        value={file.fileName}
                        className='mt-0 border border-white/10 bg-white/5 backdrop-blur-md rounded-lg overflow-hidden'
                    >
                        {file.summary && (
                            <div className='bg-blue-950/70 border-b border-cyan-500/30 px-4 py-3'>
                                <p className='text-sm text-white'>
                                    <span className='font-medium text-cyan-400'>Summary:</span> {file.summary}
                                </p>
                            </div>
                        )}

                        <div className='max-h-[50vh] overflow-auto'>
                            <SyntaxHighlighter
                                language='typescript'
                                style={lucario}
                                customStyle={{
                                    margin: 0,
                                    borderRadius: 0,
                                    fontSize: '12px',
                                    lineHeight: '1.4',
                                    background: 'rgba(2, 6, 23, 0.7)'
                                }}
                                showLineNumbers={true}
                                wrapLines={true}
                                wrapLongLines={true}
                            >
                                {file.sourceCode}
                            </SyntaxHighlighter>
                        </div>
                    </TabsContent>
                ))}

            </Tabs>
        </div>
    )
}

export default CodeReferences