import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useCallback, useEffect, useState, Suspense } from "react";
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import EditIcon from '@mui/icons-material/Edit';
import SinglesRecordEditDialog from './SinglesRecordEditDialog';
import SinglesRecordDeleteDialog from './SinglesRecordDeleteDialog';
import DoublesRecordEditDialog from './DoublesRecordEditDialog';
import DoublesRecordDeleteDialog from './DoublesRecordDeleteDialog';
import type { SinglesRecord } from '@/app/types/index';
import type { DoublesRecord } from '@/app/types/index';
import { truncateString } from '@/app/utils';

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
  singlesRecords: SinglesRecord[];
  doublesRecords: DoublesRecord[];
  handleSinglesRecordEditDialogOpen: (singlesRecord: SinglesRecord) => void;
  handleSinglesRecordDeleteDialogOpen: (singlesRecord: SinglesRecord) => void;
  handleDoublesRecordEditDialogOpen: (doublesRecord: DoublesRecord) => void;
  handleDoublesRecordDeleteDialogOpen: (doublesRecord: DoublesRecord) => void;
}

function TabComponent({
  singlesRecords,
  doublesRecords,
  handleSinglesRecordEditDialogOpen,
  handleSinglesRecordDeleteDialogOpen,
  handleDoublesRecordEditDialogOpen,
  handleDoublesRecordDeleteDialogOpen,
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
              <dl className="flex flex-col w-full" style={{ userSelect: 'none' }}>
                {singlesRecords.map((singlesRecord) => (
                  <div
                    key={singlesRecord.id}
                    className="w-full flex items-center border-b border-slate-500 border-opacity-45 py-2 h-16"
                  >
                    <div className="w-5/6 flex items-center rounded hover:bg-slate-400 transition-all"
                         onContextMenu={(e) => {
                          e.preventDefault(); // コンテキストメニューの表示を防止
                          handleSinglesRecordDeleteDialogOpen(singlesRecord);
                        }}
                    >
                      <div className="w-2/5 flex justify-start">
                        <p>{truncateString(singlesRecord.player_1, 12)}</p>
                      </div>
                      <div className="w-1/5 flex justify-center">
                        <p>{singlesRecord.score_1} - {singlesRecord.score_2}</p>
                      </div>
                      <div className="w-2/5 flex justify-end">
                        <p>{truncateString(singlesRecord.player_2, 12)}</p>
                      </div>
                    </div>
                    <div className="w-1/6 flex items-center justify-end">
                      { singlesRecord.score_1 == null && singlesRecord.score_2 == null && singlesRecord.singles_recorded_players.length == 2 ?
                        <button
                          className="border rounded p-2 hover:bg-slate-400 transition-all"
                          onClick={() => handleSinglesRecordEditDialogOpen(singlesRecord)}
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
              <dl className="flex flex-col w-full" style={{ userSelect: 'none' }}>
                {doublesRecords.map((doublesRecord) => (
                  <div
                    key={doublesRecord.id}
                    className="w-full flex items-center border-b border-slate-500 border-opacity-45 py-2 h-16"
                  >
                    <div className="w-5/6 flex items-center rounded hover:bg-slate-400 transition-all"
                         onContextMenu={(e) => {
                          e.preventDefault(); // コンテキストメニューの表示を防止
                          handleDoublesRecordDeleteDialogOpen(doublesRecord);
                        }}
                    >
                      <div className="w-2/5 flex justify-start">
                        <div className="w-full">
                          <div className="flex justify-start">
                            <p>{truncateString(doublesRecord.player_1, 12)}</p>
                          </div>
                          <div className="flex justify-start">
                            <p>{truncateString(doublesRecord.player_2, 12)}</p>
                          </div>
                        </div>
                      </div>
                      <div className="w-1/5 flex justify-center">
                        <p>{doublesRecord.score_12} - {doublesRecord.score_34}</p>
                      </div>
                      <div className="w-2/5 flex justify-end">
                        <div className="w-full">
                          <div className="flex justify-end">
                            <p>{truncateString(doublesRecord.player_3, 12)}</p>
                          </div>
                          <div className="flex justify-end">
                            <p>{truncateString(doublesRecord.player_4, 12)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-1/6 flex items-center justify-end">
                      { doublesRecord.score_12 == null && doublesRecord.score_34 == null && doublesRecord.doubles_recorded_players.length == 4 ?
                        <button
                          className="border rounded p-2 hover:bg-slate-400 transition-all"
                          onClick={() => handleDoublesRecordEditDialogOpen(doublesRecord)}
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
  const [singlesRecords, setSinglesRecords] = useState<SinglesRecord[]>([]);
  const [doublesRecords, setDoublesRecords] = useState<DoublesRecord[]>([]);
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}`;

  const fetchSinglesRecordData = useCallback(async () => {
    const response = await fetch(`${API_URL}/singles_records`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'slug': `${params.slug}`,
      },
    });
    const data = await response.json();
    setSinglesRecords(data);
  }, [API_URL, params]);

  const fetchDoublesRecordData = useCallback(async () => {
    const response = await fetch(`${API_URL}/doubles_records`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'slug': `${params.slug}`,
      },
    });
    const data = await response.json();
    setDoublesRecords(data);
  }, [API_URL, params]);

  useEffect(() => {
    fetchSinglesRecordData();
    fetchDoublesRecordData();
  }, [fetchSinglesRecordData, fetchDoublesRecordData]);

  const [singlesRecord, setSinglesRecord] = useState<SinglesRecord>();
  const [singlesRecordEditDialogOpen, setSinglesRecordEditDialogOpen] = useState(false);
  const handleSinglesRecordEditDialogOpen = (singlesRecord: SinglesRecord) => {
    setSinglesRecord(singlesRecord);
    setSinglesRecordEditDialogOpen(true);
  };
  const handleSinglesRecordEditDialogClose = () => {
    setSinglesRecord(undefined);
    setSinglesRecordEditDialogOpen(false);
  };

  const [singlesRecordDeleteDialogOpen, setSinglesRecordDeleteDialogOpen] = useState(false);
  const handleSinglesRecordDeleteDialogOpen = (singlesRecord: SinglesRecord) => {
    setSinglesRecord(singlesRecord);
    setSinglesRecordDeleteDialogOpen(true);
  };
  const handleSinglesRecordDeleteDialogClose = () => {
    setSinglesRecord(undefined);
    setSinglesRecordDeleteDialogOpen(false);
  };

  const [doublesRecord, setDoublesRecord] = useState<DoublesRecord>();
  const [doublesRecordEditDialogOpen, setDoublesRecordEditDialogOpen] = useState(false);
  const handleDoublesRecordEditDialogOpen = (doublesRecord: DoublesRecord) => {
    setDoublesRecord(doublesRecord);
    setDoublesRecordEditDialogOpen(true);
  };
  const handleDoublesRecordEditDialogClose = () => {
    setDoublesRecord(undefined);
    setDoublesRecordEditDialogOpen(false);
  };

  const [doublesRecordDeleteDialogOpen, setDoublesRecordDeleteDialogOpen] = useState(false);
  const handleDoublesRecordDeleteDialogOpen = (doublesRecord: DoublesRecord) => {
    setDoublesRecord(doublesRecord);
    setDoublesRecordDeleteDialogOpen(true);
  };
  const handleDoublesRecordDeleteDialogClose = () => {
    setDoublesRecord(undefined);
    setDoublesRecordDeleteDialogOpen(false);
  };

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
            handleSinglesRecordDeleteDialogOpen={handleSinglesRecordDeleteDialogOpen}
            handleDoublesRecordEditDialogOpen={handleDoublesRecordEditDialogOpen}
            handleDoublesRecordDeleteDialogOpen={handleDoublesRecordDeleteDialogOpen}/>
        </Suspense>
      </Box>
      <SinglesRecordEditDialog
        singlesRecordEditDialogOpen={singlesRecordEditDialogOpen}
        handleSinglesRecordEditDialogClose={handleSinglesRecordEditDialogClose}
        fetchSinglesRecordData={fetchSinglesRecordData}
        singlesRecord={singlesRecord}
        params={params}
      />
      <SinglesRecordDeleteDialog
        singlesRecordDeleteDialogOpen={singlesRecordDeleteDialogOpen}
        handleSinglesRecordDeleteDialogClose={handleSinglesRecordDeleteDialogClose}
        fetchSinglesRecordData={fetchSinglesRecordData}
        singlesRecord={singlesRecord}
        params={params}
      />
      <DoublesRecordEditDialog
        doublesRecordEditDialogOpen={doublesRecordEditDialogOpen}
        handleDoublesRecordEditDialogClose={handleDoublesRecordEditDialogClose}
        fetchDoublesRecordData={fetchDoublesRecordData}
        doublesRecord={doublesRecord}
        params={params}
      />
      <DoublesRecordDeleteDialog
        doublesRecordDeleteDialogOpen={doublesRecordDeleteDialogOpen}
        handleDoublesRecordDeleteDialogClose={handleDoublesRecordDeleteDialogClose}
        fetchDoublesRecordData={fetchDoublesRecordData}
        doublesRecord={doublesRecord}
        params={params}
      />
    </>
  );
}
