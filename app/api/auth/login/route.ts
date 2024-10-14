import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { to } from "await-to-ts";
import { db } from "@/migrate";
import { userTable } from "@/app/drizzle/schema";
import { eq } from "drizzle-orm";
import { lucia } from "@/app/lib/lucia";
import { cookies } from "next/headers";
import { userSchema } from "@/app/types/schema";

export const POST = async (request: NextRequest) => {
  let err, check, user;
  [err, user] = await to(request.json());
  const { data } = userSchema
    .omit({
      role: true,
      email: true,
    })
    .safeParse(user);
  if (!data) {
    return NextResponse.json({ error: "Invalid user data" }, { status: 400 });
  }
  [err, user] = await to(
    db.query.userTable.findFirst({
      where: eq(userTable.username, data.username),
    }),
  );
  if (err) {
    return NextResponse.json(
      { error: "Error querying database" },
      { status: 500 },
    );
  }
  if (!user) {
    return NextResponse.json(
      { error: "username or password incorrect" },
      { status: 400 },
    );
  }
  // eslint-disable-next-line prefer-const
  [err, check] = await to(bcrypt.compare(data.password, user.password));
  if (err) {
    return NextResponse.json(
      { error: "Error hashing password" },
      { status: 500 },
    );
  }
  if (!check) {
    return NextResponse.json(
      { error: "username or password incorrect" },
      { status: 400 },
    );
  }
  if (check) {
    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
    return NextResponse.json({
      message: "Login successful",
      role: user.role,
    });
  }
  return NextResponse.json(
    { message: "Something went wrong" },
    { status: 500 },
  );
};
