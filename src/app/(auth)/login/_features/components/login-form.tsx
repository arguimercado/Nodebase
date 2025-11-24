"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { LoginFormValue, loginSchema } from "@/globals/schema/auth.schema";
import { Form } from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import InputField from "@/components/shared/input-field";
import SocialForm from "./social-form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

const useAuthLogin = () => {
  const router = useRouter();

  const form = useForm<LoginFormValue>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

   const handleSubmit = async (data: LoginFormValue) => {
    await authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
        callbackURL: "/",
      },
      {
      onSuccess: () => {
        router.push("/");
      },
      onError: (error) => {
        console.log(error);
        toast.error(
          "Login failed. Please check your credentials and try again."
        );
      },
      }
    );
  };

  const isPending = form.formState.isSubmitting;

  return { form, handleSubmit, isPending };
}

const LoginForm = () => {
  const { form, handleSubmit, isPending } = useAuthLogin();

  return (
    <Card className="max-w-sm w-full">
      <CardHeader className="text-center">
        <CardTitle>Welcome Back</CardTitle>
        <CardDescription>
          Please enter your credentials to access your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
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

              <Button type="submit" disabled={isPending} className="w-full">
                {isPending ? "Logging in..." : "Login"}
              </Button>
            </FieldGroup>
          </form>
        </Form>
        <div className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <Link href="/register" className="text-primary hover:underline">
            Sign up
          </Link>
        </div>
        <Separator className="my-4" title="Or continue with" />
        <section>
          <SocialForm />
        </section>
      </CardContent>
    </Card>
  );
};
export default LoginForm;
