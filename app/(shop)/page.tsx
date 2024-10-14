"use client";

import { LoaderCircle } from "lucide-react";
import { estackApi } from "../services";
import { ProductCard } from "@/components/product-card";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { match } from "ts-pattern";
import { useAuth } from "../providers/sesssion";
import { useToast } from "@/hooks/use-toast";

const Shop = () => {
  const { user } = useAuth();
  const product = estackApi.useGetAllProductQuery();
  console.log(product?.data);
  const cartItem = estackApi.useGetCartByIdQuery({ id: user!.id });
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const { toast } = useToast();
    const isSuccess = searchParams.get("success");
    const [makeOrder] = estackApi.useCreateOrderMutation();
     const pathname = usePathname()
  const router = useRouter();
    React.useEffect(() => {
      match(isSuccess)
        .with("true", () => {
          if(cartItem?.data){
            makeOrder({address: "Fake address", carts: cartItem.data})
            router.push(pathname + `?`);
            toast({
              description: "Hurray!!! Order has been placed",
            });
          }        })
        .with("false", () => {
          //TODO
        })
        .otherwise(() => null);
    }, [isSuccess, cartItem.data, pathname, toast]);
  return (
    <main className="bg-[#f6f6f9] w-screen min-h-screen p-3 mt-20">
      <div className="flex flex-col items-center md:grid sm:grid sm:grid-cols-2 md:grid-cols-4 gap-3 ">
        {product.isLoading ? (
          <LoaderCircle className="animate-spin" />
        ) : (
          product.data?.map((item) => {
            return (
              <ProductCard
                quantity={item.stock}
                sellerId={item.sellerId}
                image_key={item.key}
                id={item.id}
                name={item.name}
                description={item.description}
                price={item.price}
                key={item.id}
              />
            );
          })
        )}
      </div>
    </main>
  );
};

export default Shop;
