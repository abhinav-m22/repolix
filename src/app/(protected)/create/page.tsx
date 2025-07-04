'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import useRefresh from "@/hooks/use-refresh"
import { api } from "@/trpc/react"
import { Info } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

type FormInput = {
    repoUrl: string
    projectName: string
    githubToken?: string
}

const CreateProject = () => {
    const { register, handleSubmit, reset } = useForm<FormInput>()

    const createProject = api.project.createProject.useMutation()
    const checkCredits = api.project.checkCredits.useMutation()

    const refresh = useRefresh()

    function onSubmit(data: FormInput) {
        // window.alert(`Project Name: ${data.projectName}, Repo URL: ${data.repoUrl}, GitHub Token: ${data.githubToken}`)

        if (!!checkCredits.data) {
            createProject.mutate({
                name: data.projectName,
                githubUrl: data.repoUrl,
                githubToken: data.githubToken
            }, {
                onSuccess: () => {
                    toast.success('Project created successfully!')
                    refresh()
                    reset()
                },
                onError: (error) => {
                    toast.error(`Failed to create project: ${error.message}`)
                },
            })
        } else {
            checkCredits.mutate({
                githubUrl: data.repoUrl,
                githubToken: data.githubToken
            })
        }

        // return true
    }

    const hasEnoughCredits = checkCredits.data?.userCredits ? checkCredits.data?.fileCount <= checkCredits.data?.userCredits : true

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center animate-fadeIn">
            <img src='/undraw.svg' className="h-56 w-auto justify-self-center hidden md:block" />
            <div className="w-full">
                <div className="mb-6">
                    <h1 className="font-semibold text-2xl text-white">
                        Link your GitHub Repository
                    </h1>
                    <p className="text-sm text-white/70 mt-1">
                        Enter the GitHub repository URL and link it to Repolix
                    </p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 backdrop-blur-md shadow-sm p-6 w-full max-w-md">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-white block mb-1.5">Project Name</label>
                                <Input
                                    {...register('projectName', { required: true })}
                                    placeholder="My Awesome Project"
                                    required
                                    className="border-white/10 bg-blue-950/40 text-white placeholder:text-white/50 focus:border-cyan-500/50 focus:ring-cyan-500/20"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-white block mb-1.5">GitHub Repository URL</label>
                                <Input
                                    {...register('repoUrl', { required: true })}
                                    placeholder="https://github.com/username/repo"
                                    required
                                    type="url"
                                    className="border-white/10 bg-blue-950/40 text-white placeholder:text-white/50 focus:border-cyan-500/50 focus:ring-cyan-500/20"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-white block mb-1.5">GitHub Token (optional)</label>
                                <Input
                                    {...register('githubToken')}
                                    placeholder="ghp_xxxxxxxxxxxxxxxx"
                                    className="border-white/10 bg-blue-950/40 text-white placeholder:text-white/50 focus:border-cyan-500/50 focus:ring-cyan-500/20"
                                />
                                <p className="text-xs text-white/50 mt-1">For private repositories, provide a personal access token</p>
                            </div>
                        </div>

                        {!!checkCredits.data && (
                            <div className="mt-6 bg-blue-950/70 py-3 px-4 rounded-md border border-cyan-500/30 text-white">
                                <div className="flex items-center gap-2">
                                    <Info className="size-4 text-cyan-400" />
                                    <p className="text-sm">You'll be charged <strong className="text-cyan-400">{checkCredits.data?.fileCount} </strong>credits for this repository.</p>
                                </div>
                                <p className="text-sm text-white/70 ml-6 mt-1">You have <strong className="text-cyan-400">{checkCredits.data?.userCredits} </strong>credits remaining.</p>
                            </div>
                        )}

                        <div className="mt-6">
                            <Button
                                type="submit"
                                disabled={createProject.isPending || checkCredits.isPending || !hasEnoughCredits}
                                className="w-full bg-blue-950/70 text-white border border-cyan-500/30 hover:bg-white/10 hover:text-cyan-400 hover:border-cyan-500/50 shadow-[0_0_10px_rgba(34,211,238,0.1)] hover:shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                            >
                                {!!checkCredits.data ? 'Create Project' : 'Check Credits'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateProject