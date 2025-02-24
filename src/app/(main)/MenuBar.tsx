"use client";
import { Button } from "@/components/ui/button";
import {
  Book,
  FileSearch,
  Gift,
  Globe,
  LifeBuoy,
  LogOutIcon,
  Settings,
  Theater,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "../(auth)/logout/actions";

interface MenuBarProps {
  className?: string;
}

export default function MenuBar({ className }: MenuBarProps) {
  const pathname = usePathname();
  const isActive = (route: string) => pathname.startsWith(route);

  return (
    <aside
      suppressHydrationWarning
      className={`flex h-[calc(100vh-6.9rem)] flex-col overflow-y-auto rounded-lg bg-gray-400 p-4 text-xl shadow-sm ${className}`}
    >
      {/* Main Menu Items */}
      <div className="flex flex-1 flex-col">
        <Link href="/">
          <Button
            variant={isActive("/profile") ? "default" : "ghost"}
            className="flex w-full items-center justify-start gap-3"
          >
            <User className="h-5 w-5" />
            <span className="hidden lg:inline">Portal</span>
          </Button>
        </Link>

        <Link href="/libraries">
          <Button
            variant={isActive("/libraries") ? "default" : "ghost"}
            className="flex w-full items-center justify-start gap-3"
          >
            <Book className="h-5 w-5" />
            <span className="hidden lg:inline">Library</span>
          </Button>
        </Link>

        <Link href="/live">
          <Button
            variant={isActive("/live") ? "default" : "ghost"}
            className="flex w-full items-center justify-start gap-3"
          >
            <Globe className="h-5 w-5" />
            <span className="hidden lg:inline">Live</span>
          </Button>
        </Link>

        <Link href="/chapters">
          <Button
            variant={isActive("/chapters") ? "default" : "ghost"}
            className="flex w-full items-center justify-start gap-3"
          >
            <Theater className="h-5 w-5" />
            <span className="hidden lg:inline">Chapters</span>
          </Button>
        </Link>

        <Link href="/jobs">
          <Button
            variant={isActive("/jobs") ? "default" : "ghost"}
            className="flex w-full items-center justify-start gap-3"
          >
            <FileSearch className="h-5 w-5" />
            <span className="hidden lg:inline">Job Connect</span>
          </Button>
        </Link>

        <Link href="/shops">
          <Button
            variant={isActive("/shops") ? "default" : "ghost"}
            className="flex w-full items-center justify-start gap-3"
          >
            <Gift className="h-5 w-5" />
            <span className="hidden lg:inline">Shop Discount</span>
          </Button>
        </Link>
      </div>

      {/* Bottom Options */}
      <div className="flex flex-col border-t border-gray-300 pt-4">
        <Link href="/support">
          <Button
            variant="ghost"
            className="flex w-full items-center justify-start gap-3"
          >
            <LifeBuoy className="h-5 w-5" />
            <span className="hidden lg:inline">Support</span>
          </Button>
        </Link>

        <Link href="/settings">
          <Button
            variant="ghost"
            className="flex w-full items-center justify-start gap-3"
          >
            <Settings className="h-5 w-5" />
            <span className="hidden lg:inline">Settings</span>
          </Button>
        </Link>

        <Button
          variant="ghost"
          className="flex w-full items-center justify-start gap-3"
          onClick={() => {
            logout();
          }}
        >
          <LogOutIcon className="h-5 w-5" />
          <span className="hidden lg:inline">Logout</span>
        </Button>
      </div>
    </aside>
  );
}
