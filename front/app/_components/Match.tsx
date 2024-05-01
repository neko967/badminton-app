import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useCallback, useEffect, useState } from "react";
import { useSession } from 'next-auth/react';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface Member {
  id: number;
  name: string;
  total_game: number;
  win_game: number;
  strength: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Match() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [members, setMembers] = useState([] as Member[]);
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
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="シングルス" {...a11yProps(0)} />
          <Tab label="ダブルス" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <div className="mx-auto w-full flex justify-start items-center flex-col">
          <section className="text-start w-96 mb-32 px-6 ">
            {members.length === 0 ? (
              <p>メンバーがいません</p>
            ) : (
              <dl className="flex flex-col w-full">
                {members.map((member: any, index: any) => (
                  <div
                    key={index}
                    className="w-full flex items-center border-b border-slate-500 border-opacity-45 py-2"
                  >
                    <dt className="w-1/3">{member?.name}</dt>
                    <dd className="w-2/3 flex justify-between items-center">
                      <span>{member?.singles_strength}</span>
                      <span>{member?.doucles_strength}</span>
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
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
    </Box>
  );
}
