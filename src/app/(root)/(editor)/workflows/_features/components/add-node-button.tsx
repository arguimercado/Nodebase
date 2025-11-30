"use client";

import { PlusIcon } from "lucide-react";
import { memo, useState } from "react";
import NodeSelectorSheet from "@/app/(root)/(editor)/workflows/_features/components/node-selector";
import { Button } from "@/components/ui/button";

const AddNodeButton = memo(() => {
  const [selectorOpen, setSelectorOpen] = useState(false);
  return (
    <NodeSelectorSheet open={selectorOpen} onOpenChange={setSelectorOpen}>
      <Button variant="outline" size="icon" className="bg-background">
        <PlusIcon className="size-4" />
      </Button>
    </NodeSelectorSheet>
  );
});

AddNodeButton.displayName = "AddNodeButton";
export default AddNodeButton;
