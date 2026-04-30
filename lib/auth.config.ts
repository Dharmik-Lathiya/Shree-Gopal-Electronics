import type { NextAuthConfig } from "next-auth";

export const nextAuthConfig = {
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAdminPage = nextUrl.pathname.startsWith("/admin");
      const isApiAdminPage = nextUrl.pathname.startsWith("/api/admin");
      const isAuthPage = nextUrl.pathname.startsWith("/auth");

      if (isAuthPage) {
        if (isLoggedIn) {
          return Response.redirect(new URL("/", nextUrl));
        }
        return true;
      }

      if (isAdminPage || isApiAdminPage) {
        if (!isLoggedIn) return false;
        if (auth?.user?.role !== "admin") {
          return Response.redirect(new URL("/", nextUrl));
        }
      }

      return true;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.username = token.username as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.username = user.username;
      }
      return token;
    },
  },
  providers: [], // Empty array, to be populated in auth.ts
} satisfies NextAuthConfig;
