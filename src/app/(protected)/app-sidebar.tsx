'use client'

import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar"
import { Bot, CreditCard, LayoutDashboard, Plus, HelpCircle, ChevronRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import useProject from "@/hooks/use-project"
import { useState } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const items = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "QnA",
        url: "/qna",
        icon: Bot,
    },
    {
        title: "Billing",
        url: "/billing",
        icon: CreditCard,
    },
    {
        title: "Onboarding",
        url: "/onboarding",
        icon: HelpCircle,
    }
]

export function AppSidebar() {
    const pathname = usePathname()
    const { open } = useSidebar()
    const { projects, projectId, setProjectId } = useProject()
    const [hoveredProject, setHoveredProject] = useState<string | null>(null)

    return (
        <Sidebar collapsible="icon" variant="floating" className="transition-all">
            <SidebarHeader>
                <div className="flex items-center gap-2 cursor-pointer p-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
                        <Image src='/logo.svg' alt='Repolix' width={24} height={24} className="transition-transform duration-300 hover:scale-110" />
                    </div>
                    {open && (
                        <h1 className="text-xl font-semibold text-primary/90 tracking-tight">
                            Repolix
                        </h1>
                    )}
                </div>
            </SidebarHeader>
            <SidebarContent className="px-2">
                <SidebarGroup>
                    <SidebarGroupLabel className="text-xs font-medium text-muted-foreground">
                        Application
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => {
                                const isActive = pathname === item.url
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <Link 
                                                href={item.url} 
                                                className={cn(
                                                    "group flex items-center py-2 transition-all duration-200 hover:bg-accent/50",
                                                    isActive && "bg-primary text-primary-foreground hover:bg-primary/90"
                                                )}
                                            >
                                                <item.icon className={cn(
                                                    "h-4 w-4 mr-3 transition-transform group-hover:scale-110",
                                                    isActive ? "text-primary-foreground" : "text-muted-foreground"
                                                )} />
                                                <span className={cn(
                                                    "font-medium",
                                                    !isActive && "text-foreground"
                                                )}>
                                                    {item.title}
                                                </span>
                                                {isActive && (
                                                    <ChevronRight className="ml-auto h-4 w-4 opacity-70" />
                                                )}
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup className="mt-6">
                    <SidebarGroupLabel className="text-xs font-medium text-muted-foreground flex justify-between items-center">
                        <span>Your Projects</span>
                        {open && (
                            <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full" asChild>
                                <Link href='/create'>
                                    <Plus className="h-3.5 w-3.5" />
                                </Link>
                            </Button>
                        )}
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {projects?.map((project) => {
                                const isActive = project.id === projectId
                                const isHovered = hoveredProject === project.id
                                
                                return (
                                    <SidebarMenuItem key={project.name}>
                                        <SidebarMenuButton asChild>
                                            <div 
                                                onClick={() => setProjectId(project.id)}
                                                onMouseEnter={() => setHoveredProject(project.id)}
                                                onMouseLeave={() => setHoveredProject(null)}
                                                className={cn(
                                                    "group cursor-pointer transition-all duration-200 hover:bg-accent/50",
                                                    isActive && "bg-accent/70"
                                                )}
                                            >
                                                <div className={cn(
                                                    'rounded-md border size-6 flex items-center justify-center text-xs font-semibold transition-all duration-200',
                                                    isActive || isHovered 
                                                        ? 'bg-primary text-primary-foreground scale-110' 
                                                        : 'bg-card text-muted-foreground'
                                                )}>
                                                    {project.name.charAt(0).toUpperCase()}
                                                </div>
                                                <span className={cn(
                                                    "font-medium",
                                                    isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                                                )}>
                                                    {project.name}
                                                </span>
                                            </div>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}

                            {!open && (
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <SidebarMenuItem>
                                                <Link href='/create'>
                                                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-md">
                                                        <Plus className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                            </SidebarMenuItem>
                                        </TooltipTrigger>
                                        <TooltipContent side="right">
                                            Create new project
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            )}
                            
                            {open && (
                                <SidebarMenuItem className="mt-2">
                                    <Link href='/create' className="w-full">
                                        <Button variant="outline" className="w-full justify-start" size="sm">
                                            <Plus className="mr-2 h-3.5 w-3.5" />
                                            Create New Project
                                        </Button>
                                    </Link>
                                </SidebarMenuItem>
                            )}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}