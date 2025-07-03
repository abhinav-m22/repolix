'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import useProject from '@/hooks/use-project'
import React, { useState } from 'react'
import { askQuestion } from './actions'
import { readStreamableValue } from 'ai/rsc'
import MDEditor from '@uiw/react-md-editor'
import CodeReferences from './code-references'
import { KeyboardShortcut } from '@/components/ui/keyboard-shortcut'
import { Bot, BookMarked, MessageSquare, SaveIcon, X } from 'lucide-react'
import { api } from '@/trpc/react'
import { toast } from 'sonner'
import useRefresh from '@/hooks/use-refresh'
import { cn } from '@/lib/utils'
import { EmptyState } from '@/components/ui/empty-state'

const QuestionCard = () => {
  const { project } = useProject()
  const [question, setQuestion] = useState('')
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [fileReferences, setFileReferences] = useState<{ fileName: string; sourceCode: string; summary: string }[]>([])
  const [answer, setAnswer] = useState('')
  const saveAnswer = api.project.saveAnswer.useMutation()
  const refresh = useRefresh()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setAnswer('')
    setFileReferences([])
    e.preventDefault()
    if (!project?.id) return
    setLoading(true)

    try {
      const { output, fileReferences } = await askQuestion(question, project.id)
      setOpen(true)
      setFileReferences(fileReferences)

      for await (const delta of readStreamableValue(output)) {
        if (delta) {
          setAnswer(ans => ans + delta)
        }
      }
    } catch (error) {
      toast.error("Failed to get an answer. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleSaveAnswer = async () => {
    if (!project?.id) return
    
    try {
      await saveAnswer.mutateAsync({
        projectId: project.id,
        question,
        answer,
        fileReferences
      })
      toast.success("Answer saved successfully!")
      refresh()
      setOpen(false)
    } catch (error) {
      toast.error("Failed to save answer")
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='max-w-4xl w-[95vw] max-h-[85vh] flex flex-col bg-black/30 backdrop-blur-xl border border-white/10'>
          <DialogHeader className='flex-shrink-0 border-b border-white/10 pb-4'>
            <div className='flex justify-between items-center'>
              <DialogTitle className='flex items-center gap-2 text-white'>
                <div className="size-8 rounded-full bg-[#3B82F6]/20 flex items-center justify-center">
                  <Bot className="size-4 text-[#60A5FA]" />
                </div>
                <div className="flex flex-col">
                  <span>Repolix Answer</span>
                  <div className="text-xs font-normal text-white/60 mt-0.5 flex items-center">
                    <MessageSquare className="size-3 mr-1" />
                    {question.length > 60 ? question.substring(0, 57) + '...' : question}
                  </div>
                </div>
              </DialogTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant='outline'
                  size="sm"
                  disabled={saveAnswer.isPending}
                  onClick={handleSaveAnswer}
                  className="gap-1 border-white/20 bg-white/10 text-white hover:bg-white/20"
                >
                  <SaveIcon className="size-3.5" />
                  <span>Save</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-8 w-8 text-white/70 hover:text-white hover:bg-white/10"
                  onClick={() => setOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </DialogHeader>

          <div className='flex-1 overflow-y-auto my-4'>
            <div
              className='h-full rounded-lg p-6 scroll-smooth'
            >
              <MDEditor.Markdown
                source={answer || "Thinking..."}
                className='prose prose-invert max-w-none leading-relaxed text-white/90'
                style={{
                  backgroundColor: 'transparent',
                  color: 'inherit',
                  fontFamily: 'var(--font-sans)',
                }}
              />
              <div className="h-4"></div>
              {fileReferences.length > 0 && (
                <div className="border-t border-white/10 pt-4 mt-6">
                  <h3 className="text-sm font-medium mb-3 text-white/70 flex items-center">
                    <BookMarked className="size-4 mr-1.5" />
                    Code References
                  </h3>
                  <CodeReferences fileReferences={fileReferences} />
                </div>
              )}
              {loading && answer && (
                <div className='flex items-center gap-2 mt-4 text-sm text-white/60'>
                  <div className='relative h-2 w-2'>
                    <div className='animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3B82F6]/40 opacity-75'></div>
                    <div className='relative rounded-full h-2 w-2 bg-[#3B82F6]'></div>
                  </div>
                  <span>Generating response...</span>
                </div>
              )}
            </div>
          </div>

          <DialogFooter className='flex-shrink-0 border-t border-white/10 pt-4'>
            <KeyboardShortcut keys={["Esc"]} className="text-xs text-white/60" />
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="p-4">
        <form onSubmit={onSubmit} className='space-y-4'>
          <Textarea
            placeholder='Ask about any part of your repository. E.g. "Which file handles user authentication?" or "How does the data flow work?"'
            value={question}
            onChange={e => setQuestion(e.target.value)}
            className='min-h-[100px] resize-none bg-black/20 border-white/10 text-white placeholder:text-white/50 focus-visible:ring-[#3B82F6]'
            disabled={loading}
          />
          <div className="flex justify-between items-center">
            <KeyboardShortcut keys={["Ctrl", "Enter"]} className="text-xs text-white/60" />
            <Button
              type='submit'
              disabled={loading || !question.trim()}
              className='gap-2 bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] text-white hover:opacity-90'
            >
              {loading ? (
                <>
                  <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-current'></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Bot className="size-4" />
                  <span>Ask Repolix</span>
                </>
              )}
            </Button>
          </div>
        </form>
        
        {/* <EmptyState
          icon={MessageSquare}
          title="AI-powered Repository Assistant"
          description="Ask questions about your codebase to get instant, contextual answers."
          className="bg-transparent border-muted/40 mt-6"
        /> */}
      </div>
    </>
  )
}

export default QuestionCard