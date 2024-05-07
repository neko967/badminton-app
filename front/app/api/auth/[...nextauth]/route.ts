import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
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
    maxAge: 60 * 24 * 24
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && account.access_token && user) {
        token.id = user.id;
        token.accessToken = account.access_token;
        token.name = user.name;
        token.image = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.accessToken && token.id) {
        session.accessToken = token.accessToken as string;
        session.user = {
          ...session.user,
          id: token.id as string,
        };
      }
      return session;
    },
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
  	  	  return true;
  	  	} else {
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
