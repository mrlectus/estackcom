import { validateRequest } from "@/app/lib/lucia";
import { db } from "@/migrate";
import { NextRequest, NextResponse } from "next/server";
import { to } from "await-to-ts";
import { eq } from "drizzle-orm";
import { orderTable } from "@/app/drizzle/schema";

export const PATCH = async (request: NextRequest) => {
  const user = await validateRequest();
  if (user?.session) {
    const { id } = await request.json();
    const [error] = await to(
      db
        .update(orderTable)
        .set({
          shippingStatus: "shipped",
        })
        .where(eq(orderTable.id, id)),
    );
    if (error) {
      return NextResponse.json(
        { message: "Cannot find order" },
        {
          status: 404,
        },
      );
    }
    return NextResponse.json({ message: "order status updated" });
  }
  return NextResponse.json(
    { message: "Unauthorized" },
    {
      status: 401,
    },
  );
};
