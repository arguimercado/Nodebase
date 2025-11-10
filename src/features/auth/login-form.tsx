"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {useForm} from "react-hook-form"
import {toast} from "sonner"

import {Button} from "@/components/ui/button"
import { LoginFormValue, loginSchema } from "@/globals/schema/auth.schema"
import { Form, FormField } from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FieldGroup } from "@/components/ui/field"


const LoginForm = () => {
  const router = useRouter()
  const form = useForm<LoginFormValue>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (data: LoginFormValue) => {
    console.log(data)
  }

  const isPending = form.formState.isSubmitting;

  return (
    <div className="flex flex-col items-center justify-center gap-6 w-full min-h-screen px-4">
      <Card className="max-w-2xl w-full">
        <CardHeader className="text-center">
          <CardTitle>Welcome Back</CardTitle>
          <CardDescription>Please enter your credentials to access your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <FieldGroup>
                
              </FieldGroup>
            </form>
          </Form>
        </CardContent>
      </Card>

    </div>
  )
}
export default LoginForm 