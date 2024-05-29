import React from 'react';
import { useSession, signIn } from 'next-auth/react';
import error from "next/error";

export default function Login({ provider }: { provider: string }) {
  const { data: session, status } = useSession();

  if (status === 'loading') {
  	return <div>Loading...</div>;
  }

  if (status !== 'authenticated') {
  	return (
  	  <div>
  	  	<button onClick={() => {
          signIn(provider, { callbackUrl: "/" }).catch(() => {
            console.error(error);
          });
        }}>
  	  	  Googleでログイン
  	  	</button>
  	  </div>
  	);
  }
  return null;
}
