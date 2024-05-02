/*
export default function Member({members, handleDelete}: any) {

  return (
    <>
      <main className="mx-auto w-full flex justify-start items-center flex-col">
        <h1 className="font-semibold text-xl my-8">全てのメンバー</h1>
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
                    <span>{member?.doubles_strength}</span>
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
*/

import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useCallback, useEffect, useState } from "react";
import { useSession } from 'next-auth/react';
import DeleteIcon from '@mui/icons-material/Delete';

interface Member {
  id: number;
  name: string;
  singles_total_game: number;
  singles_win_game: number;
  singles_strength: number;
  doubles_total_game: number;
  doubles_win_game: number;
  doubles_strength: number;
  history: [
    { player_1: string, score_1: number, player_2: string, score_2: number }
  ]
}

function createData(
  name: string, calories: number, fat: number, carbs: number, price: number,
) {
  return {
    name, calories, fat, carbs, price, 
    history: [
      { date: '2020-01-05', customerId: '11091700', amount: 3, },
      { date: '2020-01-02', customerId: 'Anonymous', amount: 1, },
    ],
  };
}

function Row({ member, handleDelete }: {
               member: Member; handleDelete: (id: number) => void; }) {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {member.name}
        </TableCell>
        <TableCell align="right">{member.singles_strength}</TableCell>
        <TableCell align="right">{member.doubles_strength}</TableCell>
        {/*
        <TableCell align="right">
          <button
            className="border rounded p-2 hover:bg-slate-400 transition-all"
            onClick={() => handleDelete(member.id)}
            type="button"
          >
            <DeleteIcon />
          </button>
        </TableCell>
        */}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                最近の試合
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>プレイヤー</TableCell>
                    <TableCell align="right">点数</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {member.history.map((historyRow, index: number) => (
                    <TableRow key={index}>
                      <TableCell>{historyRow.player_2}</TableCell>
                      <TableCell align="right">{historyRow.score_2}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 3.99),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.99),
  createData('Eclair', 262, 16.0, 24, 3.79),
  createData('Cupcake', 305, 3.7, 67, 2.5),
  createData('Gingerbread', 356, 16.0, 49, 1.5),
];

export default function Member({members, handleDelete}: 
                               {members: Member[]; handleDelete: (id: number) => void; }) {

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>名前</TableCell>
            <TableCell align="right">シングルスパワー</TableCell>
            <TableCell align="right">ダブルスパワー</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {members.map((member: Member) => (
            <Row key={member.name} member={member} handleDelete={handleDelete}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
