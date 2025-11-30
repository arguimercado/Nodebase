"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  type HttpRequestNodeFormValues,
  httpRequestNodeSchema,
} from "../../types/schema";

interface IProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (values: HttpRequestNodeFormValues) => void;
  defaultEndpoint?: string;
  defaultMethod?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  defaultBody?: string;
}

export const HttpRequestSettingsDialog = ({
  open,
  onOpenChange,
  defaultEndpoint,
  defaultMethod,
  defaultBody,
}: IProps) => {
  const form = useForm<HttpRequestNodeFormValues>({
    resolver: zodResolver(httpRequestNodeSchema),
    defaultValues: {
      url: defaultEndpoint,
      method: defaultMethod,
      body: defaultBody,
    },
  });

  const handleSubmit = (value: HttpRequestNodeFormValues) => {
    console.log("Submitted values:", value);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>HTTP Request Settings</DialogTitle>
          <DialogDescription>
            Configure the settings for the HTTP Request node.
          </DialogDescription>
        </DialogHeader>
        {/* Settings form elements go here */}
       
          <FieldGroup>
            <Controller
              name="url"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>URL</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="https://api.example.com/data"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="method"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Method</FieldLabel>
                  <Select {...field} value={field.value || ""} onValueChange={field.onChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select METHOD" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>METHOD</SelectLabel>
                        <SelectItem value="GET">GET</SelectItem>
                        <SelectItem value="POST">POST</SelectItem>
                        <SelectItem value="PUT">PUT</SelectItem>
                        <SelectItem value="PATCH">PATCH</SelectItem>
                        <SelectItem value="DELETE">DELETE</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="body"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Body</FieldLabel>
                  <Textarea
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Request body"
                    autoComplete="off"
                    rows={15}
                    className="min-h-[120px]"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

        <DialogFooter>
          <Button disabled={!form.formState.isDirty || form.formState.isSubmitting} onClick={() => form.handleSubmit(handleSubmit)()}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
