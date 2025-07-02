"use client";

import { createContext, useContext, useState } from "react";
import { AuthDialog } from "../ui/auth-dialog";

interface AuthDialogContextType {
  openSignIn: () => void;
  openSignUp: () => void;
  closeDialog: () => void;
}

const AuthDialogContext = createContext<AuthDialogContextType | undefined>(undefined);

export function useAuthDialog() {
  const context = useContext(AuthDialogContext);
  if (!context) {
    throw new Error("useAuthDialog must be used within an AuthDialogProvider");
  }
  return context;
}

export function AuthDialogProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<"sign-in" | "sign-up">("sign-in");

  const openSignIn = () => {
    setMode("sign-in");
    setIsOpen(true);
  };

  const openSignUp = () => {
    setMode("sign-up");
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  return (
    <AuthDialogContext.Provider value={{ openSignIn, openSignUp, closeDialog }}>
      {children}
      <AuthDialog mode={mode} isOpen={isOpen} onClose={closeDialog} />
    </AuthDialogContext.Provider>
  );
} 