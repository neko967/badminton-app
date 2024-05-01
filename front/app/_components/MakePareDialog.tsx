import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
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
import Paper from '@mui/material/Paper';
import NativeSelect from '@mui/material/NativeSelect';
import BeforeSendPareDialog from './BeforeSendPareDialog';

interface Member {
  id: number;
  name: string;
  total_game: number;
  win_game: number;
  strength: number;
}

export default function MakePareDialog({ pareOpen, handlePareClose, playersWithStatus}: any) {
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/singles_records`;
  const { data: session, status } = useSession();
  const [howToPare, setHowToPare] = useState('');
  const [makedPare, setMakedPare] = useState<(string[])[]>([]);

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  const handleMakePare = (playersWithStatus: Member[][]) => {
    playersWithStatus[0].sort((a, b) => b.strength - a.strength);

    const newPares = [];
    if (playersWithStatus[0].length % 2 === 0) {
      for (let i = 0; i < playersWithStatus[0].length; i += 2) {
        newPares.push([playersWithStatus[0][i].name, playersWithStatus[0][i + 1].name]);
      }
    } else {
      let twice_player: Member = playersWithStatus[0][getRandomInt(playersWithStatus[0].length)];
      let players_except_twice_player: Member[] = playersWithStatus[0].filter(item => item.id !== twice_player.id);
      let opponent_to_twice_player: Member = players_except_twice_player[getRandomInt(players_except_twice_player.length)]
      let players_except_opponent_to_twice_player : Member[] = playersWithStatus[0].filter(item => item.id !== opponent_to_twice_player.id);
      newPares.push([twice_player.name, opponent_to_twice_player.name]);
      for (let i = 0; i < players_except_opponent_to_twice_player.length ; i += 2 ) {
        newPares.push([players_except_opponent_to_twice_player[i].name, players_except_opponent_to_twice_player[i + 1].name]);
      }
    }
    setMakedPare(newPares);
    console.log('makedPare', makedPare);
  };

  const [beforeSendPareDialogOpen, setBeforeSendPareDialogOpen] = useState(false);
  const handleBeforeSendPareDialogOpen = () => {
    setBeforeSendPareDialogOpen(true);
  };

  const handleBeforeSendPareDialogClose = () => {
    setBeforeSendPareDialogOpen(false);
  };

  return (
    <div>
      <Dialog disableEscapeKeyDown open={pareOpen} onClose={handlePareClose}>
        <DialogTitle>ペアの組み方</DialogTitle>
        <DialogContent>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <NativeSelect
                defaultValue={10}
                inputProps={{
                  name: 'makepare',
                  id: 'uncontrolled-native',
                }}
              >
                <option value={10} onClick={() => setHowToPare('random')}>ランダム</option>
                <option value={20} onClick={() => setHowToPare('even')}>力が等しい</option>
                <option value={30} onClick={() => setHowToPare('little_diff')}>力が少し離れている</option>
              </NativeSelect>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePareClose}>Cancel</Button>
          <Button onClick={() => {handlePareClose(); handleMakePare(playersWithStatus); handleBeforeSendPareDialogOpen();}}>Ok</Button>
        </DialogActions>
      </Dialog>
      <React.Fragment>
        <BeforeSendPareDialog
          beforeSendPareDialogOpen={beforeSendPareDialogOpen}
          handleBeforeSendPareDialogClose={handleBeforeSendPareDialogClose}
          makedPare={makedPare}
          handleMakePare={handleMakePare}
        />
      </React.Fragment>
    </div>
  );
}
