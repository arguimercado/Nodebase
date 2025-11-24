"use client"

import Image from "next/image"
import Link from "next/link"
import { useTransition } from "react";
import { usePathname,useRouter } from "next/navigation"

import {
   Sidebar,
   SidebarContent,
   SidebarFooter,
   SidebarGroup,
   SidebarGroupContent,
   SidebarGroupLabel,
   SidebarHeader,
   SidebarMenu,
   SidebarMenuButton,
   SidebarMenuItem
} from "@/components/ui/sidebar";
import {  LogOutIcon, StarIcon } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

import { menuItem } from "@/globals/constants/constants";
import { authClient } from "@/lib/auth-client";
import { useHasActiveSubscription } from "@/globals/hooks/use-subscription";


const AppSidebar = () => {

   const router = useRouter();
   const pathname = usePathname();
   const [pending,setTransition] =  useTransition();
   const {hasActiveSubscription,isLoading} = useHasActiveSubscription();
   console.log("hasActiveSubscription",hasActiveSubscription);

   const handleLogout = () => {
      setTransition(async () => {
         await authClient.signOut({
            fetchOptions: {
               onSuccess: () => {
                  router.push("/login");
               }
            }
         })
      })
   }
   
   const isActive = (url: string) => {
      if(url === "/")
         return pathname === "/"
      else 
         return pathname.startsWith(url)
   }

   const handleCheckout = () => authClient.checkout({slug: "pro"})
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
         <SidebarMenuItem>
            <SidebarMenuButton asChild className="btn-sidebar">
               <Link href="/workflows" prefetch>
                  <Image src="/images/logo.svg" alt="Nodebase Logo" width={30} height={30} className="object-contain"/>
                  <span className="font-semibold text-sm">Nodebase</span>
               </Link>
            </SidebarMenuButton>
         </SidebarMenuItem>
      </SidebarHeader>
      <SidebarContent>
         {menuItem.map((group) => (
            <SidebarGroup key={group.title}>
               <SidebarGroupContent>
                  <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
                  <SidebarMenu>
                     {group.items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                           <SidebarMenuButton
                              tooltip={item.title}
                              isActive={isActive(item.url)}
                              asChild
                              className="btn-sidebar"
                           >
                              <Link href={item.url} prefetch>
                                 <item.icon className="size-4" />
                                 <span>{item.title}</span>
                              </Link>
                           </SidebarMenuButton>
                        </SidebarMenuItem>
                     ))}

                  </SidebarMenu>
               </SidebarGroupContent>
            </SidebarGroup>
         ))}
      </SidebarContent>
      <SidebarFooter>
         <SidebarMenu>
            {!hasActiveSubscription && !isLoading && (
               <SidebarMenuItem>
                  <SidebarMenuButton
                     tooltip={"Upgraded to Pro"}
                     className="btn-sidebar"
                     onClick={handleCheckout}
                  >
                     <StarIcon className="size-4" />
                     <span>Upgraded to Pro</span>
                  </SidebarMenuButton>
               </SidebarMenuItem>
            )}
             <SidebarMenuItem>
                  <SidebarMenuButton
                     tooltip={"Billing Portal"}
                     className="btn-sidebar"
                     onClick={() => authClient.customer.portal()}
                  >
                     <StarIcon className="size-4" />
                     <span>Billing Portal</span>
                  </SidebarMenuButton>
               </SidebarMenuItem>
         </SidebarMenu>
          <SidebarMenu>
            
            <SidebarMenuItem>
               <SidebarMenuButton
                  tooltip={"Log out"}
                  className="btn-sidebar"
                  onClick={handleLogout}
               >
                  {pending ? (
                     <Spinner className="size-4" />
                  ) : (
                     <>
                        <LogOutIcon className="size-4" />
                     </>
                  )}
                  <span>Sign out</span>
               </SidebarMenuButton>
            </SidebarMenuItem>
         </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
export default AppSidebar