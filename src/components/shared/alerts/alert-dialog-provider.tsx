"use client"

import * as React from "react"
import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export type ButtonType = "OkCancel" | "YesNo"

export interface AlertDialogOptions {
   title: string
   description: string
   buttonType?: ButtonType
   onOkCallback?: () => void
   onCancelCallback?: () => void
}

interface AlertDialogState extends AlertDialogOptions {
   isOpen: boolean
}

interface AlertDialogContextType {
   showAlert: (options: AlertDialogOptions) => void
}

const AlertDialogContext = React.createContext<AlertDialogContextType | null>(null)

export function useAlertDialog() {
   const context = React.useContext(AlertDialogContext)
   if (!context) {
      throw new Error("useAlertDialog must be used within an AlertDialogProvider")
   }
   return context
}

const getButtonLabels = (buttonType: ButtonType) => {
   switch (buttonType) {
      case "YesNo":
         return { ok: "Yes", cancel: "No" }
      case "OkCancel":
      default:
         return { ok: "Ok", cancel: "Cancel" }
   }
}

export function AlertDialogProvider({ children }: { children: React.ReactNode }) {
   const [state, setState] = React.useState<AlertDialogState>({
      isOpen: false,
      title: "",
      description: "",
      buttonType: "OkCancel",
   })

   const showAlert = React.useCallback((options: AlertDialogOptions) => {
      setState({
         isOpen: true,
         title: options.title,
         description: options.description,
         buttonType: options.buttonType ?? "OkCancel",
         onOkCallback: options.onOkCallback,
         onCancelCallback: options.onCancelCallback,
      })
   }, [])

   const handleOk = React.useCallback(() => {
      state.onOkCallback?.()
      setState((prev) => ({ ...prev, isOpen: false }))
   }, [state.onOkCallback])

   const handleCancel = React.useCallback(() => {
      state.onCancelCallback?.()
      setState((prev) => ({ ...prev, isOpen: false }))
   }, [state.onCancelCallback])

   const handleOpenChange = React.useCallback((open: boolean) => {
      if (!open) {
         state.onCancelCallback?.()
      }
      setState((prev) => ({ ...prev, isOpen: open }))
   }, [state.onCancelCallback])

   const labels = getButtonLabels(state.buttonType ?? "OkCancel")

   return (
      <AlertDialogContext.Provider value={{ showAlert }}>
         {children}
         <AlertDialog open={state.isOpen} onOpenChange={handleOpenChange}>
            <AlertDialogContent>
               <AlertDialogHeader>
                  <AlertDialogTitle>{state.title}</AlertDialogTitle>
                  <AlertDialogDescription>{state.description}</AlertDialogDescription>
               </AlertDialogHeader>
               <AlertDialogFooter>
                  <AlertDialogCancel onClick={handleCancel}>
                     {labels.cancel}
                  </AlertDialogCancel>
                  <AlertDialogAction onClick={handleOk}>
                     {labels.ok}
                  </AlertDialogAction>
               </AlertDialogFooter>
            </AlertDialogContent>
         </AlertDialog>
      </AlertDialogContext.Provider>
   )
}
