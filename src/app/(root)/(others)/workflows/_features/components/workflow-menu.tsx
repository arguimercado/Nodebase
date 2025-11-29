"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu,DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";

import { DeleteIcon, EllipsisVerticalIcon, MenuIcon, PencilIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const WorkflowMenu = ({id} : {id:string}) => {
   const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
         <Button variant="ghost">
            <EllipsisVerticalIcon className="h-5 w-5" />
         </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent  className="w-56" align="end">
         <DropdownMenuItem onClick={() => router.push(`/workflows/${id}`)}>
            <PencilIcon className="h-4 w-4" />
            <span>
               Edit Workflow
            </span>
         </DropdownMenuItem>
         <DropdownMenuSeparator />
          <DropdownMenuItem>
            <DeleteIcon className="h-4 w-4" />
            <span>
               Delete Workflow
            </span>
         </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default WorkflowMenu