import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import axios from 'axios';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const handler = NextAuth({
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET || '',
  providers: [
  	GoogleProvider({
  		clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
  		clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET || '',
  	}),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 24 * 24
  },
  callbacks: {
    async jwt({ token, user, account, profile }) {

      if (user) {
        token.user = user;
        const u = user as any;
        token.role = u.role;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      token.accessToken;
      return {
        ...session,
        user: {
          ...session.user,
          role: token.role,
        },
      };
    },
  	async signIn({ user, account }) {
  	  const provider = account?.provider;
  	  const uid = user?.id;
  	  const name = user?.name;
  	  const email = user?.email;

  	  try {
        console.log(provider);
        console.log(uid);
        console.log(name);
        console.log(email);
        const response =  await fetch(`${apiUrl}/auth/${provider}/callback`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            provider: provider,
            uid: uid,
            name: name,
            email: email,
          }),
        });
        console.log("2");
  	  	if (response.status === 200) {
          console.log("3");
  	  	  return true;
  	  	} else {
          console.log("4");
  	  	  return false;
  	  	}
  	  } catch (error) {
        console.log('エラーです', error);
        return false;
      }
  	},
  },
});

export { handler as GET, handler as POST };
