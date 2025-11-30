"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface IProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ManualTriggerSettingsDialog = ({ open, onOpenChange }: IProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Manual Trigger Settings</DialogTitle>
          <DialogDescription>
            Configure the settings for the Manual Trigger node.
          </DialogDescription>
        </DialogHeader>
        {/* Settings form elements go here */}
        <div className="py-4 ">
          <p className="text-sm text-muted-foreground">
            No settings available for this node.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
