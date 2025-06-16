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
            <h3 className='text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2'>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                Referenced Files
            </h3>

            <Tabs value={tab} onValueChange={setTab} className='w-full'>
                <div className='flex gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg mb-3 overflow-x-auto'>
                    {fileReferences.map((file) => (
                        <button
                            key={file.fileName}
                            className={cn(
                                'px-3 py-2 text-xs font-medium rounded-md transition-all duration-200 whitespace-nowrap flex-shrink-0 border border-transparent',
                                tab === file.fileName
                                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm border-gray-200 dark:border-gray-600'
                                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-750'
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
                        className='mt-0 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden'
                    >
                        {file.summary && (
                            <div className='bg-blue-50 dark:bg-blue-950 border-b border-blue-200 dark:border-blue-800 px-4 py-3'>
                                <p className='text-sm text-blue-800 dark:text-blue-200'>
                                    <span className='font-medium'>Summary:</span> {file.summary}
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
                                    lineHeight: '1.4'
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