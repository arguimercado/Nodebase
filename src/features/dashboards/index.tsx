"use client"

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const Dashboard = () => {
  
  const trpc = useTRPC();
  const testAi = useMutation(trpc.ai.test.mutationOptions());

  const handleGenerate = async () => {
    try {
      const result = await testAi.mutateAsync();
      toast.success("Job Queued Successfully!");
    } catch (error) {
      console.error("Error generating content:", error);
      toast.error("Failed to generate content. Please try again.");
    }
  }
  
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen">
      <Button disabled={testAi.isPending} onClick={handleGenerate}>Test AI</Button>
      
      <Button onClick={() => authClient.signOut()}>
          Sign Out    
        </Button>
   </div>
  )
}
export default Dashboard