import { SidebarProvider } from '@/components/ui/sidebar'
import { UserButton } from '@clerk/nextjs'
import React from 'react'
import { AppSidebar } from './app-sidebar'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { cn } from '@/lib/utils'
import { CommandMenu } from '@/components/ui/command-menu'

type Props = {
    children: React.ReactNode
}

const SidebarLayout = ({ children } : Props) => {
    return (
        <SidebarProvider>
            <div className="flex h-screen overflow-hidden">
                <AppSidebar />
                <div className="flex-1 flex flex-col h-screen overflow-hidden">
                    <header className="border-b border-border bg-background/50 backdrop-blur-sm sticky top-0 z-30 w-full">
                        <div className="flex items-center justify-between p-3 sm:p-4">
                            <div className="w-full max-w-md">
                                <CommandMenu />
                            </div>
                            <div className="flex items-center gap-2 sm:gap-4 ml-2">
                                <ThemeToggle />
                                <UserButton afterSignOutUrl="/" />
                            </div>
                        </div>
                    </header>
                    <main className="flex-1 overflow-auto p-3 sm:p-4 md:p-6">
                        <div className={cn(
                            "rounded-lg border border-border bg-card p-3 sm:p-4 md:p-6 shadow-sm animate-fadeIn",
                            "h-full overflow-auto"
                        )}>
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </SidebarProvider>
    )
}

export default SidebarLayout