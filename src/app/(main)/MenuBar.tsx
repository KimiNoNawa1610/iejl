"use client"; 
import { Button } from "@/components/ui/button";
import {
  Book,
  FileSearch,
  Gift,
  Globe,
  Theater,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MenuBarProps {
  className?: string;
}

export default function MenuBar({ className }: MenuBarProps) {
  const pathname = usePathname();
  const isActive = (route: string) => pathname.startsWith(route);

  return (
    <aside
      suppressHydrationWarning
      // h-full won't work well with sticky; instead, use h-[calc(100vh-5.25rem)]
      // to fill the viewport minus the navbar height
      className={`sticky top-[5.25rem] flex flex-col overflow-y-auto 
        bg-gray-400 p-4 rounded-lg shadow-sm 
        h-[calc(100vh-7rem)] text-xl ${className}`}
    >
      <Link href="/">
        <Button
          variant={isActive("/profile") ? "default" : "ghost"}
          className="w-full justify-start gap-3 text-left"
        >
          <User className="h-5 w-5" />
          <span>Portal</span>
        </Button>
      </Link>

      <Link href="/library">
        <Button
          variant={isActive("/library") ? "default" : "ghost"}
          className="w-full justify-start gap-3 text-left"
        >
          <Book className="h-5 w-5" />
          <span>Library</span>
        </Button>
      </Link>

      <Link href="/live">
        <Button
          variant={isActive("/live") ? "default" : "ghost"}
          className="w-full justify-start gap-3 text-left"
        >
          <Globe className="h-5 w-5" />
          <span>Live</span>
        </Button>
      </Link>

      <Link href="/chapters">
        <Button
          variant={isActive("/chapters") ? "default" : "ghost"}
          className="w-full justify-start gap-3 text-left"
        >
          <Theater className="h-5 w-5" />
          <span>Chapters</span>
        </Button>
      </Link>

      <Link href="/job">
        <Button
          variant={isActive("/job") ? "default" : "ghost"}
          className="w-full justify-start gap-3 text-left"
        >
          <FileSearch className="h-5 w-5" />
          <span>Job Connect</span>
        </Button>
      </Link>

      <Link href="/shop">
        <Button
          variant={isActive("/shop") ? "default" : "ghost"}
          className="w-full justify-start gap-3 text-left"
        >
          <Gift className="h-5 w-5" />
          <span>Shop Discount</span>
        </Button>
      </Link>
    </aside>
  );
}
