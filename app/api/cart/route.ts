import { validateRequest } from "@/app/lib/lucia";
import { NextRequest, NextResponse } from "next/server";
import { to } from "await-to-ts";
import { z } from "zod";
import { db } from "@/migrate";
import { cartTable } from "@/app/drizzle/schema";
const cartInputSchema = z.object({
  name: z.string(),
  key: z.string(),
  description: z.string().nullish(),
  price: z.number(),
  sellerId: z.string(),
});

export type CartInput = z.infer<typeof cartInputSchema>;
export const POST = async (request: NextRequest) => {
  const user = await validateRequest();
  if (user.session) {
    const [err, cart] = await to(request.json());
    if (err)
      return Response.json(
        { message: "Cannot get data" },
        {
          status: 500,
        },
      );
    const validCart = cartInputSchema.safeParse(cart);
    if (validCart.success) {
      const [xErr] = await to(
        db.insert(cartTable).values({
          sellerId: validCart.data.sellerId,
          description: validCart.data.description,
          name: validCart.data.name,
          price: validCart.data.price,
          key: validCart.data.key,
          userId: user.user.id,
        }),
      );
      if (xErr)
        return NextResponse.json({ message: "Cannot add item to cart!" });
      return NextResponse.json(
        { message: "item added to cart!" },
        {
          status: 201,
        },
      );
    } else {
      return NextResponse.json({ message: validCart.error.message[0] });
    }
  }
  return NextResponse.json(
    { message: "Unauthorized" },
    {
      status: 401,
    },
  );
};
