import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex h-screen place-content-center place-items-center">
      <SignIn />
    </div>
  );
}
