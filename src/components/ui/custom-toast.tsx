"use client"

import { toast as sonnerToast, Toaster as SonnerToaster } from "sonner"
import { cn } from "@/lib/utils"
import { CheckCircle, AlertCircle, XCircle, Info } from "lucide-react"

interface ToastProps {
  title: string
  description?: string
  duration?: number
}

export function toast({
  title,
  description,
  duration = 5000,
  ...props
}: ToastProps & Record<string, any>) {
  return sonnerToast(title, {
    description,
    duration,
    className: cn(
      "group border-border bg-background text-foreground",
      "data-[type=success]:border-l-4 data-[type=success]:border-l-green-500",
      "data-[type=error]:border-l-4 data-[type=error]:border-l-red-500",
      "data-[type=warning]:border-l-4 data-[type=warning]:border-l-yellow-500",
      "data-[type=info]:border-l-4 data-[type=info]:border-l-blue-500",
    ),
    ...props,
  })
}

export function success({ title, description, duration = 5000 }: ToastProps) {
  return toast({
    title,
    description,
    duration,
    icon: <CheckCircle className="h-5 w-5 text-green-500" />,
    type: "success",
  })
}

export function error({ title, description, duration = 5000 }: ToastProps) {
  return toast({
    title,
    description,
    duration,
    icon: <XCircle className="h-5 w-5 text-red-500" />,
    type: "error",
  })
}

export function warning({ title, description, duration = 5000 }: ToastProps) {
  return toast({
    title,
    description,
    duration,
    icon: <AlertCircle className="h-5 w-5 text-yellow-500" />,
    type: "warning",
  })
}

export function info({ title, description, duration = 5000 }: ToastProps) {
  return toast({
    title,
    description,
    duration,
    icon: <Info className="h-5 w-5 text-blue-500" />,
    type: "info",
  })
}

export function CustomToaster() {
  return (
    <SonnerToaster
      position="top-right"
      toastOptions={{
        className: cn(
          "group border-border bg-background text-foreground",
          "data-[type=success]:border-l-4 data-[type=success]:border-l-green-500",
          "data-[type=error]:border-l-4 data-[type=error]:border-l-red-500",
          "data-[type=warning]:border-l-4 data-[type=warning]:border-l-yellow-500",
          "data-[type=info]:border-l-4 data-[type=info]:border-l-blue-500",
        ),
      }}
    />
  )
} 