import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import BeforeSendPareDialog from './BeforeSendPareDialog';

interface Member {
  id: number;
  name: string;
  singles_total_game: number;
  singles_win_game: number;
  singles_strength: number;
  doubles_total_game: number;
  doubles_win_game: number;
  doubles_strength: number;
}

export default function MakePareDialog({ pareOpen, handlePareClose, playersWithStatus}: any) {
  const [howToPare, setHowToPare] = useState('random');
  const [makedPare, setMakedPare] = useState<(string[])[]>([]);

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  function shuffleArray(array: any) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  const handleMakePare = () => {
    console.log("handleMakePareの中に入りました");
    const newPares = [];
    playersWithStatus.sort((a: Member, b: Member) => b.singles_strength - a.singles_strength);
    console.log("playersWithStatus", playersWithStatus);
    console.log("howToPare", howToPare);

    switch (howToPare) {
      case "random":
        if (playersWithStatus.length % 2 === 0) {
          shuffleArray(playersWithStatus); 
          for (let i = 0; i < playersWithStatus.length; i += 2) {
            newPares.push([playersWithStatus[i].name, playersWithStatus[i + 1].name]);
          }
        } else {
          let twice_player: Member = playersWithStatus[getRandomInt(playersWithStatus.length)];
          let players_except_twice_player: Member[] = playersWithStatus.filter((item: Member) => item.id !== twice_player.id);
          let opponent_to_twice_player: Member = players_except_twice_player[getRandomInt(players_except_twice_player.length)]
          newPares.push([twice_player.name, opponent_to_twice_player.name]);
          let players_except_opponent_to_twice_player : Member[] = playersWithStatus.filter((item: Member) => item.id !== opponent_to_twice_player.id);
          shuffleArray(players_except_opponent_to_twice_player); 
          for (let i = 0; i < players_except_opponent_to_twice_player.length ; i += 2 ) {
            newPares.push([players_except_opponent_to_twice_player[i].name, players_except_opponent_to_twice_player[i + 1].name]);
          }
        }
        break;
      case "even":
        if (playersWithStatus.length % 2 === 0) {
          for (let i = 0; i < playersWithStatus.length; i += 2) {
            newPares.push([playersWithStatus[i].name, playersWithStatus[i + 1].name]);
          }
        } else {
          let twice_player: Member = playersWithStatus[getRandomInt(playersWithStatus.length)];
          let players_except_twice_player: Member[] = playersWithStatus.filter((item: Member) => item.id !== twice_player.id);
          let opponent_to_twice_player: Member = players_except_twice_player[getRandomInt(players_except_twice_player.length)]
          let players_except_opponent_to_twice_player : Member[] = playersWithStatus.filter((item: Member) => item.id !== opponent_to_twice_player.id);
          newPares.push([twice_player.name, opponent_to_twice_player.name]);
          for (let i = 0; i < players_except_opponent_to_twice_player.length ; i += 2 ) {
            newPares.push([players_except_opponent_to_twice_player[i].name, players_except_opponent_to_twice_player[i + 1].name]);
          }
        }
        break;
      case "little_diff":
        if (playersWithStatus.length % 2 === 0) {
          const firstHalf = playersWithStatus.slice(0, playersWithStatus.length / 2);
          const secondHalf = playersWithStatus.slice(playersWithStatus.length / 2);
          for (let i = 0; i < firstHalf.length; i += 1) {
            newPares.push([firstHalf[i].name, secondHalf[i].name]);
          }
        } else {
          let twice_player: Member = playersWithStatus[getRandomInt(playersWithStatus.length)];
          let players_except_twice_player: Member[] = playersWithStatus.filter((item: Member) => item.id !== twice_player.id);
          let opponent_to_twice_player: Member = players_except_twice_player[getRandomInt(players_except_twice_player.length)]
          newPares.push([twice_player.name, opponent_to_twice_player.name]);
          let players_except_opponent_to_twice_player : Member[] = playersWithStatus.filter((item: Member) => item.id !== opponent_to_twice_player.id);
          const firstHalf = players_except_opponent_to_twice_player.slice(0, players_except_opponent_to_twice_player.length / 2);
          const secondHalf = players_except_opponent_to_twice_player.slice(players_except_opponent_to_twice_player.length / 2);
          for (let i = 0; i < firstHalf.length ; i += 1 ) {
            newPares.push([firstHalf[i].name, secondHalf[i].name]);
          }
        }
        break;
    }
    setMakedPare(newPares);
  };

  useEffect(() => {
    if (howToPare) {
     console.log(howToPare);
    }
  }, [howToPare]);

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
        <DialogTitle>対戦ペアの組み方</DialogTitle>
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
          <Button onClick={() => {handlePareClose(); handleMakePare(); handleBeforeSendPareDialogOpen();}}>Ok</Button>
        </DialogActions>
      </Dialog>
      <React.Fragment>
        <BeforeSendPareDialog
          beforeSendPareDialogOpen={beforeSendPareDialogOpen}
          handleBeforeSendPareDialogClose={handleBeforeSendPareDialogClose}
          makedPare={makedPare}
          howToPare={howToPare}
          handleMakePare={handleMakePare}
          playersWithStatus={playersWithStatus}
        />
      </React.Fragment>
    </div>
  );
}
