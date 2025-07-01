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
          "relative h-9 w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
        )}
        onClick={() => setOpen(true)}
      >
        <span className="hidden lg:inline-flex">Search commands...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <KeyboardShortcut
          keys={["⌘", "K"]}
          className="absolute right-1.5 top-1.5 hidden sm:flex"
        />
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem
              onSelect={() => runCommand(() => router.push("/dashboard"))}
            >
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => router.push("/qna"))}
            >
              <Bot className="mr-2 h-4 w-4" />
              <span>Q&A</span>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => router.push("/create"))}
            >
              <Github className="mr-2 h-4 w-4" />
              <span>New Project</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem onSelect={() => runCommand(() => setTheme("light"))}>
              <Sun className="mr-2 h-4 w-4" />
              <span>Light Mode</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("dark"))}>
              <Moon className="mr-2 h-4 w-4" />
              <span>Dark Mode</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("system"))}>
              <Settings className="mr-2 h-4 w-4" />
              <span>System Mode</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Account">
            <CommandItem onSelect={() => runCommand(() => router.push("/billing"))}>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Billing</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/onboarding"))}>
              <HelpCircle className="mr-2 h-4 w-4" />
              <span>Help & Onboarding</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => window.location.href = "/api/auth/signout")}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
} 