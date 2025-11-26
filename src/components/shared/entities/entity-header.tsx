"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import React from "react";

type EntityHeaderProps = {
  title: string;
  desciption?: string;
  newButtonLabel: string;
  disabled?: boolean;
  isCreating?: boolean;
} & (
  | { onNew: () => void; newButtonHref?: never }
  | { newButtonHref: string; onNew?: never }
  | { onNew?: never; newButtonHref?: never }
);

interface EntityContainerProps extends React.ComponentProps<"div"> {
  children: React.ReactNode;
}

export const EntityHeaderContainer = ({
  children,
  className,
  ...props
}: EntityContainerProps) => {
  return (
    <div
      className={`flex flex-col gap-y-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};


interface EntityContentProps extends React.ComponentProps<"div"> {
  children: React.ReactNode;
}
export const EntityContent = ({ children, ...props }: EntityContentProps) => {
  return <div className="flex flex-row gap-2 justify-between" {...props}>{children}</div>;
};

export const EntityHeaderTitle = ({
  className,
  headerClass,
  subClass,
  title,
  description,
}: {
  className?: string;
  headerClass?: string;
  subClass?: string;
  title: string;
  description?: string;
}) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <h1 className={cn("text-lg md:text-xl font-semibold", headerClass)}>{title}</h1>
      {description && (
        <p className={cn("text-xs md:text-sm text-muted-foreground", subClass)}>
          {description}
        </p>
      )}
    </div>
  );
};

export const EntityButton = ({label,disabled,isCreating,onNew} : {label:string, isCreating?: boolean, disabled?: boolean, onNew?: () => void}) => {
  return (
     <Button disabled={disabled || isCreating} size="sm" onClick={onNew}>
          <PlusIcon className="mr-2 size-4" />
          {label}
        </Button>
  )
}

