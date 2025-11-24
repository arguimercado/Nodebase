"use client";

import InputField from "@/components/shared/input-field";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import { Form } from "@/components/ui/form";
import { RegisterFormValue, registerSchema } from "@/globals/schema/auth.schema";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {  useForm } from "react-hook-form";
import { toast } from "sonner";

const RegisterForm = () => {

   const router = useRouter();
   const form = useForm<RegisterFormValue>({
      resolver: zodResolver(registerSchema),
      defaultValues: {
         email: "",
         password: "",
         confirmPassword: "",
      }
   });

   const handleSubmit = async (data: RegisterFormValue) => {
      try {
         await authClient.signUp.email(
            {
            name: data.email,
            email: data.email,
            password: data.password,
            callbackURL: "/"
            },
            {
               onSuccess: () => {
                  router.push("/");

               },
               onError: (error) => {
                  toast.error("Failed to register. Please try again.");
               }
            }
         );
      }catch (error) {
         console.log(error);
         toast.error("Failed to register. Please try again.");
      }
   }

   const isPending = form.formState.isSubmitting;


  return (
    <Card className="max-w-sm w-full">
      <CardHeader className="text-center">
        <CardTitle>Register</CardTitle>
        <CardDescription>Please fill in the form to create an account.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FieldGroup>
              <InputField 
                control={form.control}
                name="email"
                label="Email"
                placeholder="Enter your email"
                type="email"
              />
              <InputField 
                control={form.control}
                name="password"
                label="Password"
                placeholder="Enter your password"
                type="password"
              />
               <InputField
                  control={form.control}
                  name="confirmPassword"
                  label="Confirm Password"
                  placeholder="Re-enter your password"
                  type="password"
               />
              <Button type="submit" disabled={isPending} className="w-full">
                {isPending ? "Signing up..." : "Sign Up"}
              </Button>
            </FieldGroup>
          </form>
        </Form>
        <div className="text-center text-sm mt-4">
          Already have an account? <Link href="/login" className="text-primary hover:underline">Log in</Link>
        </div>
      
      </CardContent>
    </Card>
  )
}
export default RegisterForm