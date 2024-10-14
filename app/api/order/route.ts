import { cartTable, orderTable } from "@/app/drizzle/schema";
import { validateRequest } from "@/app/lib/lucia";
import { db } from "@/migrate";
import { to } from "await-to-ts";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
export const POST = async (request: NextRequest) => {
  const user = await validateRequest();
  if (user?.session) {
    const { address,  carts } = await request.json();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const orderTablePayload = carts.map((cart: any) => {
      return {
        userId: cart.userId,
        name: cart.name,
        sellerId: cart.sellerId,
        paymentStatus: "paid",
        totalPrice: cart.price * cart.quantity + 20 * cart.quantity,
        quantity: cart.quantity,
        address
      }
    });
    const [error] = await to(db.transaction(async (tx) => {
      await tx.insert(orderTable).values(orderTablePayload);
      await Promise.all(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        carts.map((cart: any) => {
       return   tx.delete(cartTable).where(eq(cartTable.id, cart.id));
        }),
      );
    }));
    if (error) {
      return NextResponse.json({ message: "Cannot delete item from cart!" });
    }
    return NextResponse.json({ message: "delete was a success" });
  }
  return NextResponse.json(
    { message: "Unauthorized" },
    {
      status: 401,
    },
  );
};
