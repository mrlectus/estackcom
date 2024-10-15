import { validateRequest } from "@/app/lib/lucia";
import { db } from "@/migrate";
import { NextResponse } from "next/server";
import {to} from "await-to-ts";
import { eq } from "drizzle-orm";
import { orderTable } from "@/app/drizzle/schema";

export const GET = async () => {
  const  user  = await validateRequest();
  if(user?.session){
    const [error, order] = await to(db.query.orderTable.findMany({
      where: eq(orderTable.sellerId, user.user.id)
    }));
    if(error){
      return NextResponse.json({ message: "Cannot find order" });
    }
    return NextResponse.json(order);
  }
  return NextResponse.json(
      { message: "Unauthorized" },
      {
        status: 401,
      },
    );
}
