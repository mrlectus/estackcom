import { validateRequest } from "@/app/lib/lucia";
import { NextRequest, NextResponse } from "next/server";
import { to } from "await-to-ts";
import { db } from "@/migrate";
import { eq } from "drizzle-orm";
import { userTable } from "@/app/drizzle/schema";

export const DELETE = async (
  _request: NextRequest,
  { params }: { params: { id: string } },
) => {
  const user = await validateRequest();
  if (user.user?.id === params.id) {
    return NextResponse.json(
      { message: "You cannot delete yourself" },
      {
        status: 500,
      },
    );
  }
  if (user.session) {
    const [err] = await to(
      db.delete(userTable).where(eq(userTable.id, params.id)),
    );
    if (err)
      return NextResponse.json(
        { message: "Cannot delete user" },
        {
          status: 500,
        },
      );
    return NextResponse.json({ message: "User deleted sucessfully" });
  }
  return NextResponse.json(
    { message: "Unauthorize" },
    {
      status: 401,
    },
  );
};
