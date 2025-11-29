
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogTrigger
} from "@/components/ui/dialog"
import { Form } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { DialogContent, DialogDescription, DialogTitle } from  "@/components/ui/dialog"
import { useForm } from "react-hook-form"
import { workflowFormSchema, WorkflowFormValues } from "../types/schema"
import { useCreateWorkflow } from "../hooks/useWorkflow"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { InputField } from "@/components/shared/inputs"


const WorkflowFormDialog = () => {
  
  const {mutateAsync,isPending} = useCreateWorkflow();
   const router = useRouter();

  const form = useForm<WorkflowFormValues>({
    resolver: zodResolver(workflowFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const handleSubmit = async (data: WorkflowFormValues) => {
     await mutateAsync(data,{
      onSuccess: (data) => {
        toast.success(`Workflow "${data.name}" created successfully!`);
        router.push(`/workflows/${data.id}`);
      },
      onError: (error) => {
        toast.error(`Failed to create workflow: ${error.message}`);
      }
    });
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="warning">New Workflow</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Workflow</DialogTitle>
          <DialogDescription>Create a new workflow to automate your tasks.</DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
              <InputField 
                control={form.control}
                name="name"
                label="Workflow Name"
                placeholder="Enter workflow name"
              />
           
          </Form>
        </div>
        <DialogFooter>
            <Button  disabled={isPending} variant={"success"} onClick={() => form.handleSubmit(handleSubmit)()}>
              {isPending ? "Creating..." : "Create Workflow"}
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
export default WorkflowFormDialog