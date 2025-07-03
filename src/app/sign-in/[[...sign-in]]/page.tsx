import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-grid-pattern-dark">
      <SignIn path="/sign-in" routing="path" />
    </div>
  );
}