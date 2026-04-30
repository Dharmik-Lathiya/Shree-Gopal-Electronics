import NextAuth from "next-auth";
import { nextAuthConfig } from "./lib/auth.config";

export default NextAuth(nextAuthConfig).auth;

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*", "/auth/:path*"],
};
