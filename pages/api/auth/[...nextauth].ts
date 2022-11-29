import axios from "axios";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { ILoginResponse } from "../../../interfaces/auth.interface";
import { ApiResponse } from "../../../interfaces/general.interface";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "E-mail", type: "text", placeholder: "E-mail" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const response = await axios.post<ApiResponse<ILoginResponse>>(
            process.env.NEXT_PUBLIC_API_URL + "/auth/login",
            credentials,
          );

          if (response.status === 200 && response.data.body.user) {
            const { user, token } = response.data.body;
            return { ...user, token };
          }
          return null;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },

  pages: {
    signIn: "/auth/login", // Displays signin buttons
    signOut: "/auth/logout", // Displays form with sign out button
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // Used for check email page
    // newUser: null // If set, new users will be directed here on first sign in
  },

  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) { return true },
    // async redirect({ url, baseUrl }) { return baseUrl },
    // async session({ session, token, user }) { return session },
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          address: user.address,
          date_of_birth: user.date_of_birth,
          email: user.email ?? "",
          id: user.id,
          name: user.name ?? "",
          phone_number: user.phone_number,
        };
        token.accessToken = user.token;
      }

      return token;
    },
    session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user = token.user;
      return session;
    },
  },

  // Enable debug messages in the console if you are having problems
  debug: false,
};

export default NextAuth(authOptions);
