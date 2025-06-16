'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import useProject from '@/hooks/use-project'
import { set } from 'date-fns'
import Image from 'next/image'
import React, { useState } from 'react'
import { askQuestion } from './actions'
import { readStreamableValue } from 'ai/rsc'
import MDEditor from '@uiw/react-md-editor'
import CodeReferences from './code-references'

const QuestionCard = () => {

    const { project } = useProject()
    const [question, setQuestion] = useState('')
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [fileReferences, setFileReferences] = useState<{ fileName: string; sourceCode: string; summary: string }[]>([])
    const [answer, setAnswer] = useState('')

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setAnswer('')
        setFileReferences([])
        e.preventDefault()
        if (!project?.id) return
        setLoading(true)

        const { output, fileReferences } = await askQuestion(question, project.id)
        setOpen(true)
        setFileReferences(fileReferences)

        for await (const delta of readStreamableValue(output)) {
            if (delta) {
                setAnswer(ans => ans + delta)
            }
        }

        setLoading(false)
    }

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className='!max-w-none w-[95vw] max-h-[85vh] flex flex-col'>
                    <DialogHeader className='flex-shrink-0'>
                        <DialogTitle className='flex items-center gap-2'>
                            <Image src='./logo.svg' alt='Logo' width={32} height={32} />
                            <span>Repolix Answer</span>
                        </DialogTitle>
                    </DialogHeader>

                    <div className='flex-1 overflow-y-auto'>
                        <div
                            className='h-full bg-slate-50 dark:bg-slate-900 border rounded-lg p-6 scroll-smooth'
                            data-color-mode="light"
                        >
                            <MDEditor.Markdown
                                source={answer || "Thinking..."}
                                className='prose prose-gray prose-sm max-w-none dark:prose-invert leading-relaxed'
                                style={{
                                    backgroundColor: 'transparent',
                                    color: 'inherit',
                                    fontFamily: 'system-ui, -apple-system, sans-serif'
                                }}
                            />
                            <div className="h-4"></div>
                            <CodeReferences fileReferences={fileReferences} />
                            {loading && answer && (
                                <div className='flex items-center gap-2 mt-4 text-sm text-muted-foreground'>
                                    <div className='animate-pulse w-2 h-2 bg-blue-500 rounded-full'></div>
                                    <span>Generating response...</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className='flex-shrink-0 flex justify-end gap-2 mt-4 pt-4 border-t'>
                        <Button
                            type='button'
                            variant="outline"
                            onClick={() => setOpen(false)}
                        >
                            Close
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            <Card className='relative col-span-3'>
                <CardHeader>
                    <CardTitle className='flex items-center gap-2'>
                        <Image src='./logo.svg' alt='Logo' width={24} height={24} />
                        Ask a question
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={onSubmit} className='space-y-4'>
                        <Textarea
                            placeholder='Which file should I edit to modify the authentication flow?'
                            value={question}
                            onChange={e => setQuestion(e.target.value)}
                            className='min-h-[100px] resize-none'
                            disabled={loading}
                        />
                        <Button
                            type='submit'
                            disabled={loading || !question.trim()}
                            className='w-full sm:w-auto'
                        >
                            {loading ? (
                                <>
                                    <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2'></div>
                                    Asking Repolix...
                                </>
                            ) : (
                                'Ask Repolix'
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </>
    )
}

export default QuestionCard