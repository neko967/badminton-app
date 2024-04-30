import { useCallback, useEffect, useState } from "react";
import { useSession } from 'next-auth/react';

interface Member {
  id: number;
  name: string;
  total_game: number;
  win_game: number;
  strength: number;
}

export default function Member() {
  const [members, setMembers] = useState([] as Member[]);
  const [member, setMember] = useState({} as Member);
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/members`;
  const { data: session, status } = useSession();

  const fetchData = useCallback(async () => {
    if (session) {
      const query = session.user?.email;
      const response = await fetch (`${API_URL}?email=${query}`);
      const data = await response.json();
      setMembers(data);
    }
  }, [session]);

  useEffect(() => {
    if (session) {
      fetchData();
    }
  }, [session, fetchData]);

  const handleDelete = async (id: number) => {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    }).then(() => {
      fetchData();
    });
  };

  return (
    <>
      <main className="mx-auto w-full flex justify-start items-center flex-col mt-32">
        <h1 className="font-semibold text-xl my-8">全てのメンバー</h1>
        <section className="text-start w-96 mb-16">
          {members.length === 0 ? (
            <p>メンバーがいません</p>
          ) : (
            <dl className="flex flex-col w-full">
              {members.map((member, index) => (
                <div
                  key={index}
                  className="w-full flex items-center border-b border-slate-500 border-opacity-45 py-2"
                >
                  <dt className="w-1/3">{member?.name}</dt>
                  <dd className="w-2/3 flex justify-between items-center">
                    <span>{member?.total_game}</span>
                    <span>{member?.win_game}</span>
                    <span>{member?.strength}</span>
                    <button
                      className="border rounded p-2 hover:bg-slate-400 transition-all"
                      onClick={() => handleDelete(member.id)}
                      type="button"
                    >
                      削除
                    </button>
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </section>
      </main>
    </>
  );
}
