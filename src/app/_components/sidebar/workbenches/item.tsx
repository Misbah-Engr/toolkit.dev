import { memo } from "react";

import {
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Trash } from "lucide-react";

import type { Workbench } from "@prisma/client";

const PureWorkbenchItem = ({
  isActive,
  onDelete,
  setOpenMobile,
  workbench,
}: {
  workbench: Workbench;
  isActive: boolean;
  onDelete: (workbenchId: string) => void;
  setOpenMobile: (open: boolean) => void;
}) => {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive}>
        <Link
          href={`/workbench/${workbench.id}`}
          onClick={() => setOpenMobile(false)}
        >
          <div className="flex min-w-0 items-center gap-2">
            <span className="truncate">{workbench.name}</span>
          </div>
        </Link>
      </SidebarMenuButton>

      <DropdownMenu modal={true}>
        <DropdownMenuTrigger asChild>
          <SidebarMenuAction
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground mr-0.5"
            showOnHover={!isActive}
          >
            <MoreHorizontal />
            <span className="sr-only">More</span>
          </SidebarMenuAction>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="end">
          <DropdownMenuItem
            className="text-destructive focus:bg-destructive/15 focus:text-destructive cursor-pointer"
            onSelect={() => onDelete(workbench.id)}
          >
            <Trash className="text-destructive size-4" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  );
};

export const WorkbenchItem = memo(PureWorkbenchItem, (prevProps, nextProps) => {
  if (prevProps.isActive !== nextProps.isActive) return false;
  return true;
});
