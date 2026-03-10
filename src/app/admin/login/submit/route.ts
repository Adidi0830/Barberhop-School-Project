import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const COOKIE_NAME = "admin_auth";
const COOKIE_VALUE = "1";

function safeNext(nextValue: string | null) {
  if (nextValue && nextValue.startsWith("/")) {
    return nextValue;
  }
  return "/admin";
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const username = String(formData.get("username") || "").trim();
  const password = String(formData.get("password") || "").trim();
  const nextTarget = safeNext(String(formData.get("next") || ""));

  if (username !== "admin" || password !== "123456") {
    const url = new URL("/admin/login", request.url);
    url.searchParams.set("error", "1");
    url.searchParams.set("next", nextTarget);
    return NextResponse.redirect(url);
  }

  const response = NextResponse.redirect(new URL(nextTarget, request.url));
  response.cookies.set(COOKIE_NAME, COOKIE_VALUE, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
  });
  return response;
}
