import NextAuth from "next-auth";
import { IUser } from "../interfaces/user.interface";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: IUser;
    accessToken: string;
  }

  interface User extends IUser {
    token: string;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    user?: IUser;
    accessToken: string;
  }
}

declare module "next/server" {
  class NextRequest {
    nextauth: {
      token:
        | (JWT & {
            user: IUser;
          })
        | null;
    };
  }
}
