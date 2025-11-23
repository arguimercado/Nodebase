"use client";

import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const SubscriptionPage = () => {
   const trpc = useTRPC();
   const testAI = useMutation(trpc.ai.test.mutationOptions({
      onSuccess: (data) => {
         toast.success("Successfully tested AI module!");
      },
      onError: ({message}) => {
         toast.error("Failed to test AI module. " + message);
      }
   }));

   const handleTestAI = async () => {
      await testAI.mutateAsync();
   }

  return (
   <Button onClick={handleTestAI}>
      Test AI Module
   </Button>
  )
};
export default SubscriptionPage;
