import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

const useProject = () => {
    const router = useRouter();
    const { data: projects } = api.project.getProjects.useQuery()

    const [projectId, setProjectId] = useLocalStorage<string>('repolix-project-id', '');
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        
        // Check for project ID in cookies if not found in localStorage
        if (!projectId && isClient && typeof window !== 'undefined') {
            const cookieValue = document.cookie
                .split('; ')
                .find((row: string) => row.startsWith('repolix-project-id='))
                ?.split('=')[1];
                
            if (cookieValue) {
                setProjectId(cookieValue);
                // Refresh to ensure the project is loaded
                router.refresh();
            }
        }
    }, [projectId, isClient, setProjectId, router]);

    const project = projects?.find((p) => p.id === projectId);

    return {
        projects,
        project,
        projectId,
        setProjectId,
    }
}

export default useProject;