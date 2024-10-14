import { validateRequest } from "@/app/lib/lucia";
import { NextResponse } from "next/server";
import { to } from "await-to-ts";
import { db } from "@/migrate";
import { eq } from "drizzle-orm";
import { productTable } from "@/app/drizzle/schema";

export const GET = async () => {
  const user = await validateRequest();
  if (user.session) {
    const [err, product] = await to(
      db.query.productTable.findMany({
        where: eq(productTable.sellerId, user.user.id),
      }),
    );
    if (err) return NextResponse.json([]);
    return NextResponse.json(product);
  }
  return NextResponse.json(
    { message: "Unauthorize" },
    {
      status: 401,
    },
  );
};
