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

import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  title: "Repolix",
  description: "AI-powered GitHub developer assistant", 
  icons: [{ rel: "icon", url: "/logo.svg" }],
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
              {children}
            </TRPCReactProvider>
            <CustomToaster />
            <Analytics />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
