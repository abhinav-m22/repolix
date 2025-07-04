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
import { dark } from "@clerk/themes";
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
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: '#3B82F6',
          colorBackground: 'rgb(10, 15, 28)',
          colorInputBackground: 'hsl(217.2 32.6% 17.5%)',
          colorInputText: 'hsl(210 40% 98%)',
          colorTextOnPrimaryBackground: 'hsl(222.2 47.4% 11.2%)',
          colorText: 'hsl(210 40% 98%)',
          colorDanger: 'hsl(0 62.8% 30.6%)',
          borderRadius: '0.75rem',
          fontFamily: 'var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif',
        },
        elements: {
          formButtonPrimary: 'bg-primary hover:bg-primary/90 text-primary-foreground',
          card: 'glass-card backdrop-blur-lg',
          footer: 'text-muted-foreground',
          socialButtonsIconButton: 'glass-button',
          formFieldInput: 'bg-input border-border',
        }
      }}
    >
      <html lang="en" className={inter.variable} suppressHydrationWarning>
        <body className="min-h-screen antialiased">
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
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
