import { type DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      sub: string;
      userId: string;
      accessToken?: string | undefined;
      provider?: string;
      picture?: string | null | undefined
    } & DefaultSession["user"];
  }

  interface User {
    sub: string;
    userId: string;
    accessToken?: string | undefined;
    provider?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    sub: string;
    userId: string;
    accessToken?: string | undefined;
    provider?: string;
  }
}
