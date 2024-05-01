import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import MakePareDialog from './MakePareDialog';
import { useCallback, useEffect, useState } from "react";
import { useSession } from 'next-auth/react';

interface Member {
  id: number;
  name: string;
  singles_total_game: number;
  singles_twin_game: number;
  singles_tstrength: number;
  doubles_total_game: number;
  doubles_twin_game: number;
  doubles_tstrength: number;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function DialogSelect({ singlesOpen, handleSinglesClose }: any) {
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

  const [players, setPlayers]: any = useState([]);
  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setPlayers(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const [pareOpen, setPareOpen] = React.useState(false);
  const [playersWithStatus, setPlayersWithStatus]: any = useState([]);
  const [nextPlayersWithStatus, setNextPlayersWithStatus]: any = useState();
  const handlePareOpen = () => {
    let i = players.length
    for (i = 0; i < players.length; i++ ) {
      const result = members.find(item => item.name === players[i]);
      setNextPlayersWithStatus(result);
      setPlayersWithStatus([...playersWithStatus, nextPlayersWithStatus]);
    }
    console.log(playersWithStatus);
    setPareOpen(true);
  };
  const handlePareClose = (event: any, reason: any) => {
    if (reason !== 'backdropClick') {
      setPareOpen(false);
    }
  };

  return (
    <div>
      <Dialog disableEscapeKeyDown open={singlesOpen} onClose={handleSinglesClose}>
        <DialogTitle>メンバーを選んでください</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-checkbox-label">シングルス</InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={players}
                onChange={handleChange}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
              >
                {members.map((member) => (
                  <MenuItem key={member.name} value={member.name}>
                    <Checkbox checked={players.indexOf(member) > -1} />
                    <ListItemText primary={member.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {handleSinglesClose(); setPlayers([]);}}>Cancel</Button>
          <Button onClick={() => {handleSinglesClose(); handlePareOpen();}}>Ok</Button>
        </DialogActions>
      </Dialog>
      <MakePareDialog pareOpen={pareOpen} 
                      handlePareClose={handlePareClose} 
                      playersWithStatus={playersWithStatus}
      />
    </div>
  );
}