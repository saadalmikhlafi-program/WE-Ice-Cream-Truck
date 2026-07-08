import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

// ─── HARDCODED ADMIN BYPASS (Development) ──────────────────────────────────
// Used when the database is not yet available.
// Remove this and use the DB-based auth once Supabase is online.
const DEV_ADMIN = {
  id: "admin-owner-01",
  email: "saadmoad2004@gmail.com",
  password: "Kals123456##", // Plain text for dev bypass only
  name: "Saad Admin",
  role: "OWNER",
  permissions: ["*"],
};
// ───────────────────────────────────────────────────────────────────────────

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // ── 1. Dev bypass: always try the hardcoded admin first ──
        if (
          credentials.email.toLowerCase() === DEV_ADMIN.email.toLowerCase() &&
          credentials.password === DEV_ADMIN.password
        ) {
          return {
            id: DEV_ADMIN.id,
            email: DEV_ADMIN.email,
            name: DEV_ADMIN.name,
            role: DEV_ADMIN.role,
            permissions: DEV_ADMIN.permissions,
          };
        }

        // ── 2. DB-based auth (when database is available) ──
        try {
          const { prisma } = await import("@/lib/prisma");
          const user = await prisma.user.findUnique({
            where: { email: credentials.email.toLowerCase() },
          });

          if (!user || !user.active) {
            return null;
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.passwordHash
          );

          if (!isPasswordValid) {
            return null;
          }

          // SQLite stores permissions as JSON string; Supabase stores as String[]
          // This parse handles both formats transparently
          let parsedPermissions: string[] = [];
          try {
            parsedPermissions = typeof user.permissions === "string"
              ? JSON.parse(user.permissions)
              : (user.permissions as unknown as string[]);
          } catch {
            parsedPermissions = [];
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            permissions: parsedPermissions,
          };
        } catch (err) {
          // DB not available — only the hardcoded admin bypass works
          console.warn("DB auth failed (DB offline?):", err);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
        token.permissions = (user as any).permissions;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
        (session.user as any).permissions = token.permissions;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
