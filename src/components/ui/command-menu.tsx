"use client"

import * as React from "react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { 
  Bot, 
  CreditCard, 
  Github, 
  HelpCircle, 
  Home, 
  LayoutDashboard, 
  LogOut, 
  Moon, 
  Settings, 
  Sun, 
  User 
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { KeyboardShortcut } from "./keyboard-shortcut"

export function CommandMenu() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()
  const { setTheme } = useTheme()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false)
    command()
  }, [])

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "relative h-9 w-full justify-start text-sm text-white/70 border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:text-white hover:border-cyan-500/30 sm:pr-12 md:w-40 lg:w-64"
        )}
        onClick={() => setOpen(true)}
      >
        <span className="hidden lg:inline-flex">Search commands...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <KeyboardShortcut
          keys={["⌘", "K"]}
          className="absolute right-1.5 top-1.5 hidden sm:flex text-white/50"
        />
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen} className="bg-blue-950/90 backdrop-blur-xl border border-white/10">
        <CommandInput placeholder="Type a command or search..." className="border-b border-white/10 bg-transparent text-white" />
        <CommandList className="text-white">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions" className="text-cyan-400">
            <CommandItem
              onSelect={() => runCommand(() => router.push("/dashboard"))}
              className="hover:bg-white/10 aria-selected:bg-white/10"
            >
              <LayoutDashboard className="mr-2 h-4 w-4 text-cyan-400" />
              <span>Dashboard</span>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => router.push("/qna"))}
              className="hover:bg-white/10 aria-selected:bg-white/10"
            >
              <Bot className="mr-2 h-4 w-4 text-cyan-400" />
              <span>Q&A</span>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => router.push("/create"))}
              className="hover:bg-white/10 aria-selected:bg-white/10"
            >
              <Github className="mr-2 h-4 w-4 text-cyan-400" />
              <span>New Project</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator className="bg-white/10" />
          <CommandGroup heading="Settings" className="text-cyan-400">
            <CommandItem 
              onSelect={() => runCommand(() => setTheme("light"))}
              className="hover:bg-white/10 aria-selected:bg-white/10"
            >
              <Sun className="mr-2 h-4 w-4 text-cyan-400" />
              <span>Light Mode</span>
            </CommandItem>
            <CommandItem 
              onSelect={() => runCommand(() => setTheme("dark"))}
              className="hover:bg-white/10 aria-selected:bg-white/10"
            >
              <Moon className="mr-2 h-4 w-4 text-cyan-400" />
              <span>Dark Mode</span>
            </CommandItem>
            <CommandItem 
              onSelect={() => runCommand(() => setTheme("system"))}
              className="hover:bg-white/10 aria-selected:bg-white/10"
            >
              <Settings className="mr-2 h-4 w-4 text-cyan-400" />
              <span>System Mode</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator className="bg-white/10" />
          <CommandGroup heading="Account" className="text-cyan-400">
            <CommandItem 
              onSelect={() => runCommand(() => router.push("/billing"))}
              className="hover:bg-white/10 aria-selected:bg-white/10"
            >
              <CreditCard className="mr-2 h-4 w-4 text-cyan-400" />
              <span>Billing</span>
            </CommandItem>
            <CommandItem 
              onSelect={() => runCommand(() => router.push("/onboarding"))}
              className="hover:bg-white/10 aria-selected:bg-white/10"
            >
              <HelpCircle className="mr-2 h-4 w-4 text-cyan-400" />
              <span>Help & Onboarding</span>
            </CommandItem>
            <CommandItem 
              onSelect={() => runCommand(() => window.location.href = "/api/auth/signout")}
              className="hover:bg-white/10 aria-selected:bg-white/10"
            >
              <LogOut className="mr-2 h-4 w-4 text-cyan-400" />
              <span>Log out</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
} 