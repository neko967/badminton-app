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
import type { Member } from '@/app/types/index';

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
                                <p>{historyRow.player_1}</p>
                              </div>
                              <div className="w-1/6 flex justify-center">
                                <p>{historyRow.score_1} - {historyRow.score_2}</p>
                              </div>
                              <div className="w-5/12 flex justify-end">
                                <p>{historyRow.player_2}</p>
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
                                  <p>{historyRow.player_1}</p>
                                </div>
                                <div className="flex justify-start">
                                  <p>{historyRow.player_2}</p>
                                </div>
                              </div>
                            </div>
                            <div className="w-1/6 flex justify-center">
                              <p>{historyRow.score_12} - {historyRow.score_34}</p>
                            </div>
                            <div className="w-5/12 flex justify-end">
                              <div className="w-full">
                                <div className="flex justify-end">
                                  <p>{historyRow.player_3}</p>
                                </div>
                                <div className="flex justify-end">
                                  <p>{historyRow.player_4}</p>
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
              <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => handleDelete(member.id)} className="float-right my-2">
                メンバーを削除
              </Button>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function Members({members, handleDelete}: 
                               {members: Member[]; handleDelete: (id: number) => void; }) {

  return (
    <>
      {members.length > 0 ?
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
                <Row key={member.id} member={member} handleDelete={handleDelete}/>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      :
        <div className="text-start px-6 mt-6">
          <p>メンバーが登録されていません</p>
        </div>
      }
    </>
  );
}