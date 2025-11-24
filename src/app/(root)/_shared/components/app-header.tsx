"use client"

import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar"
import { SidebarIcon } from "lucide-react"

const AppHeader = () => {
   const {toggleSidebar} = useSidebar();
  return (
    <header className="flex flex-row items-center justify-between w-full h-10 shadow-sm px-3">
      <Button variant={"ghost"} onClick={() => toggleSidebar()}>
         <SidebarIcon className="size-4" />
      </Button>
    </header>
  )
}
export default AppHeader