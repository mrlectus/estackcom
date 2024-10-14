"use client";
import { productSchema } from "@/app/types/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { uploadProduct } from "@/app/actions";
import React from "react";
import { useFormState } from "react-dom";
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
import { Textarea } from "@/components/ui/textarea";
import { ActionButton } from "@/components/action-button";
export const ProductForm = () => {
  const formRef = React.useRef<HTMLFormElement>(null);
  const [state, action] = useFormState(uploadProduct, null);
  const productForm = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      file: "",
      price: 0,
      stock: 0,
    },
  });
  const { toast } = useToast();
  const { refetch } = estackApi.useGetUserProductQuery();

  React.useEffect(() => {
    match(state)
      .with({ message: P.string }, (msg) => {
        refetch();
        toast({
          title: "Success",
          description: msg.message,
        });
      })
      .with({ error: P.string }, (msg) =>
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: msg.error,
        }),
      )
      .otherwise(() => null);
  }, [state, toast]);
  const fileRef = productForm.register("file");
  return (
    <Form {...productForm}>
      <form ref={formRef} action={action}>
        <FormField
          control={productForm.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={productForm.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={productForm.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={productForm.control}
          name="stock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={productForm.control}
          name="file"
          render={() => (
            <FormItem>
              <FormLabel>Product Image</FormLabel>
              <FormControl>
                <Input type="file" {...fileRef} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-3">
          <ActionButton
            onClick={productForm.handleSubmit(() => {
              return formRef.current?.requestSubmit();
            })}
            className="flex w-full"
            text="Submit"
          />
        </div>
      </form>
    </Form>
  );
};
