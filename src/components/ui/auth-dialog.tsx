import { SignIn, SignUp } from "@clerk/nextjs";
import { Dialog, DialogContent } from "./dialog";

interface AuthDialogProps {
  mode: "sign-in" | "sign-up";
  isOpen: boolean;
  onClose: () => void;
}

export function AuthDialog({ mode, isOpen, onClose }: AuthDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[400px] p-0">
        {mode === "sign-in" ? (
          <SignIn
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "w-full shadow-none p-0",
                header: "text-center",
              },
            }}
            routing="virtual"
            afterSignInUrl="/dashboard"
          />
        ) : (
          <SignUp
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "w-full shadow-none p-0",
                header: "text-center",
              },
            }}
            routing="virtual"
            afterSignUpUrl="/dashboard"
          />
        )}
      </DialogContent>
    </Dialog>
  );
} 