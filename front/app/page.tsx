"use client";

import { useCallback, useEffect, useState } from "react";

interface Task {
  id: number;
  title: string;
  description: string;
}

export default function Home() {
  const [tasks, setTasks] = useState([] as Task[]);
  const [task, setTask] = useState({} as Task);
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/tasks`;

  const fetchData = useCallback(async () => {
    await fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
      });
  }, []);

  useEffect(() => {
    // データを取得
    fetchData();
  }, [fetchData]);

  const handleDelete = async (id: number) => {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    }).then(() => {
      fetchData();
    });
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // データを追加
    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: task.title,
        description: task.description,
      }),
    }).then(() => {
      fetchData();
    });
  };

  return (
    <main className="mx-auto w-full flex justify-start items-center flex-col mt-32">
      <h1 className="font-semibold text-xl my-8">タスク一覧</h1>
      <section className="text-start w-96 mb-16">
        {tasks.length === 0 ? (
          <p>タスクがありません</p>
        ) : (
          <dl className="flex flex-col w-full">
            {tasks.map((task, index) => (
              <div
                key={index}
                className="w-full flex items-center border-b border-slate-500 border-opacity-45 py-2"
              >
                <dt className="w-1/3">{task?.title}</dt>
                <dd className="w-2/3 flex justify-between items-center">
                  <span>{task?.description}</span>
                  <button
                    className="border rounded p-2 hover:bg-slate-400 transition-all"
                    onClick={() => handleDelete(task.id)}
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
      <section className="w-96 border-2 p-4">
        <h2 className="text-lg mb-4">新しいタスクを追加</h2>
        <form className="flex flex-col gap-2" onSubmit={handleOnSubmit}>
          <div className="flex justify-between">
            <label htmlFor="title">タスク名</label>
            <input
              id="title"
              name="title"
              type="text"
              required
              className="bg-slate-200"
              onChange={(e) => setTask({ ...task, title: e.target.value })}
            />
          </div>

          <div className="flex justify-between">
            <label htmlFor="description">説明</label>
            <input
              id="description"
              name="description"
              type="text"
              required
              className="bg-slate-200"
              onChange={(e) =>
                setTask({ ...task, description: e.target.value })
              }
            />
          </div>
          <div className="w-full m-auto mt-4 text-center">
            <button className="w-full border-2 p-2 hover:bg-slate-400 transition-all">
              追加
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
