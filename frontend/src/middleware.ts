import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedPaths: string[] = [
  "/market",
  "/posts",
  "/explore",
  "/ai_generated",
  "/ai_minting",
  "/manual",
  "/collection",
  "/space",
  "/favourites",
];

export const config = {
  matcher: [
    "/",
    "/market",
    "/posts",
    "/explore",
    "/ai_generated",
    "/ai_minting",
    "/manual",
    "/collection",
    "/space",
    "/favourites",
  ],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  if (protectedPaths.some((path) => pathname.startsWith(path))) {
    //check not logged in
    console.log("request.url", request.url, token);
    if (!token) {
      // const url = new URL("/", request.url);
      const url = new URL("/api/auth/signin", request.url);
      url.searchParams.set("callbackUrl", encodeURI(request.url));
      return NextResponse.redirect(url);
    }
  } else {
    if (token && request.nextUrl.pathname === "/") {
      return NextResponse.redirect(new URL("/market", request.url));
    }
    console.log("hello", request.nextUrl.pathname);
  }
  return NextResponse.next();
}

// import { getServerSession } from "next-auth";
// import { useSession } from "next-auth/react";
// import { getSession } from "next-auth/react";

// import { verify } from "./services/jwt_sign_verify";

// const secret = process.env.NEXTAUTH_SECRET || "secret";

// export default async function middleware(req: NextRequest) {
// const { data: session, status } = useSession();
// const session = await getServerSession();
// const session = await getSession();
// console.log("middleware", session, status);
// const jwt = req.cookies.get("next-auth.session-token");
// const url = req.url;
// const { pathname } = req.nextUrl;
// // jwt?.value,
// console.log(pathname);

//   if (pathname.startsWith("/dashboard")) {
//     if (jwt === undefined) {
//       req.nextUrl.pathname = "/login";
//       return NextResponse.redirect(req.nextUrl);
//     }

//     try {
//       await verify(jwt, secret);
//       return NextResponse.next();
//     } catch (error) {
//       req.nextUrl.pathname = "/login";
//       return NextResponse.redirect(req.nextUrl);
//     }
//   }

// return NextResponse.next();
// }
