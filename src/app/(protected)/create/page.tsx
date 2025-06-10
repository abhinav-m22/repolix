'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import useRefresh from "@/hooks/use-refresh"
import { api } from "@/trpc/react"
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
    const refresh = useRefresh()

    function onSubmit(data: FormInput) {
        // window.alert(`Project Name: ${data.projectName}, Repo URL: ${data.repoUrl}, GitHub Token: ${data.githubToken}`)

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
        return true
    }

    return (
        <div className="flex items-center gap-12 h-full justify-center">
            <img src='/undraw.svg' className="h-56 w-auto" />
            <div>
                <div>
                    <h1 className="font-semibold text-2xl">
                        Link your GitHub Repository
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Enter the GitHub repository URL and link it to Repolix
                    </p>
                </div>
                <div className="h-4"></div>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input
                            {...register('projectName', { required: true })}
                            placeholder="Project Name"
                            required
                        />
                        <div className="h-2"></div>
                        <Input
                            {...register('repoUrl', { required: true })}
                            placeholder="GitHub Repository URL"
                            required
                            type="url"
                        />
                        <div className="h-2"></div>
                        <Input
                            {...register('githubToken')}
                            placeholder="GitHub Personal Access Token (optional)"
                        />
                        <div className="h-4"></div>
                        <Button type="submit" disabled={createProject.isPending}>
                            Create Project
                        </Button>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default CreateProject