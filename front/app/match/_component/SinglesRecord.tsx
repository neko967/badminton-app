import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useCallback, useEffect, useState } from "react";
import { useSession } from 'next-auth/react';
import EditIcon from '@mui/icons-material/Edit';
import SinglesRecordEditDialog from './SinglesRecordEditDialog';

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

export default function SinglesRecord() {
  const [value, setValue] = React.useState(0);
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [singlesRecords, setSinglesRecords] = useState([]);
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/singles_records`;
  const { data: session, status } = useSession();
  console.log('singlesRecords', singlesRecords);

  const fetchData = useCallback(async () => {
    if (session) {
      const query = session.user?.email;
      const response = await fetch (`${API_URL}?email=${query}`);
      const data = await response.json();
      setSinglesRecords(data);
    }
  }, [session]);

  useEffect(() => {
    if (session) {
      fetchData();
    }
  }, [session, fetchData]);

  const [singlesRecordEditDialogOpen, setSinglesRecordEditDialogOpen] = useState(false);
  const handleSinglesRecordEditDialogOpen = () => {
    setSinglesRecordEditDialogOpen(true);
  };

  const handleSinglesRecordEditDialogClose: any = (event: React.SyntheticEvent<unknown>, reason?: string) => {
    if (reason !== 'backdropClick') {
      setSinglesRecordEditDialogOpen(false);
    }
  };

  return (
    <>
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleTabChange} aria-label="basic tabs example">
          <Tab label="シングルス" {...a11yProps(0)} />
          <Tab label="ダブルス" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <div className="mx-auto w-full flex justify-start items-center flex-col">
          <section className="text-start w-96 mb-32 px-6 ">
            {singlesRecords.length === 0 ? (
              <p>記録がありません</p>
            ) : (
              <dl className="flex flex-col w-full">
                {singlesRecords.map((singlesRecord: any, index: number) => (
                  <>
                    <div
                      key={index}
                      className="w-full flex items-center border-b border-slate-500 border-opacity-45 py-2"
                    >
                      <dt className="w-1/3">{singlesRecord?.player_1}</dt>
                      <dt className="w-1/3">{singlesRecord?.score_1}</dt>
                      <p>-</p>
                      <dt className="w-1/3">{singlesRecord?.score_2}</dt>
                      <dt className="w-1/3">{singlesRecord?.player_2}</dt>
                      <button
                        className="border rounded p-2 hover:bg-slate-400 transition-all"
                        onClick={handleSinglesRecordEditDialogOpen}
                        type="button"
                      >
                        <EditIcon />
                      </button>
                      <SinglesRecordEditDialog singlesRecordEditDialogOpen={singlesRecordEditDialogOpen} 
                                               handleSinglesRecordEditDialogClose={handleSinglesRecordEditDialogClose}
                                               fetchData={fetchData}
                                               singlesRecord={singlesRecord}
                      />
                    </div>
                  </>
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
    </>
  );
}
