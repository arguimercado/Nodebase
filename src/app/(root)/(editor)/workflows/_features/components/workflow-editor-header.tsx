"use client";
import { SaveIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useMemo } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";


const EditorBreadcrumbs = ({ workflowId }: { workflowId: string }) => {
  const pathname = usePathname();

  const breadcrumbs = useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);

    return segments.map((segment, index) => {
      const href = "/" + segments.slice(0, index + 1).join("/");
      const isLast = index === segments.length - 1;
      // Capitalize first letter and replace hyphens with spaces
      const label =
        segment === workflowId
          ? workflowId
          : segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");

      return {
        href,
        label,
        isLast,
      };
    });
  }, [pathname, workflowId]);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {breadcrumbs.map((crumb) => (
          <Fragment key={crumb.href}>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {crumb.isLast ? (
                <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={crumb.href}>{crumb.label}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

const EditorSaveButton = ({ workflowId }: { workflowId: string }) => {
  return (
    <div className="ml-auto">
      <Button variant={"success"} onClick={() => {}}>
        <SaveIcon className="size-4" />
        Save Workflow
      </Button>
    </div>
  );
};

const WorkflowEditorHeader = ({ workflowId }: { workflowId: string }) => {
  return (
    <header className="flex h-14 shrink-0 items-center justify-center gap-2 border-b px-4 bg-background">
      <EditorBreadcrumbs workflowId={workflowId} />
      <EditorSaveButton workflowId={workflowId} />
    </header>
  );
};
export default WorkflowEditorHeader;
