import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import SinglesBeforeSendPareDialog from './SinglesBeforeSendPareDialog';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import type { Member } from '@/app/types/index';

interface SinglesMakePareDialogProps {
  pareOpen: boolean;
  handlePareClose: () => void;
  selectedMembers: Member[];
  params: { slug: string };
}

export default function SinglesMakePareDialog({
  pareOpen,
  handlePareClose,
  selectedMembers,
  params,
}: SinglesMakePareDialogProps) {
  const [disable, setDisable] = useState(true);
  const [howToPare, setHowToPare] = useState<string>('');
  const handleHowToPareChange = (event: SelectChangeEvent) => {
    setHowToPare(event.target.value as string);
    setDisable(false);
  };

  const [makedPare, setMakedPare] = useState<Member[][]>([]);

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  const handleMakePare = () => {
    const newPares: Member[][] = [];
    selectedMembers.sort((a: Member, b: Member) => b.singles_strength - a.singles_strength);

    switch (howToPare) {
      case "random":
        if (selectedMembers.length % 2 === 0) {
          shuffleArray(selectedMembers); 
          for (let i = 0; i < selectedMembers.length; i += 2) {
            newPares.push([selectedMembers[i], selectedMembers[i + 1]]);
          }
        } else {
          let twice_player: Member = selectedMembers[getRandomInt(selectedMembers.length)];
          let players_except_twice_player: Member[] = selectedMembers.filter((item: Member) => item.id !== twice_player.id);
          let opponent_to_twice_player: Member = players_except_twice_player[getRandomInt(players_except_twice_player.length)]
          newPares.push([twice_player, opponent_to_twice_player]);
          let players_except_opponent_to_twice_player : Member[] = selectedMembers.filter((item: Member) => item.id !== opponent_to_twice_player.id);
          shuffleArray(players_except_opponent_to_twice_player);
          for (let i = 0; i < players_except_opponent_to_twice_player.length ; i += 2 ) {
            newPares.push([players_except_opponent_to_twice_player[i], players_except_opponent_to_twice_player[i + 1]]);
          }
        }
        break;
      case "even":
        if (selectedMembers.length % 2 === 0) {
          for (let i = 0; i < selectedMembers.length; i += 2) {
            newPares.push([selectedMembers[i], selectedMembers[i + 1]]);
          }
        } else {
          let twice_player: Member = selectedMembers[getRandomInt(selectedMembers.length)];
          let players_except_twice_player: Member[] = selectedMembers.filter((item: Member) => item.id !== twice_player.id);
          let opponent_to_twice_player: Member = players_except_twice_player[getRandomInt(players_except_twice_player.length)]
          let players_except_opponent_to_twice_player : Member[] = selectedMembers.filter((item: Member) => item.id !== opponent_to_twice_player.id);
          newPares.push([twice_player, opponent_to_twice_player]);
          for (let i = 0; i < players_except_opponent_to_twice_player.length ; i += 2 ) {
            newPares.push([players_except_opponent_to_twice_player[i], players_except_opponent_to_twice_player[i + 1]]);
          }
        }
        break;
      case "little_diff":
        if (selectedMembers.length % 2 === 0) {
          const firstHalf = selectedMembers.slice(0, selectedMembers.length / 2);
          const secondHalf = selectedMembers.slice(selectedMembers.length / 2);
          for (let i = 0; i < firstHalf.length; i += 1) {
            newPares.push([firstHalf[i], secondHalf[i]]);
          }
        } else {
          let twice_player: Member = selectedMembers[getRandomInt(selectedMembers.length)];
          let players_except_twice_player: Member[] = selectedMembers.filter((item: Member) => item.id !== twice_player.id);
          let opponent_to_twice_player: Member = players_except_twice_player[getRandomInt(players_except_twice_player.length)]
          newPares.push([twice_player, opponent_to_twice_player]);
          let players_except_opponent_to_twice_player : Member[] = selectedMembers.filter((item: Member) => item.id !== opponent_to_twice_player.id);
          const firstHalf = players_except_opponent_to_twice_player.slice(0, players_except_opponent_to_twice_player.length / 2);
          const secondHalf = players_except_opponent_to_twice_player.slice(players_except_opponent_to_twice_player.length / 2);
          for (let i = 0; i < firstHalf.length ; i += 1 ) {
            newPares.push([firstHalf[i], secondHalf[i]]);
          }
        }
        break;
    }
    setMakedPare(newPares);
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
        <DialogTitle>対戦ペアの組み方</DialogTitle>
        <DialogContent>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">組み方</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={howToPare}
                label="Age"
                onChange={handleHowToPareChange}
              >
                <MenuItem value={'random'}>ランダム</MenuItem>
                <MenuItem value={'even'}>力が等しい</MenuItem>
                <MenuItem value={'little_diff'}>力が少し離れている</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePareClose}>Cancel</Button>
          <Button onClick={() => {handlePareClose(); handleMakePare(); handleBeforeSendPareDialogOpen();}} disabled={disable}>Ok</Button>
        </DialogActions>
      </Dialog>
      <React.Fragment>
        <SinglesBeforeSendPareDialog
          beforeSendPareDialogOpen={beforeSendPareDialogOpen}
          handleBeforeSendPareDialogClose={handleBeforeSendPareDialogClose}
          makedPare={makedPare}
          handleMakePare={handleMakePare}
          params={params}
        />
      </React.Fragment>
    </div>
  );
}
