import { Loader2Icon } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { SVGAdmin, SVGSeller, SVGShopper } from "@/app/icons/icons";
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
export const RegForm = () => {
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

  const [register, { isLoading, isError, error, isSuccess, data }] =
    estackApi.useRegisterMutation();

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
    <Form {...registerForm}>
      <form
        onSubmit={registerForm.handleSubmit((data) => {
          register({ ...data, role });
        })}
      >
        <Card>
          <CardHeader>
            <CardTitle>Register</CardTitle>
            <CardDescription>
              Dont have an account? Create one here!
            </CardDescription>
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
            <div>
              <ToggleGroup type="single" className="flex gap-4 p-3">
                <ToggleGroupItem
                  value="admin"
                  aria-label="Toggle bold"
                  className="h-24 w-24"
                  onClick={() => setRole("admin")}
                >
                  <div>
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
                  <div>
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
                  <div>
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
              {isLoading ? (
                <Loader2Icon className="animate-spin" />
              ) : (
                "Register"
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};
