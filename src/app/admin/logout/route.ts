import { NextResponse } from "next/server";

const COOKIE_NAME = "admin_auth";

export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL("/admin/login", request.url));
  response.cookies.set(COOKIE_NAME, "", {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    maxAge: 0,
  });
  return response;
}
