import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { getServerSession } from 'next-auth/next';

const apiUrl = process.env.NEXT_PUBLIC_DOCKER_API_URL;

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET || '',
  providers: [
  	GoogleProvider({
  		clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
  		clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET || '',
  	}),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    maxAge: 24 * 60 * 60, // 24 hours
  },
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
  	async signIn({ user, account }) {
  	  const provider = account?.provider;
  	  const uid = user?.id;
  	  const name = user?.name;
  	  const email = user?.email;

  	  try {
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
  	  	if (response.status === 200) {
          const data = await response.json();
          user.userId = data.user.id;
          user.accessToken = data.accessToken;
  	  	  return true;
  	  	} else {
  	  	  return false;
  	  	}
  	  } catch (error) {
        console.log('エラーです', error);
        return false;
      }
  	},
    async jwt({ token, account, user }) {
      if (account && user) {
        token.userId = user.userId;
        token.accessToken = user.accessToken;
        token.provider = account.provider;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
