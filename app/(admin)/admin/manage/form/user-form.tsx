"use client";
import { userSchema } from "@/app/types/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import React from "react";
import { useToast } from "@/hooks/use-toast";
import { match, P } from "ts-pattern";
import { estackApi } from "@/app/services";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@radix-ui/react-toggle-group";
import { SVGAdmin, SVGSeller, SVGShopper } from "@/app/icons/icons";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { QueryStatus } from "@reduxjs/toolkit/query";

export const UsersForm = () => {
  const { toast } = useToast();
  const newUserSchema = userSchema.omit({ role: true });
  const registerForm = useForm<z.infer<typeof newUserSchema>>({
    resolver: zodResolver(newUserSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  const [role, setRole] = React.useState<"admin" | "seller" | "shopper">(
    "shopper",
  );

  const [register, { isLoading, status, data, error }] =
    estackApi.useCreateUserMutation();

  React.useEffect(() => {
    match(status)
      .with(QueryStatus.rejected, () =>
        toast({
          variant: "destructive",
          description: match(error)
            .with({ data: { message: P.string } }, (err) => err.data.message)
            .otherwise(() => "Something went wrong"),
        }),
      )
      .with(QueryStatus.fulfilled, () =>
        toast({
          description: data?.message,
        }),
      )
      .otherwise(() => null);
  }, [status, data]);
  console.log("dd", data, error);
  return (
    <Form {...registerForm}>
      <form
        onSubmit={registerForm.handleSubmit((data) => {
          register({ ...data, role });
        })}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between">
              Create User <span className="text-orange-600">{role}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <FormField
              control={registerForm.control}
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
              control={registerForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={registerForm.control}
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
            <div className="bg-white">
              <ToggleGroup
                type="single"
                className="flex gap-4 p-3 items-center justify-center"
              >
                <ToggleGroupItem
                  value="admin"
                  aria-label="Toggle bold"
                  className="h-24 w-24"
                  onClick={() => setRole("admin")}
                >
                  <div className="flex items-center flex-col">
                    <SVGAdmin className="w-14 h-14" />
                    <p className="text-xs text-center font-black uppercase">
                      Admin
                    </p>
                  </div>
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="seller"
                  aria-label="Toggle italic"
                  className="h-24 w-24"
                  onClick={() => setRole("seller")}
                >
                  <div className="flex items-center flex-col">
                    <SVGSeller className="w-14 h-14" />
                    <p className="text-xs text-center font-black uppercase">
                      Seller
                    </p>
                  </div>
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="shopper"
                  aria-label="Toggle strikethrough"
                  className="h-24 w-24"
                  onClick={() => setRole("shopper")}
                >
                  <div className="flex items-center flex-col">
                    <SVGShopper className="w-14 h-14" />
                    <p className="text-xs text-center font-black uppercase">
                      Shopper
                    </p>
                  </div>
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="flex w-full">
              {isLoading ? <Loader2Icon className="animate-spin" /> : "Create"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};
