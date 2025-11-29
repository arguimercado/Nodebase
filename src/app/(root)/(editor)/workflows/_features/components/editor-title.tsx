"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSuspenseWorkflow, useUpdateWorkflow } from "../hooks/useWorkflow";

type TitleFormValues = {
  name: string;
};

const EditorTitle = ({ workflowId }: { workflowId: string }) => {

  const { data: workflow } = useSuspenseWorkflow(workflowId);
  const { mutateAsync: updateWorkflow } = useUpdateWorkflow();
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const workflowName = workflow.name;

  const form = useForm<TitleFormValues>({
    defaultValues: {
      name: workflowName,
    },
  });

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSubmit = async (values: TitleFormValues) => {
    if (values.name.trim() && values.name !== workflowName) {
      await updateWorkflow({ id: workflowId, name: values.name.trim() });
    }
    setIsEditing(false);
  };

  const handleBlur = () => {
    form.handleSubmit(handleSubmit)();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      form.handleSubmit(handleSubmit)();
    } else if (e.key === "Escape") {
      form.reset({ name: workflowName });
      setIsEditing(false);
    }
  };

  const handleStartEditing = () => {
    setIsEditing(true);
  };

  if (isEditing) {
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    ref={(e) => {
                      field.ref(e);
                      (
                        inputRef as React.MutableRefObject<HTMLInputElement | null>
                      ).current = e;
                    }}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    className="h-8 text-lg font-semibold"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    );
  }

  return (
    <Button
      variant="ghost"
      onClick={handleStartEditing}
      className="text-lg font-semibold text-left w-full"
    >
      <span className="truncate w-full text-left">

      {workflowName || "Untitled Workflow"}
      </span>
    </Button>
  );
};

export default EditorTitle;
