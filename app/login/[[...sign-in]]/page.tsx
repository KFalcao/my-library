import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <div className="h-screen flex items-center justify-center flex-col gap-4">
      <SignIn signUpUrl="/create-account" />
    </div>
  );
}
