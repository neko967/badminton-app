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
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import type { Member } from '@/app/types/index';
import type { Group } from '@/app/types/index';
import { useCallback, useEffect, useState } from "react";
import { useSession } from 'next-auth/react';
import EditMemberDialog from './EditMemberDialog';

type SortKey = keyof Omit<Member, 'history'>;

function Row({ member, handleMemberDelete, group, truncateString, handleEditMemberClickOpen }: {
               member: Member; handleMemberDelete: (id: number) => void; group: Group | undefined; truncateString: any; handleEditMemberClickOpen: any; }) {
  const [open, setOpen] = React.useState(false);
  const { data: session, status } = useSession();

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
        <TableCell component="th" scope="row" sx={{ minWidth: 130 }}>
          {truncateString(member.name, 12)}
        </TableCell>
        <TableCell align="right" sx={{ minWidth: 70 }}>{member.singles_strength}</TableCell>
        <TableCell align="right" sx={{ minWidth: 70 }}>{member.doubles_strength}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                最近の試合
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableBody>
                  {member.history.map((historyRow, index: number) => (
                    <React.Fragment key={`fragment-${historyRow.id}-${index}`}>
                      {"score_1" in historyRow && 
                        <TableRow key={`single-${historyRow.id}-${index}`}>
                          <TableCell>
                            <div className="w-full flex items-center">
                              <div className="w-5/12 flex justify-start">
                                <p>{truncateString(historyRow.player_1, 12)}</p>
                              </div>
                              <div className="w-1/6 flex justify-center">
                                <p>{historyRow.score_1} - {historyRow.score_2}</p>
                              </div>
                              <div className="w-5/12 flex justify-end">
                                <p>{truncateString(historyRow.player_2, 12)}</p>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      }
                      {"score_12" in historyRow &&
                        <TableRow key={`double-${historyRow.id}-${index}`}>
                          <TableCell>
                          <div className="w-full flex items-center">
                            <div className="w-5/12 flex justify-start">
                              <div className="w-full">
                                <div className="flex justify-start">
                                  <p>{truncateString(historyRow.player_1, 12)}</p>
                                </div>
                                <div className="flex justify-start">
                                  <p>{truncateString(historyRow.player_2, 12)}</p>
                                </div>
                              </div>
                            </div>
                            <div className="w-1/6 flex justify-center">
                              <p>{historyRow.score_12} - {historyRow.score_34}</p>
                            </div>
                            <div className="w-5/12 flex justify-end">
                              <div className="w-full">
                                <div className="flex justify-end">
                                  <p>{truncateString(historyRow.player_3, 12)}</p>
                                </div>
                                <div className="flex justify-end">
                                  <p>{truncateString(historyRow.player_4, 12)}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          </TableCell>
                        </TableRow>
                      }
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
              {group?.admin_uid == session?.user?.uid &&
                <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => handleMemberDelete(member.id)} className="float-right my-2">
                  メンバーを削除
                </Button>
              }
              <Button variant="outlined" startIcon={<EditIcon />} onClick={() => handleEditMemberClickOpen(member.id)} className="float-right my-2">
                メンバー名を変更
              </Button>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function Members({members, handleMemberDelete, group, truncateString, fetchMemberData, params }: {
                                 members: Member[]; handleMemberDelete: (id: number) => void; group: Group | undefined; truncateString: any; fetchMemberData: any; params: any; }) {
  const [sortedMembers, setSortedMembers] = React.useState<Member[]>([]);
  const [sortConfig, setSortConfig] = React.useState<{ key: SortKey; direction: 'descending' | 'ascending' }>({ key: 'name', direction: 'ascending' });

  const onSort = (key: SortKey) => {
    let direction: 'descending' | 'ascending' = 'descending';
    if (sortConfig.key === key && sortConfig.direction === 'descending') {
      direction = 'ascending';
    }
    setSortConfig({ key, direction });
  };

  React.useEffect(() => {
    let sortedArray = [...members];
    if (sortConfig.key) {
      sortedArray.sort((a, b) => {
        if (sortConfig.key === 'name') {
          return a.name.localeCompare(b.name, 'ja', { sensitivity: 'base' }) * (sortConfig.direction === 'descending' ? -1 : 1);
        }
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'descending' ? 1 : -1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'descending' ? -1 : 1;
        }
        return 0;
      });
    }
    setSortedMembers(sortedArray);
  }, [members, sortConfig]);

  const [memberID, setMemberID] = useState<number>(0);
  const [editMemberOpen, setEditMemberOpen] = useState(false);
  const handleEditMemberClickOpen = (id: number) => {
    setMemberID(id);
    setEditMemberOpen(true);
  };
  const handleEditMemberClose = () => {
    setEditMemberOpen(false);
  };

  return (
    <>
      {members.length > 0 ?
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell style={{ userSelect: 'none' }} />
                <TableCell style={{ userSelect: 'none' }} onClick={() => onSort('name')} sx={{ minWidth: 130 }}>名前</TableCell>
                <TableCell style={{ userSelect: 'none' }} align="right" onClick={() => onSort('singles_strength')} sx={{ minWidth: 70 }}>シングルスパワー</TableCell>
                <TableCell style={{ userSelect: 'none' }} align="right" onClick={() => onSort('doubles_strength')} sx={{ minWidth: 70 }}>ダブルスパワー</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedMembers.map((member: Member) => (
                <Row key={member.id} member={member} handleMemberDelete={handleMemberDelete} group={group} truncateString={truncateString} handleEditMemberClickOpen={handleEditMemberClickOpen}/>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      :
        <div className="text-start px-6 mt-6">
          <p>メンバーが登録されていません</p>
        </div>
      }
      <EditMemberDialog
        members={members}
        editMemberOpen={editMemberOpen}
        handleEditMemberClose={handleEditMemberClose}
        fetchMemberData={fetchMemberData}
        params={params}
        memberID={memberID}
      />
    </>
  );
}
