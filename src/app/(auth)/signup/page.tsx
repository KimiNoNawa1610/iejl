import { Metadata } from "next";
import iejlLogo from "../../../assets/Logo-IEJL-horizontal.png";
import Image from "next/image";
import Link from "next/link";
import SignUpForm from "./SignUpForm";

export const metadata: Metadata = {
  title: "Sign Up",
};
export default function Page() {
  return (
    <main className="flex h-screen items-center justify-center p-5">
      <div className="flex h-full max-h-[40rem] w-full max-w-[64rem] flex-col overflow-hidden rounded-2xl bg-card shadow-2xl">
        <div className="flex w-full justify-center object-cover pt-4">
          <Image src={iejlLogo} alt="Logo" width={200} height={100} />
        </div>
        <div className="flex w-full justify-center overflow-y-auto p-5">
          <div className="w-full max-w-[50rem] space-y-1 text-center">
            <h1 className="text-3xl font-bold">Create Your Account</h1>
            <p className="text-muted-foreground">
              If you already have an account please{" "}
              <Link
                href="/login"
                className="italic underline hover:bg-orange-100"
              >
                Log in
              </Link>
            </p>
            <div className="mt-4 w-full">
              <SignUpForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
