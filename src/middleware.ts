import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
// middleware is applied to all routes, use conditionals to select

export default async function middleware(req:NextRequestWithAuth) {
  const token = await getToken({ req });
  const isAuthenticated = !!token;

  if (
    req.nextUrl.pathname.startsWith("/login") &&
    isAuthenticated
  ) {
    return NextResponse.redirect(
      new URL("/", req.url)
    );
  }

  return await withAuth(req, {
    pages: {
      signIn: "/login",
      signOut: "/login",
    }
  });
}
export const config = { matcher: ["/((?!assets|icon).*)"] }


