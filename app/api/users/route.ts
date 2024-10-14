import { validateRequest } from "@/app/lib/lucia";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { to } from "await-to-ts";
import { db } from "@/migrate";
import { userTable } from "@/app/drizzle/schema";
import { eq } from "drizzle-orm";
import { userSchema } from "@/app/types/schema";

export const GET = async () => {
  const user = await validateRequest();
  if (user.session) {
    const [err, users] = await to(db.query.userTable.findMany());
    if (err) return NextResponse.json([]);
    return NextResponse.json(users);
  }
  return NextResponse.json(
    { message: "Unauthorize" },
    {
      status: 401,
    },
  );
};

export const POST = async (request: NextRequest) => {
  let err, user, hashedPassword;
  const users = await validateRequest();
  if (users.session) {
    [err, user] = await to(request.json());
    const validUser = userSchema.safeParse(user);
    if (!validUser.success) {
      return NextResponse.json(
        { message: "Invalid user data" },
        { status: 400 },
      );
    }
    [err, user] = await to(
      db.query.userTable.findFirst({
        where: eq(userTable.username, validUser.data.username),
      }),
    );
    if (err) {
      console.log(err);
      return NextResponse.json(
        { message: "Error querying database" },
        { status: 500 },
      );
    }
    if (user) {
      return NextResponse.json(
        { message: "User with that username already exists" },
        { status: 400 },
      );
    }
    [err, hashedPassword] = await to(bcrypt.hash(validUser.data.password, 10));
    if (err) {
      console.log(err);
      return NextResponse.json(
        { error: "Error hashing password" },
        { status: 500 },
      );
    }
    [err, user] = await to(
      db
        .insert(userTable)
        .values({
          username: validUser.data.username,
          email: validUser.data.email,
          password: hashedPassword,
          role: validUser.data.role,
        })
        .returning({ id: userTable.id }),
    );
    if (user) {
      return NextResponse.json({
        message: "User created succcessful",
      });
    }
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
  return NextResponse.json(
    { message: "Unauthorize" },
    {
      status: 401,
    },
  );
};
