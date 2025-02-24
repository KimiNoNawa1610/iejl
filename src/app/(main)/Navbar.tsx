"use client"; // Allows use of React hooks (useState)

import { useState } from "react";
import Link from "next/link";
import SearchField from "@/components/SearchField";
import UserButton from "@/components/UserButton";
import MenuBar from "./MenuBar";
import { Button } from "@/components/ui/button";
import { MenuIcon, Minimize } from "lucide-react";

export default function Navbar({ children }: { children: React.ReactNode }) {
  const [showMenu, setShowMenu] = useState(true);

  return (
    <>
      {/* The top navbar section */}
      <header className="sticky top-0 z-10 bg-card">
        <div className="mx-auto flex max-w-[120rem] flex-wrap items-center justify-center gap-5 px-5 py-3">
        <Button
            className="px-4 py-2 bg-indigo-600 text-white rounded"
            onClick={() => setShowMenu((prev) => !prev)}
          >
            <MenuIcon></MenuIcon>
          </Button>
          <Link href="/" className="text-2xl font-bold text-primary">
            IEJL
          </Link>
          <SearchField />
          <UserButton className="sm:ms-auto" />

          {/* The toggle button for the menu */}
          
        </div>
      </header>

      {/* Main content area with optional menu */}
      <div className="mx-auto flex w-full grow gap-5 p-5">
        {showMenu && (
          <MenuBar className="sticky top-[5.25rem] h-fit flex-none space-y-3 rounded-2xl bg-gray-400 px-4 py-5 shadow-sm xl:w-80" />
        )}
        {/* The rest of your page’s content */}
        <main className="flex-1">{children}</main>
      </div>
    </>
  );
}
