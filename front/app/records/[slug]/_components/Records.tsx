import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useCallback, useEffect, useState, Suspense } from "react";
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import EditIcon from '@mui/icons-material/Edit';
import SinglesRecordEditDialog from './SinglesRecordEditDialog';
import DoublesRecordEditDialog from './DoublesRecordEditDialog';
import type { Member } from '@/app/types/index';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
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

interface TabComponentProps {
  singlesRecords: any[];
  doublesRecords: any[];
  handleSinglesRecordEditDialogOpen: (id: number) => void;
  handleDoublesRecordEditDialogOpen: (id: number) => void;
}

function TabComponent({
  singlesRecords,
  handleSinglesRecordEditDialogOpen,
  doublesRecords,
  handleDoublesRecordEditDialogOpen,
}: TabComponentProps) {

  const searchParams = useSearchParams();
  const set_value = searchParams.get('set_value');
  const defaultValue = set_value ? Number(set_value) : 0;
  const [value, setValue] = useState(defaultValue);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Tabs value={value} onChange={handleTabChange} aria-label="basic tabs example">
        <Tab label="シングルス" {...a11yProps(0)} sx={{ width: '50%' }}/>
        <Tab label="ダブルス" {...a11yProps(1)} sx={{ width: '50%' }}/>
      </Tabs>
      <CustomTabPanel value={value} index={0}>
        <div className="mx-auto w-full flex justify-start items-center flex-col">
          <section className="text-start w-96 px-6 ">
            {singlesRecords.length === 0 ? (
              <p>記録がありません</p>
            ) : (
              <dl className="flex flex-col w-full">
                {singlesRecords.map((singlesRecord) => (
                  <div
                    key={singlesRecord.id}
                    className="w-full flex items-center border-b border-slate-500 border-opacity-45 py-2 h-16"
                  >
                    <div className="w-5/6 flex items-center justify-between">
                      <div className="w-2/5 flex justify-start">
                        <p>{singlesRecord?.player_1}</p>
                      </div>
                      <div className="w-1/5 flex justify-center">
                        <p>{singlesRecord?.score_1} - {singlesRecord?.score_2}</p>
                      </div>
                      <div className="w-2/5 flex justify-end">
                        <p>{singlesRecord?.player_2}</p>
                      </div>
                    </div>
                    <div className="w-1/6 flex items-center justify-end">
                      { singlesRecord?.score_1 == null && singlesRecord?.score_2 == null ?
                        <button
                          className="border rounded p-2 hover:bg-slate-400 transition-all"
                          onClick={() => handleSinglesRecordEditDialogOpen(singlesRecord.id)}
                          type="button"
                        >
                          <EditIcon />
                        </button>
                      :
                        <div className="w-1/6 h-12"></div>
                      }
                    </div>
                  </div>
                ))}
              </dl>
            )}
          </section>
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <div className="mx-auto w-full flex justify-start items-center flex-col">
          <section className="text-start w-96 px-6 ">
            {doublesRecords.length === 0 ? (
              <p>記録がありません</p>
            ) : (
              <dl className="flex flex-col w-full">
                {doublesRecords.map((doublesRecord) => (
                  <div
                    key={doublesRecord.id}
                    className="w-full flex items-center border-b border-slate-500 border-opacity-45 py-2 h-16"
                  >
                    <div className="w-5/6 flex items-center">
                      <div className="w-2/5 flex justify-start">
                        <div className="w-full">
                          <div className="flex justify-start">
                            <p>{doublesRecord?.player_1}</p>
                          </div>
                          <div className="flex justify-start">
                            <p>{doublesRecord?.player_2}</p>
                          </div>
                        </div>
                      </div>
                      <div className="w-1/5 flex justify-center">
                        <p>{doublesRecord?.score_12} - {doublesRecord?.score_34}</p>
                      </div>
                      <div className="w-2/5 flex justify-end">
                        <div className="w-full">
                          <div className="flex justify-end">
                            <p>{doublesRecord?.player_3}</p>
                          </div>
                          <div className="flex justify-end">
                            <p>{doublesRecord?.player_4}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-1/6 flex items-center justify-end">
                      { doublesRecord?.score_12 == null && doublesRecord?.score_34 == null ?
                        <button
                          className="border rounded p-2 hover:bg-slate-400 transition-all"
                          onClick={() => handleDoublesRecordEditDialogOpen(doublesRecord.id)}
                          type="button"
                        >
                          <EditIcon />
                        </button>
                      :
                        <div className="w-1/6 h-12"></div>
                      }
                    </div>
                  </div>
                ))}
              </dl>
            )}
          </section>
        </div>
      </CustomTabPanel>
    </>
  );
}

export default function Records({ params }: { params: { slug: string } }) {
  const { data: session, status } = useSession();
  const [singlesRecords, setSinglesRecords] = useState<any[]>([]);
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}`;

  const fetchSinglesData = useCallback(async () => {
    const response = await fetch(`${API_URL}/singles_records`, {
      method: 'GET',
      headers: {
        'slug': `${params.slug}`,
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    setSinglesRecords(data);
  }, [API_URL, params]);

  useEffect(() => {
    fetchSinglesData();
  }, [fetchSinglesData]);

  const [singlesRecord_id, setSinglesRecord_id] = useState<number>(0);
  const [singlesRecordEditDialogOpen, setSinglesRecordEditDialogOpen] = useState(false);
  const handleSinglesRecordEditDialogOpen = (id: number) => {
    setSinglesRecord_id(id);
    setSinglesRecordEditDialogOpen(true);
  };
  const handleSinglesRecordEditDialogClose = () => {
    setSinglesRecordEditDialogOpen(false);
  };

  const [doublesRecords, setDoublesRecords] = useState([]);
  const fetchDoublesData = useCallback(async () => {
    const response = await fetch(`${API_URL}/doubles_records`, {
      method: 'GET',
      headers: {
        'slug': `${params.slug}`,
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    setDoublesRecords(data);
  }, [API_URL, params]);

  useEffect(() => {
    fetchDoublesData();
  }, [fetchDoublesData]);

  const [doublesRecord_id, setDoublesRecord_id] = useState<number>(0);
  const [doublesRecordEditDialogOpen, setDoublesRecordEditDialogOpen] = useState(false);
  const handleDoublesRecordEditDialogOpen = (id: number) => {
    setDoublesRecord_id(id);
    setDoublesRecordEditDialogOpen(true);
  };
  const handleDoublesRecordEditDialogClose = () => {
    setDoublesRecordEditDialogOpen(false);
  };

  const [members, setMembers] = useState<Member[]>([]);
  const fetchMemberData = useCallback(async () => {
    const response = await fetch(`${API_URL}/members`, {
      method: 'GET',
      headers: {
        'slug': `${params.slug}`,
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
      setMembers(data);
  }, [API_URL, params]);

  useEffect(() => {
    fetchMemberData();
  }, [fetchMemberData]);

  useEffect(() => {
    if (status === 'authenticated') {
      const addGroupToUser = async () => {
        await fetch(`${API_URL}/user_groups`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.user.accessToken}`,
            'slug': `${params.slug}`,
          },
        });
      };
      addGroupToUser();
    }
  }, [status, API_URL ,params, session]);

  return (
    <>
      <Box sx={{ width: '100%', overflow: 'hidden' }}>
        <Suspense fallback={<div>Loading...</div>}>
          <TabComponent
            singlesRecords={singlesRecords}
            doublesRecords={doublesRecords}
            handleSinglesRecordEditDialogOpen={handleSinglesRecordEditDialogOpen}
            handleDoublesRecordEditDialogOpen={handleDoublesRecordEditDialogOpen}/>
        </Suspense>
      </Box>
      <SinglesRecordEditDialog
        singlesRecordEditDialogOpen={singlesRecordEditDialogOpen}
        handleSinglesRecordEditDialogClose={handleSinglesRecordEditDialogClose}
        fetchSinglesData={fetchSinglesData}
        singlesRecords={singlesRecords}
        singlesRecord_id={singlesRecord_id}
        members={members}
        params={params}
      />
      <DoublesRecordEditDialog
        doublesRecordEditDialogOpen={doublesRecordEditDialogOpen}
        handleDoublesRecordEditDialogClose={handleDoublesRecordEditDialogClose}
        fetchDoublesData={fetchDoublesData}
        doublesRecords={doublesRecords}
        doublesRecord_id={doublesRecord_id}
        members={members}
        params={params}
      />
    </>
  );
}
