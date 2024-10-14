import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import React from "react";
import { formatCurrency } from "@/lib/utils";
import { Button } from "./ui/button";
import { LoaderCircle, ShoppingCart } from "lucide-react";
import { Badge } from "./ui/badge";
import { estackApi } from "@/app/services";
import { match } from "ts-pattern";
import { useToast } from "@/hooks/use-toast";
import { QueryStatus } from "@reduxjs/toolkit/query";

type ProductProps = {
  id: string;
  name: string;
  image_key: string | null;
  price: number;
  description: string | null;
  quantity: number;
  sellerId: string;
};

export const ProductCard = ({
  name,
  image_key,
  price,
  description,
  quantity,
  sellerId,
}: ProductProps) => {
  const [cart, { isLoading, status }] = estackApi.useAddItemToCArtMutation();
  const { toast } = useToast();
  React.useEffect(() => {
    match(status)
      .with(QueryStatus.fulfilled, () =>
        toast({
          description: "Item added to Cart",
        }),
      )
      .with(QueryStatus.rejected, () =>
        toast({
          variant: "destructive",
          description: "Item not added to cart",
        }),
      )
      .otherwise(() => "Something went wrong");
  }, [status]);
  return (
    <React.Fragment>
      <div className="flex flex-col gap-2">
        <Card className="w-[270px] h-[270px]">
          <Badge className="m-1" variant={"secondary"}>
            {quantity} items left
          </Badge>
          <CardContent>
            <Image
              src={image_key!}
              alt={crypto.randomUUID()}
              width={300}
              height={300}
            />
          </CardContent>
        </Card>
        <div className="w-[270px] flex flex-col gap-2">
          <div className="flex justify-between">
            <p className="font-bold capitalize">{name}</p>
            <p>{formatCurrency(price)}</p>
          </div>
          <div>
            <p>{description}</p>
          </div>
          <div>
            <Button
              className="flex gap-2 items-center"
              onClick={() =>
                cart({
                  key: image_key!,
                  name,
                  sellerId,
                  price,
                  description,
                })
              }
            >
              {isLoading ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <>
                  <ShoppingCart /> {"Add to Cart"}
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
