"use client";

import { useSession } from "@/app/(main)/SessionProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import UserAvatar from "./UserAvatar";
import Link from "next/link";
import { Bell, Bookmark, Home, LogOutIcon, Mail, Monitor, Moon, Sun, UserIcon } from "lucide-react";
import { logout } from "@/app/(auth)/logout/actions";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

interface UserButtonProps {
  className?: string;
}

export default function UserButton({ className }: UserButtonProps) {
  const { user } = useSession();

  const {theme,setTheme} = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={cn("flex-none rounded-full",className)}>
          <UserAvatar avatarUrl={user.avatarUrl} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>Logged in as @{user.username}</DropdownMenuLabel>

        <DropdownMenuSeparator></DropdownMenuSeparator>
        <Link href={`/users/${user.username}`}>
          <DropdownMenuItem>
            <UserIcon className="mr-2 size-4" />
            Profile
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator></DropdownMenuSeparator>
        <Link href={`/`}>
          <DropdownMenuItem>
            <Home className="mr-2 size-4" />
            Main Page
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator></DropdownMenuSeparator>
        <Link href={`/users/${user.username}/notifications`}>
          <DropdownMenuItem>
            <Bell className="mr-2 size-4" />
            Notifications
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator></DropdownMenuSeparator>
        <Link href={`/users/${user.username}/messages`}>
          <DropdownMenuItem>
            <Mail className="mr-2 size-4" />
            Messages
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator></DropdownMenuSeparator>
        <Link href={`/users/${user.username}/bookmarks`}>
          <DropdownMenuItem>
            <Bookmark className="mr-2 size-4" />
            Bookmarks
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator></DropdownMenuSeparator>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Monitor className="mr-2 size-4"/>
            Theme
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={()=> setTheme("system")}>
                <Monitor className="mr-2 size-4"/>
                System Default
              </DropdownMenuItem>
              <DropdownMenuItem onClick={()=> setTheme("light")}>
                <Sun className="mr-2 size-4"/>
                Light Theme
              </DropdownMenuItem>
              <DropdownMenuItem onClick={()=> setTheme("dark")}>
                <Moon className="mr-2 size-4"/>
                Dark Theme
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator></DropdownMenuSeparator>
        <DropdownMenuItem
          onClick={() => {
            logout();
          }}
        >
            <LogOutIcon className="mr-2 size-4 justify-center items-center"></LogOutIcon>
            Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
