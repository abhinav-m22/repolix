'use client'

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import useProject from '@/hooks/use-project'
import { api } from '@/trpc/react'
import React, { useState } from 'react'
import QuestionCard from '../dashboard/question-card'
import MDEditor from '@uiw/react-md-editor'
import CodeReferences from '../dashboard/code-references'

const QnA = () => {

  const { projectId } = useProject()
  const { data: questions } = api.project.getQuestions.useQuery({ projectId })

  const [questionIndex, setQuestionIndex] = useState(0)
  const question = questions?.[questionIndex]

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 animate-fadeIn">
      <Sheet>
        <QuestionCard />
        <div className="h-4"></div>
        <h1 className='text-xl font-semibold text-white mb-4'>Saved Questions</h1>
        <div className="h-2"></div>
        <div className="flex flex-col gap-2">
          {questions?.map((ques, index) => {
            return <React.Fragment key={ques.id}>
              <SheetTrigger onClick={() => setQuestionIndex(index)}>
                <div className='flex items-center gap-4 rounded-lg p-4 border border-white/10 bg-white/5 backdrop-blur-md shadow-sm transition-all duration-200 hover:border-cyan-500/20 hover:shadow-[0_0_15px_rgba(34,211,238,0.1)] w-full'>
                  <img className='rounded-full ring-1 ring-cyan-500/30 shadow-sm' height={30} width={30} src={question?.user.imageUrl ?? ""} />
                  <div className='text-left flex flex-col'>
                    <div className='flex items-center gap-2'>
                      <p className='text-white line-clamp-1 text-lg font-medium'>
                        {ques.question}
                      </p>
                      <span className='text-xs text-white/50 whitespace-nowrap'>
                        {ques.createdAt.toLocaleDateString()}
                      </span>
                    </div>
                    <p className='text-white/70 line-clamp-1 text-sm'>
                      {ques.answer}
                    </p>
                  </div>
                </div>
              </SheetTrigger>
            </React.Fragment>
          })}
        </div>
        {question && (
          <SheetContent className='sm:max-w-[80vw] overflow-y-auto border-l border-white/10 bg-gradient-to-tr from-blue-950 to-slate-950'>
            <SheetHeader>
              <SheetTitle className="text-white text-xl">
                {question.question}
              </SheetTitle>
              <div className="p-4 rounded-lg border border-white/10 bg-white/5 backdrop-blur-md my-4">
                <MDEditor.Markdown
                  source={question.answer}
                  style={{
                    backgroundColor: 'transparent',
                    color: 'white'
                  }}
                />
              </div>
              <CodeReferences fileReferences={question.fileReferences ?? [] as any} />
            </SheetHeader>
          </SheetContent>
        )}
      </Sheet>
    </div>
  )
}

export default QnA