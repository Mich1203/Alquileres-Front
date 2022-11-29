import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
export default withAuth(
  async (request: NextRequest) => {
    const {
      nextauth: { token },
      nextUrl: { pathname },
    } = request;
    if (!token && !pathname.startsWith("/auth"))
      return NextResponse.redirect(
        process.env.NEXT_PUBLIC_APP_URL + "/auth/login",
      );

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ req, token }) {
        const pathname = req.nextUrl.pathname;
        // `/admin` requires admin role
        if (pathname === "/admin") {
          return token?.userRole === "admin";
        }
        if (!token && !pathname.startsWith("/auth")) {
          return false;
        }
        return true;
      },
    },
  },
);

// export const config = { matcher: ["/admin", "/me"] };
