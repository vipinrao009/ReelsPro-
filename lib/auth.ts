import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectTODatabase } from "./db";
import User from "../models/User";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "text" },
      },
      async authorize(credentials: any): Promise<any> {
        if (!credentials?.email || credentials.password) {
          throw new Error("Missing email or password");
        }

        try {
          await connectTODatabase();
          const user = await User.findOne({ email: credentials?.email });

          if (!user) {
            throw new Error("User not found");
          }

          const isValid = await bcrypt.compare(
            credentials.password,
            user.Password
          );

          if (!isValid) {
            throw new Error("Password is incorrect");
          }

          return {
            id: user._id.toString(),
            email: user.email,
          };
        } catch (error) {}
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }

      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  secret: process.env.NEXTAUTH_SECRET
};
