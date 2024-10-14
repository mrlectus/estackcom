"use client";

import { useAuth } from "@/app/providers/sesssion";
import { estackApi } from "@/app/services";
import { LoaderCircle } from "lucide-react";
import { match } from "ts-pattern";
import React from "react";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useToast } from "@/hooks/use-toast";
import { QueryStatus } from "@reduxjs/toolkit/query";

export const CartItem = () => {
  const user = useAuth();
  const { toast } = useToast();
  const cartItem = estackApi.useGetCartByIdQuery({ id: user.user!.id });
  const [deleteCart, { status }] = estackApi.useDeleteCartByIdMutation();
  const [cartMutate] = estackApi.useUpdateQuantityByIDMutation();
  React.useEffect(() => {
    match(status)
      .with(QueryStatus.fulfilled, () => {
        toast({
          description: "Item deleted sucessfully",
        });
      })
      .with(QueryStatus.rejected, () => {
        toast({
          variant: "destructive",
          description: "cannot delete item",
        });
      })
      .otherwise(() => "something went wrong");
  }, [status]);
  return match(cartItem.isLoading)
    .with(true, () => <LoaderCircle className="animate-spin" />)
    .with(false, () =>
      match(cartItem.data?.length)
        .with(0, () => <div>No item in your cart</div>)
        .otherwise(() => {
          return cartItem.data?.map((item) => {
            return (
              <React.Fragment key={item.id}>
                <Card className="flex flex-col">
                  <div className="flex justify-end w-full">
                    <Button
                      onClick={() => deleteCart({ id: item.id })}
                      size={"icon"}
                      className="m-1 rounded-full h-6 w-6"
                      variant={"destructive"}
                    >
                      X
                    </Button>
                  </div>
                  <CardContent className="flex items-center gap-4 mt-auto justify-between">
                    <div className="flex gap-1">
                      <Image
                        src={item!.key as string}
                        width={40}
                        height={40}
                        alt={item.id}
                      />
                      <div className="flex flex-col">
                        <p className="font-bold">{item.name}</p>
                        <p>{item.description}</p>
                        <p>{formatCurrency(item.price)}</p>
                      </div>
                    </div>
                    <div className="flex">
                      <Button
                        variant={"outline"}
                        size={"icon"}
                        className="rounded-none h-8 w-8"
                        onClick={() =>
                          cartMutate({
                            id: item.id,
                            quantity: item.quantity + 1,
                          })
                        }
                      >
                        +
                      </Button>
                      <Input
                        value={item.quantity}
                        className="w-12 h-8 rounded-none"
                        readOnly
                      />
                      <Button
                        variant={"outline"}
                        size={"icon"}
                        className="rounded-none h-8 w-8"
                        onClick={() =>
                          cartMutate({
                            id: item.id,
                            quantity:
                              item.quantity > 1
                                ? item.quantity - 1
                                : item.quantity,
                          })
                        }
                      >
                        -
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </React.Fragment>
            );
          });
        }),
    )
    .exhaustive();
};
