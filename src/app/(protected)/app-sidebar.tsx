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
        <Sidebar collapsible="icon" variant="floating" className="bg-black/30 backdrop-blur-lg border-r border-white/10 transition-all">
            <SidebarHeader>
                <div className="flex items-center gap-2 cursor-pointer p-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-r from-[#60A5FA] to-[#3B82F6] glow">
                        <Image src='/logo.svg' alt='Repolix' width={24} height={24} className="transition-transform duration-300 hover:scale-110" />
                    </div>
                    {open && (
                        <h1 className="text-xl font-semibold text-white tracking-tight">
                            Repolix
                        </h1>
                    )}
                </div>
            </SidebarHeader>
            <SidebarContent className="px-2">
                <SidebarGroup>
                    <SidebarGroupLabel className="text-xs font-medium text-white/60">
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
                                                    "group flex items-center py-2 transition-all duration-200 hover:bg-white/10 rounded-lg",
                                                    isActive && "bg-[#3B82F6] text-white hover:bg-[#3B82F6]/90"
                                                )}
                                            >
                                                <item.icon className={cn(
                                                    "h-4 w-4 mr-3 transition-transform group-hover:scale-110",
                                                    isActive ? "text-white" : "text-white/60"
                                                )} />
                                                <span className={cn(
                                                    "font-medium",
                                                    !isActive && "text-white"
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
                    <SidebarGroupLabel className="text-xs font-medium text-white/60 flex justify-between items-center">
                        <span>Your Projects</span>
                        {open && (
                            <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full text-white/60 hover:text-white hover:bg-white/10" asChild>
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
                                                    "group cursor-pointer transition-all duration-200 hover:bg-white/10 rounded-lg",
                                                    isActive && "bg-white/20"
                                                )}
                                            >
                                                <div className={cn(
                                                    'rounded-md border border-white/20 size-6 flex items-center justify-center text-xs font-semibold transition-all duration-200',
                                                    isActive || isHovered
                                                        ? 'bg-[#3B82F6] text-white scale-110 border-[#3B82F6]'
                                                        : 'bg-black/30 text-white/60'
                                                )}>
                                                    {project.name.charAt(0).toUpperCase()}
                                                </div>
                                                <span className={cn(
                                                    "font-medium",
                                                    isActive ? "text-white" : "text-white/60 group-hover:text-white"
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
                                                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-md border-white/20 bg-black/20 text-white hover:bg-white/10 hover:text-white">
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
                                        <Button variant="outline" className="w-full justify-start border-white/20 bg-black/20 text-white hover:bg-white/10 hover:text-white" size="sm">
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