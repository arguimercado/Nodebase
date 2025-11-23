"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname,useRouter } from "next/navigation"

import {
   Sidebar,
   SidebarContent,
   SidebarFooter,
   SidebarGroup,
   SidebarGroupContent,
   SidebarHeader,
   SidebarMenu,
   SidebarMenuButton,
   SidebarMenuItem
} from "@/components/ui/sidebar";
import {  DoorOpenIcon, FolderOpenIcon, HistoryIcon, KeyIcon, LogOutIcon, StarIcon } from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { useTransition } from "react";
import { Spinner } from "@/components/ui/spinner";

const menuItem = [
   {
      title: "Workflows",
      items: [
         {
            title: "Workflows",
            icon: FolderOpenIcon,
            url: "/workflows"
         },
         {
            title: "Credentials",
            icon: KeyIcon,
            url: "/credentials"
         },
         {
            title: "Executions",
            icon: HistoryIcon,
            url: "/executions"
         }

      ]
   },
   
]

const AppSidebar = () => {

   const router = useRouter();
   const pathname = usePathname();
   const [pending,setTransition] =  useTransition();

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
            <SidebarMenuItem>
               <SidebarMenuButton
                  tooltip={"Upgraded to Pro"}
                  className="btn-sidebar"
               >
                  <StarIcon className="size-4" />
                  <span>Upgraded to Pro</span>
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