import { validateRequest } from "@/app/lib/lucia";
import { NextRequest, NextResponse } from "next/server";
import { to } from "await-to-ts";
import { db } from "@/migrate";
import { eq } from "drizzle-orm";
import { cartTable } from "@/app/drizzle/schema";

export const GET = async (
  _request: NextRequest,
  { params }: { params: { id: string } },
) => {
  const user = await validateRequest();
  if (user.session) {
    const [err, items] = await to(
      db.query.cartTable.findMany({
        where: eq(cartTable.userId, params.id),
      }),
    );
    if (err) return NextResponse.json([]);
    return NextResponse.json(items);
  }
  return NextResponse.json(
    { message: "Unauthorize" },
    {
      status: 401,
    },
  );
};

export const DELETE = async (
  _request: NextRequest,
  { params }: { params: { id: string } },
) => {
  const user = await validateRequest();
  if (user.session) {
    const [err] = await to(
      db.delete(cartTable).where(eq(cartTable.id, params.id)),
    );
    if (err)
      return NextResponse.json(
        { message: "Cannot delete cart item" },
        {
          status: 500,
        },
      );
    return NextResponse.json({ message: "Item deleted sucessfully" });
  }
  return NextResponse.json(
    { message: "Unauthorize" },
    {
      status: 401,
    },
  );
};

export const PATCH = async (
  request: NextRequest,
  { params }: { params: { id: string } },
) => {
  const user = await validateRequest();
  const { quantity } = await request.json();
  if (user.session) {
    const [err] = await to(
      db
        .update(cartTable)
        .set({
          quantity,
        })
        .where(eq(cartTable.id, params.id)),
    );
    if (err)
      return NextResponse.json(
        { message: "Something went wrong!" },
        {
          status: 500,
        },
      );
    return NextResponse.json({ message: "Cart quantity updated" });
  }
  return NextResponse.json(
    { message: "Unauthorize" },
    {
      status: 401,
    },
  );
};
