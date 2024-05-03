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
              <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => handleDelete(member.id)}>
                メンバーを削除
              </Button>
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
                      <TableCell>{historyRow.player_1} - {historyRow.player_2}</TableCell>
                      <TableCell align="right">{historyRow.score_1} - {historyRow.score_2}</TableCell>
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
        {members.length === 0 ? (
          <p>メンバーがいません</p>
        ) : (
          <TableBody>
            {members.map((member: Member) => (
              <Row key={member.name} member={member} handleDelete={handleDelete}/>
            ))}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
}
