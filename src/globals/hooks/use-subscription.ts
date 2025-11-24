import { useQuery } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";

export const useHasActiveSubscription = () => {
   
   const {data: customerState, isLoading, ...rest} = useQuery({
      queryKey: ["subscription"],
      queryFn: async () => {
         const { data } = await authClient.customer.state();
         return data;
      },
   })
   
   const hasActiveSubscription = 
      customerState?.activeSubscriptions 
      && customerState.activeSubscriptions.length > 0;

   return {
      hasActiveSubscription,
      subscription: customerState?.activeSubscriptions?.[0],
      isLoading,
      ...rest
   }
}