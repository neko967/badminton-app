import { type DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      uid: string;
      accessToken?: string | undefined;
      provider?: string;
      picture?: string | null | undefined
    } & DefaultSession["user"];
  }

  interface User {
    uid: string;
    accessToken?: string | undefined;
    provider?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    uid: string;
    accessToken?: string | undefined;
    provider?: string;
  }
}
