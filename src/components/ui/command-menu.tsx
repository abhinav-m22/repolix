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
  Settings, 
  User 
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { KeyboardShortcut } from "./keyboard-shortcut"

export function CommandMenu() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

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
          "relative w-full justify-start border border-white/10 bg-white/5 backdrop-blur-md text-sm text-muted-foreground sm:pr-12 md:w-96 lg:w-96",
          "hover:bg-white/10 hover:border-cyan-500/30"
        )}
        onClick={() => setOpen(true)}
      >
        <span className="hidden lg:inline-flex">Search documentation, commands, and more...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <KeyboardShortcut className="absolute right-2 top-2.5 hidden sm:flex" keys={["⌘", "K"]} />
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Links" className="text-cyan-400">
            <CommandItem 
              onSelect={() => runCommand(() => router.push("/dashboard"))}
              className="hover:bg-white/10 aria-selected:bg-white/10"
            >
              <LayoutDashboard className="mr-2 h-4 w-4 text-cyan-400" />
              <span>Dashboard</span>
            </CommandItem>
            <CommandItem 
              onSelect={() => runCommand(() => router.push("/billing"))}
              className="hover:bg-white/10 aria-selected:bg-white/10"
            >
              <CreditCard className="mr-2 h-4 w-4 text-cyan-400" />
              <span>Billing</span>
            </CommandItem>
            <CommandItem 
              onSelect={() => runCommand(() => router.push("/"))}
              className="hover:bg-white/10 aria-selected:bg-white/10"
            >
              <Home className="mr-2 h-4 w-4 text-cyan-400" />
              <span>Home</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator className="bg-white/10" />
          <CommandGroup heading="Help" className="text-cyan-400">
            <CommandItem 
              onSelect={() => runCommand(() => window.open("https://github.com/abhinav-m22/repolix", "_blank"))}
              className="hover:bg-white/10 aria-selected:bg-white/10"
            >
              <Github className="mr-2 h-4 w-4 text-cyan-400" />
              <span>GitHub</span>
            </CommandItem>
            <CommandItem 
              onSelect={() => runCommand(() => router.push("/help"))}
              className="hover:bg-white/10 aria-selected:bg-white/10"
            >
              <HelpCircle className="mr-2 h-4 w-4 text-cyan-400" />
              <span>Help</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator className="bg-white/10" />
          <CommandGroup heading="Profile" className="text-cyan-400">
            <CommandItem 
              onSelect={() => runCommand(() => router.push("/profile"))}
              className="hover:bg-white/10 aria-selected:bg-white/10"
            >
              <User className="mr-2 h-4 w-4 text-cyan-400" />
              <span>Profile</span>
            </CommandItem>
            <CommandItem 
              onSelect={() => runCommand(() => router.push("/signout"))}
              className="hover:bg-white/10 aria-selected:bg-white/10"
            >
              <LogOut className="mr-2 h-4 w-4 text-cyan-400" />
              <span>Sign out</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator className="bg-white/10" />          
        </CommandList>
      </CommandDialog>
    </>
  )
} 