import { verifyRequestOrigin } from "lucia";
import { NextRequest, NextResponse } from "next/server";

export const middleware = async (request: NextRequest) => {
  if (request.method === "GET") {
    return NextResponse.next();
  }
  const originHeader = request.headers.get("Origin");
  const hostHeader = request.headers.get("Host");
  if (
    !originHeader ||
    !hostHeader ||
    !verifyRequestOrigin(originHeader, [hostHeader])
  ) {
    // return NextResponse.redirect("/auth");
    return new NextResponse(null, {
      status: 403,
    });
  }
  return NextResponse.next();
};
