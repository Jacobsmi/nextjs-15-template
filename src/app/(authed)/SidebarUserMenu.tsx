"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createClient } from "@/utils/supabase/client";
import { ChevronsUpDown, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SibebarUserMenu({
  firstName,
  lastName,
}: {
  firstName: string;
  lastName: string;
}) {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex w-full">
          <div className="text-lg p-4 rounded-full bg-white">
            {firstName[0]}
            {lastName[0]}
          </div>
          <div className="flex-1 flex items-center">
            {firstName} {lastName}
          </div>
          <div className="flex items-center">
            <ChevronsUpDown />
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full min-w-[var(--radix-dropdown-menu-trigger-width)]">
        <DropdownMenuItem
          onClick={async () => {
            const supabase = createClient();
            await supabase.auth.signOut();
            router.push("/");
          }}
        >
          <LogOut /> Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
