"use server";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { put } from "@vercel/blob";
import { validateRequest } from "../lib/lucia";
import { db } from "@/migrate";
import { productTable } from "../drizzle/schema";
import to from "await-to-ts";
import { revalidatePath } from "next/cache";

const productSchema = zfd.formData({
  name: zfd.text(),
  description: zfd.text(z.string().optional()),
  file: zfd.file(),
  price: zfd.numeric(z.coerce.number()),
  stock: zfd.numeric(z.coerce.number()),
});

type FormMessage = { message: string } | { error: string } | null;

export const uploadProduct = async (
  _prev: unknown,
  data: FormData,
): Promise<FormMessage> => {
  const user = await validateRequest();
  if (user.session) {
    const payload = productSchema.safeParse(data);
    if (payload.error) {
      console.log(payload.error);
      return { error: "An error occured" };
    }
    const blob = await put(payload.data.file.name, payload.data.file, {
      access: "public",
    });

    const [err] = await to(
      db.insert(productTable).values({
        sellerId: user.user.id,
        name: payload.data.name,
        description: payload.data.description,
        price: payload.data.price,
        stock: payload.data.stock,
        key: blob.url,
      }),
    );

    if (err) {
      console.log(err);
      return { error: err.message };
    }
    revalidatePath("/seller/products");
    return { message: "Product uploaded sucessfully" };
  }
  return { error: "Unauthorize" };
};
