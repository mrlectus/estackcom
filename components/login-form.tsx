import { Loader2Icon } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { userSchema } from "@/app/types/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { estackApi } from "@/app/services";
import { useToast } from "@/hooks/use-toast";
import { match } from "ts-pattern";
import { useRouter } from "next/navigation";
import React from "react";
import {
  CardContent,
  CardFooter,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
export const LoginForm = () => {
  const { toast } = useToast();
  const newUserSchema = userSchema.omit({ role: true, email: true });
  const loginForm = useForm<z.infer<typeof newUserSchema>>({
    resolver: zodResolver(newUserSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [login, { isLoading, isError, error, isSuccess, data }] =
    estackApi.useLoginMutation();

  React.useEffect(() => {
    if (isError && "data" in error) {
      toast({
        variant: "destructive",
        description: (error?.data as { error: string }).error,
        title: "Error",
      });
    }
  }, [isError, toast, error]);
  const router = useRouter();
  React.useEffect(() => {
    if (isSuccess && data) {
      match(data.role)
        .with("admin", () => {
          router.push("/admin");
        })
        .with("seller", () => {
          router.push("/seller");
        })
        .with("shopper", () => {
          router.push("/");
        })
        .exhaustive();
    }
  }, [isSuccess, data, router]);

  return (
    <Form {...loginForm}>
      <form onSubmit={loginForm.handleSubmit((data) => login(data))}>
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Welcome back! Please login to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <FormField
              control={loginForm.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={loginForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="flex w-full">
              {isLoading ? <Loader2Icon className="animate-spin" /> : "Login"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};
