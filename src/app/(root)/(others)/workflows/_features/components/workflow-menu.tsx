"use client";

import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { DeleteIcon, EllipsisVerticalIcon, PencilIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAlertDialog } from "@/components/shared/alerts/alert-dialog-provider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRemoveWorkflow } from "../hooks/useWorkflow";

const WorkflowMenu = ({ id }: { id: string }) => {
  const router = useRouter();
  const { showAlert } = useAlertDialog();
  const { mutateAsync: removeWorkflow } = useRemoveWorkflow();

  const handleRemove = () => {
    showAlert({
      title: "Delete Workflow",
      description:
        "Are you sure you want to delete this workflow? This action cannot be undone.",
      buttonType: "YesNo",
      onOkCallback: async () => {
         console.log("Deleting workflow with id:", id);
        await removeWorkflow({ id });
        router.refresh();
      },
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <EllipsisVerticalIcon className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuItem onClick={() => router.push(`/workflows/${id}`)}>
          <PencilIcon className="h-4 w-4" />
          <span>Edit Workflow</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleRemove}>
          <DeleteIcon className="h-4 w-4" />
          <span>Delete Workflow</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default WorkflowMenu;
