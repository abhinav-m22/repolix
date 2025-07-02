import "@/styles/globals.css";

import { type Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";

import { TRPCReactProvider } from "@/trpc/react";

import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { CustomToaster } from "@/components/ui/custom-toast";
import { AuthDialogProvider } from "@/components/providers/auth-dialog-provider";

import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  title: 'Repolix - AI-Powered GitHub Developer Tool',
  description: 'Transform your GitHub workflow with AI. Get instant commit summaries, smart PR reviews, and intelligent code insights.',
  keywords: 'AI, GitHub, developer tools, code review, commit analysis, repository intelligence',
  authors: [{ name: 'Repolix Team' }],
  openGraph: {
    title: 'Repolix - AI-Powered GitHub Developer Tool',
    description: 'Transform your GitHub workflow with AI. Get instant commit summaries, smart PR reviews, and intelligent code insights.',
    type: 'website',
  },
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={inter.variable} suppressHydrationWarning>
        <body className="min-h-screen antialiased">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TRPCReactProvider>
              <AuthDialogProvider>
                {children}
              </AuthDialogProvider>
            </TRPCReactProvider>
            <CustomToaster />
            <Analytics />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
