import { validateRequest } from "@/app/lib/lucia";
import { NextRequest, NextResponse } from "next/server";
import { to } from "await-to-ts";
import { db } from "@/migrate";
import { eq } from "drizzle-orm";
import { productTable } from "@/app/drizzle/schema";

export const DELETE = async (
  _request: NextRequest,
  { params }: { params: { id: string } },
) => {
  const user = await validateRequest();
  if (user.session) {
    const [err] = await to(
      db.delete(productTable).where(eq(productTable.id, params.id)),
    );
    if (err)
      return NextResponse.json(
        { message: "Cannot delete product" },
        {
          status: 500,
        },
      );
    return NextResponse.json({ message: "Product deleted sucessfully" });
  }
  return NextResponse.json(
    { message: "Unauthorize" },
    {
      status: 401,
    },
  );
};
