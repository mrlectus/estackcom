import { useAuth } from "@/app/providers/sesssion";
import { estackApi } from "@/app/services";
import { Button } from "./ui/button";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogContent, DialogHeader, DialogTrigger } from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { LoaderCircle } from "lucide-react";
import { match } from "ts-pattern";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  address: z.string().min(3, {
    message: "please enter your home address",
  }),
});
export const SummaryCard = () => {
  const addressForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: "",
    },
  });
  const user = useAuth();
  const cartItem = estackApi.useGetCartByIdQuery({ id: user.user!.id });
  const subTotal = cartItem.data?.reduce(
    (acc, curr) => acc + curr.quantity * curr.price,
    0,
  );
  console.log(subTotal);
  const total = (value: number | undefined) => {
    if (value) {
      if (value > 0) {
        return value + 20;
      }
    }
    return 0;
  };
  const [createSession, { isLoading, data, status }] =
    estackApi.useCreateCheckoutMutation();
  const router = useRouter();
  const { toast } = useToast();
  React.useEffect(() => {
    match(status)
      .with(QueryStatus.fulfilled, () => {
        router.push(data!.url!);
      })
      .with(QueryStatus.rejected, () => {
        toast({
          variant: "destructive",
          description: "Cannot procede to checkout",
        });
      })
      .otherwise(() => null);
  }, [status, data]);
    return (
    <div>
      <div className="p-1 my-2">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subTotal}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>{subTotal ? "$20" : "$0"}</span>
        </div>
        <hr />
        <div className="flex justify-between">
          <span>Total</span>
          <span>${total(subTotal)}</span>
        </div>
      </div>
      <div>
        <Dialog>
          <DialogHeader>
            <DialogTrigger asChild>
              <Button className="w-full">Confirm Order</Button>
            </DialogTrigger>
          </DialogHeader>
          <DialogContent>
            <Form {...addressForm}>
              <form
                onSubmit={addressForm.handleSubmit((data) => {
                  console.log(data);
                  if (cartItem.data) {
                    const keys = cartItem.data.map((key) => key.key) || [];
                    const names = cartItem.data.map((name) => name.name) || [];
                    createSession({
                      name: names.join(", "),
                      totalAmount: total(subTotal)!,
                      key: keys as string[],
                    });
                  }
                })}
              >
                <FormField
                  control={addressForm.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Home Address</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="w-full my-2">
                  {isLoading ? (
                    <LoaderCircle className="animate-spin" />
                  ) : (
                    "Confirm Order"
                  )}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
