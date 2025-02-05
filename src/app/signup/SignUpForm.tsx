"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeClosed, Loader } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .refine(
      (value) =>
        /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(value),
      {
        message:
          "Password must contain at least one number, one uppercase letter, one lowercase letter, and one special character",
      }
    ),
});

export default function SignUpForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });
  const handleSignUp = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          first_name: data.firstName,
          last_name: data.lastName,
        },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      setError(error.message);
      setIsLoading(false);
    } else {
      setIsSuccess(true);
    }
  };
  return (
    <Card className="w-full max-w-[500px]">
      <CardHeader>
        {isSuccess ? (
          <>
            <CardTitle className="text-xl">Let&apos;s get started!</CardTitle>
            <CardDescription>
              We just sent you an email with a link to confirm your account.
            </CardDescription>
          </>
        ) : (
          <>
            <CardTitle className="text-xl">Welcome to App Name</CardTitle>
            <CardDescription>
              Just fill out the form below to get started.
            </CardDescription>
          </>
        )}
      </CardHeader>
      {!isSuccess && (
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSignUp)}>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="First Name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Last Name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Password</FormLabel>
                      <div className="flex relative">
                        <FormControl>
                          <Input
                            {...field}
                            type={isPasswordVisible ? "text" : "password"}
                            placeholder="Password"
                          />
                        </FormControl>
                        <Button
                          type="button"
                          size={"icon"}
                          variant={"ghost"}
                          className="absolute right-0 top-1/2 -translate-y-1/2"
                          onClick={() =>
                            setIsPasswordVisible(!isPasswordVisible)
                          }
                        >
                          {isPasswordVisible ? <EyeClosed /> : <Eye />}
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {error && (
                  <div className="bg-red-200 p-4 rounded-md text-sm">
                    Something went wrong. Please try again or contact support.
                  </div>
                )}
              </div>

              <Button className="w-full mt-8" disabled={isLoading}>
                {isLoading ? (
                  <Loader className="animate-spin" />
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      )}
    </Card>
  );
}
