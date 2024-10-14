import { lucia, validateRequest } from "@/app/lib/lucia";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const POST = async () => {
  const { session } = await validateRequest();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await lucia.invalidateSession(session.id);
  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return NextResponse.json({ message: "Logout successful" });
};
