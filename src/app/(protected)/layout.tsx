import { SidebarProvider } from '@/components/ui/sidebar'
import { UserButton } from '@clerk/nextjs'
import React from 'react'
import { AppSidebar } from './app-sidebar'
import { cn } from '@/lib/utils'
import { CommandMenu } from '@/components/ui/command-menu'

type Props = {
    children: React.ReactNode
}

const SidebarLayout = ({ children }: Props) => {
    return (
        <SidebarProvider>
            {/* Gradient background */}
            <div className="fixed inset-0 bg-gradient-radial from-[#1A1F3C] to-[#0A0F1C] -z-10" />

            {/* Accent glows */}
            <div className="fixed inset-0 bg-gradient-radial from-[#3B82F6]/5 via-transparent to-transparent -z-10" />

            <div className="flex h-screen overflow-hidden">
                <AppSidebar />
                <div className="flex-1 flex flex-col h-screen overflow-hidden">
                    <header className="border-b border-white/10 bg-black/20 backdrop-blur-xl sticky top-0 z-30 w-full">
                        <div className="flex items-center justify-between p-3 sm:p-4">
                            <div className="w-full max-w-md">
                                <CommandMenu />
                            </div>
                            <div className="flex items-center gap-2 sm:gap-4 ml-2">
                                <UserButton afterSignOutUrl="/" />
                            </div>
                        </div>
                    </header>
                    <main className="flex-1 overflow-auto p-3 sm:p-4 md:p-6">
                        <div className={cn(
                            "bg-black/10 backdrop-blur-lg rounded-xl border border-white/10 p-3 sm:p-4 md:p-6 shadow-lg animate-fadeIn",
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