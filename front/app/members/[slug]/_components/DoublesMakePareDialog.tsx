import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import DoublesBeforeSendPareDialog from './DoublesBeforeSendPareDialog';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import type { Member } from '@/app/types/index';

interface DoublesMakePareDialogProps {
  doublesMakePareDialogOpen: boolean;
  handleDoublesMakePareDialogClose: () => void;
  selectedMembers: Member[];
  params: { slug: string };
}

export default function DoublesMakePareDialog({
  doublesMakePareDialogOpen,
  handleDoublesMakePareDialogClose,
  selectedMembers,
  params,
}: DoublesMakePareDialogProps) {

  const [howToPare, setHowToPare] = useState<string>('');
  const handleHowToPareChange = (event: SelectChangeEvent) => {
    setHowToPare(event.target.value as string);
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

  function getRandomThreeAndRestShuffle(array: any[]) {
    const shuffled = array.sort(() => 0.5 - Math.random());
    const randomThree = shuffled.slice(0, 3);
    const rest = shuffled.slice(3);
    return [randomThree, rest];
  }

  function getRandomTwoAndRestShuffle(data: any[]) {
    const shuffled = data.sort(() => 0.5 - Math.random());
    const randomTwo = shuffled.slice(0, 2);
    const rest = shuffled.slice(2);
    return [randomTwo, rest];
  }

  const handleMakePare = () => {
    const newPares: Member[][] = [];
    selectedMembers.sort((a: Member, b: Member) => b.doubles_strength - a.doubles_strength);

    switch (howToPare) {
      case "random":
        if (selectedMembers.length % 4 === 0) {
          shuffleArray(selectedMembers); 
          for (let i = 0; i < selectedMembers.length; i += 4) {
            newPares.push([selectedMembers[i],
                           selectedMembers[i + 1],
                           selectedMembers[i + 2],
                           selectedMembers[i + 3]]);
          }
        } else if (selectedMembers.length % 4 === 1) {
          const [three_twice_players_array, rest_players_array]: Member[][] = getRandomThreeAndRestShuffle(selectedMembers);
          const opponent_to_twice_player: Member = rest_players_array[getRandomInt(rest_players_array.length)];
          newPares.push([three_twice_players_array[0],
                         three_twice_players_array[1],
                         three_twice_players_array[2],
                         opponent_to_twice_player]);
          const players_except_opponent_to_twice_player : Member[] = selectedMembers.filter((item: Member) => item.id !== opponent_to_twice_player.id);
          shuffleArray(players_except_opponent_to_twice_player);
          for (let i = 0; i < players_except_opponent_to_twice_player.length ; i += 4 ) {
            newPares.push([players_except_opponent_to_twice_player[i],
                           players_except_opponent_to_twice_player[i + 1],
                           players_except_opponent_to_twice_player[i + 2],
                           players_except_opponent_to_twice_player[i + 3]]);
          }
        } else if (selectedMembers.length % 4 === 2) {
          const [two_twice_players_array, rest_players_array]: Member[][] = getRandomTwoAndRestShuffle(selectedMembers);
          const [two_opponent_to_twice_player, normal_players_array]: Member[][] = getRandomTwoAndRestShuffle(rest_players_array);
          newPares.push([two_twice_players_array[0],
                         two_twice_players_array[1],
                         two_opponent_to_twice_player[0],
                         two_opponent_to_twice_player[1]]);
          const players_except_opponent_to_twice_player: Member[] = [two_twice_players_array, normal_players_array].flat();
          shuffleArray(players_except_opponent_to_twice_player);
          for (let i = 0; i < players_except_opponent_to_twice_player.length ; i += 4 ) {
            newPares.push([players_except_opponent_to_twice_player[i],
                           players_except_opponent_to_twice_player[i + 1],
                           players_except_opponent_to_twice_player[i + 2],
                           players_except_opponent_to_twice_player[i + 3]]);
          }
        } else if (selectedMembers.length % 4 === 3) {
          const twice_player: Member = selectedMembers[getRandomInt(selectedMembers.length)];
          const players_array_except_twice_player: Member[] = selectedMembers.filter((item: Member) => item.id !== twice_player.id);
          const [three_opponent_to_twice_players_array, normal_players_array]: Member[][] = getRandomThreeAndRestShuffle(players_array_except_twice_player);
          newPares.push([twice_player,
                         three_opponent_to_twice_players_array[0],
                         three_opponent_to_twice_players_array[1],
                         three_opponent_to_twice_players_array[2]]);
          const players_except_opponent_to_twice_player: Member[] = [twice_player, normal_players_array].flat();
          shuffleArray(players_except_opponent_to_twice_player);
          for (let i = 0; i < players_except_opponent_to_twice_player.length ; i += 4 ) {
            newPares.push([players_except_opponent_to_twice_player[i],
                           players_except_opponent_to_twice_player[i + 1],
                           players_except_opponent_to_twice_player[i + 2],
                           players_except_opponent_to_twice_player[i + 3]]);
          }
        }
        break;
      case "even":
        if (selectedMembers.length % 4 === 0) {
          for (let i = 0; i < selectedMembers.length; i += 4) {
            const set_game_players = [selectedMembers[i], selectedMembers[i + 1], selectedMembers[i + 2], selectedMembers[i + 3]]
            shuffleArray(set_game_players);
            newPares.push([set_game_players[0], 
                           set_game_players[1],
                           set_game_players[2],
                           set_game_players[3]]);
          }
        } else if (selectedMembers.length % 4 === 1) {
          const [three_twice_players_array, rest_players_array]: Member[][] = getRandomThreeAndRestShuffle(selectedMembers);
          const one_opponent_to_twice_player: Member = rest_players_array[getRandomInt(rest_players_array.length)];
          newPares.push([three_twice_players_array[0],
                         three_twice_players_array[1],
                         three_twice_players_array[2],
                         one_opponent_to_twice_player]);
          const players_except_opponent_to_twice_player : Member[] = selectedMembers.filter((item: Member) => item.id !== one_opponent_to_twice_player.id);
          for (let i = 0; i < players_except_opponent_to_twice_player.length ; i += 4 ) {
            const set_game_players = [players_except_opponent_to_twice_player[i],
                                      players_except_opponent_to_twice_player[i + 1],
                                      players_except_opponent_to_twice_player[i + 2],
                                      players_except_opponent_to_twice_player[i + 3]]
            shuffleArray(set_game_players);
            newPares.push([set_game_players[0], 
                           set_game_players[1],
                           set_game_players[2],
                           set_game_players[3]]);
          }
        } else if (selectedMembers.length % 4 === 2) {
          const [two_twice_players_array, rest_players_array]: Member[][] = getRandomTwoAndRestShuffle(selectedMembers);
          const [two_opponent_to_twice_player, once_players_array]: Member[][] = getRandomTwoAndRestShuffle(rest_players_array);
          newPares.push([two_twice_players_array[0],
                         two_twice_players_array[1],
                         two_opponent_to_twice_player[0],
                         two_opponent_to_twice_player[1]]);
          const players_except_two_pponent_to_twice_player : Member[] = selectedMembers.filter((item: Member) => item.id !== two_opponent_to_twice_player[0].id
                                                                                                                && item.id !== two_opponent_to_twice_player[1].id);
          for (let i = 0; i < players_except_two_pponent_to_twice_player.length ; i += 4 ) {
            const set_game_players = [players_except_two_pponent_to_twice_player[i],
                                      players_except_two_pponent_to_twice_player[i + 1],
                                      players_except_two_pponent_to_twice_player[i + 2],
                                      players_except_two_pponent_to_twice_player[i + 3]]
            shuffleArray(set_game_players);
            newPares.push([set_game_players[0], 
                           set_game_players[1],
                           set_game_players[2],
                           set_game_players[3]]);
          }
        } else if (selectedMembers.length % 4 === 3) {
          const twice_player: Member = selectedMembers[getRandomInt(selectedMembers.length)];
          const players_array_except_twice_player: Member[] = selectedMembers.filter((item: Member) => item.id !== twice_player.id);
          const [three_players_opponent_to_twice_player_array, once_players_array]: Member[][] = getRandomThreeAndRestShuffle(players_array_except_twice_player);
          newPares.push([twice_player,
                         three_players_opponent_to_twice_player_array[0],
                         three_players_opponent_to_twice_player_array[1],
                         three_players_opponent_to_twice_player_array[2]]);
          const players_except_three_opponent_to_twice_player: Member[] = selectedMembers.filter((item: Member) => item.id !== three_players_opponent_to_twice_player_array[0].id
                                                                                                                  && item.id !== three_players_opponent_to_twice_player_array[1].id
                                                                                                                  && item.id !== three_players_opponent_to_twice_player_array[2].id);
          for (let i = 0; i < players_except_three_opponent_to_twice_player.length ; i += 4 ) {
            const set_game_players = [players_except_three_opponent_to_twice_player[i],
                                      players_except_three_opponent_to_twice_player[i + 1],
                                      players_except_three_opponent_to_twice_player[i + 2],
                                      players_except_three_opponent_to_twice_player[i + 3]]
            shuffleArray(set_game_players);
            newPares.push([set_game_players[0], 
                           set_game_players[1],
                           set_game_players[2],
                           set_game_players[3]]);
          }
        }
        break;
      case "little_diff":
        if (selectedMembers.length % 4 === 0) {
          const firstHalf = selectedMembers.slice(0, selectedMembers.length / 2);
          const secondHalf = selectedMembers.slice(selectedMembers.length / 2);
          for (let i = 0; i < firstHalf.length; i += 2) {
            const set_game_players_from_firstHalf = [firstHalf[i], firstHalf[i + 1]];
            const set_game_players_from_secondHalf = [secondHalf[i], secondHalf[i + 1]]
            shuffleArray(set_game_players_from_firstHalf);
            shuffleArray(set_game_players_from_secondHalf);
            newPares.push([set_game_players_from_firstHalf[0],
                           set_game_players_from_secondHalf[0],
                           set_game_players_from_firstHalf[1],
                           set_game_players_from_secondHalf[1]]);
          }
        } else if (selectedMembers.length % 4 === 1) {
          const [three_twice_players_array, rest_players_array]: Member[][] = getRandomThreeAndRestShuffle(selectedMembers);
          const one_opponent_to_twice_player: Member = rest_players_array[getRandomInt(rest_players_array.length)];
          const first_set_game_players = [one_opponent_to_twice_player, three_twice_players_array].flat();
          first_set_game_players.sort((a: Member, b: Member) => b.doubles_strength - a.doubles_strength);
          const first_game_firstHalf = first_set_game_players.slice(0,2);
          const first_game_secondHalf = first_set_game_players.slice(2);
          shuffleArray(first_game_firstHalf);
          shuffleArray(first_game_secondHalf);
          newPares.push([first_game_firstHalf[0], 
                         first_game_secondHalf[0],
                         first_game_firstHalf[1],
                         first_game_secondHalf[1]]);
          const players_except_opponent_to_twice_player : Member[] = selectedMembers.filter((item: Member) => item.id !== one_opponent_to_twice_player.id);
          const firstHalf = players_except_opponent_to_twice_player.slice(0, players_except_opponent_to_twice_player.length / 2);
          const secondHalf = players_except_opponent_to_twice_player.slice(players_except_opponent_to_twice_player.length / 2);
          for (let i = 0; i < firstHalf.length; i += 2) {
            const set_game_players_from_firstHalf = [firstHalf[i], firstHalf[i + 1]];
            const set_game_players_from_secondHalf = [secondHalf[i], secondHalf[i + 1]]
            shuffleArray(set_game_players_from_firstHalf);
            shuffleArray(set_game_players_from_secondHalf);
            newPares.push([set_game_players_from_firstHalf[0],
                           set_game_players_from_secondHalf[0],
                           set_game_players_from_firstHalf[1],
                           set_game_players_from_secondHalf[1]]);
          }
        } else if (selectedMembers.length % 4 === 2) {
          const [two_twice_players_array, rest_players_array]: Member[][] = getRandomTwoAndRestShuffle(selectedMembers);
          const [two_opponent_to_twice_player, once_players_array]: Member[][] = getRandomTwoAndRestShuffle(rest_players_array);
          const first_set_game_players = [two_twice_players_array, two_opponent_to_twice_player].flat();
          first_set_game_players.sort((a: Member, b: Member) => b.doubles_strength - a.doubles_strength);
          const first_game_firstHalf = first_set_game_players.slice(0,2);
          const first_game_secondHalf = first_set_game_players.slice(2);
          shuffleArray(first_game_firstHalf);
          shuffleArray(first_game_secondHalf);
          newPares.push([first_game_firstHalf[0], 
                         first_game_secondHalf[0],
                         first_game_firstHalf[1],
                         first_game_secondHalf[1]]);
          const players_except_two_pponent_to_twice_player : Member[] = selectedMembers.filter((item: Member) => item.id !== two_opponent_to_twice_player[0].id
                                                                                                                && item.id !== two_opponent_to_twice_player[1].id);
          const firstHalf = players_except_two_pponent_to_twice_player.slice(0, players_except_two_pponent_to_twice_player.length / 2);
          const secondHalf = players_except_two_pponent_to_twice_player.slice(players_except_two_pponent_to_twice_player.length / 2);
          for (let i = 0; i < firstHalf.length; i += 2) {
            const set_game_players_from_firstHalf = [firstHalf[i], firstHalf[i + 1]];
            const set_game_players_from_secondHalf = [secondHalf[i], secondHalf[i + 1]]
            shuffleArray(set_game_players_from_firstHalf);
            shuffleArray(set_game_players_from_secondHalf);
            newPares.push([set_game_players_from_firstHalf[0],
                           set_game_players_from_secondHalf[0],
                           set_game_players_from_firstHalf[1],
                           set_game_players_from_secondHalf[1]]);
          }
        } else if (selectedMembers.length % 4 === 3) {
          const twice_player: Member = selectedMembers[getRandomInt(selectedMembers.length)];
          const players_array_except_twice_player: Member[] = selectedMembers.filter((item: Member) => item.id !== twice_player.id);
          const [three_players_opponent_to_twice_player_array, once_players_array]: Member[][] = getRandomThreeAndRestShuffle(players_array_except_twice_player);
          const first_set_game_players = [twice_player, three_players_opponent_to_twice_player_array].flat();
          first_set_game_players.sort((a: Member, b: Member) => b.doubles_strength - a.doubles_strength);
          const first_game_firstHalf = first_set_game_players.slice(0,2);
          const first_game_secondHalf = first_set_game_players.slice(2);
          shuffleArray(first_game_firstHalf);
          shuffleArray(first_game_secondHalf);
          newPares.push([first_game_firstHalf[0], 
                         first_game_secondHalf[0],
                         first_game_firstHalf[1],
                         first_game_secondHalf[1]]);
          const players_except_three_opponent_to_twice_player: Member[] = selectedMembers.filter((item: Member) => item.id !== three_players_opponent_to_twice_player_array[0].id
                                                                                                                  && item.id !== three_players_opponent_to_twice_player_array[1].id
                                                                                                                  && item.id !== three_players_opponent_to_twice_player_array[2].id);
          const firstHalf = players_except_three_opponent_to_twice_player.slice(0, players_except_three_opponent_to_twice_player.length / 2);
          const secondHalf = players_except_three_opponent_to_twice_player.slice(players_except_three_opponent_to_twice_player.length / 2);
          for (let i = 0; i < firstHalf.length; i += 2) {
            const set_game_players_from_firstHalf = [firstHalf[i], firstHalf[i + 1]];
            const set_game_players_from_secondHalf = [secondHalf[i], secondHalf[i + 1]]
            shuffleArray(set_game_players_from_firstHalf);
            shuffleArray(set_game_players_from_secondHalf);
            newPares.push([set_game_players_from_firstHalf[0],
                           set_game_players_from_secondHalf[0],
                           set_game_players_from_firstHalf[1],
                           set_game_players_from_secondHalf[1]]);
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
      <Dialog disableEscapeKeyDown open={doublesMakePareDialogOpen} onClose={handleDoublesMakePareDialogClose}>
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
          <Button onClick={handleDoublesMakePareDialogClose}>Cancel</Button>
          <Button onClick={() => {handleDoublesMakePareDialogClose(); handleMakePare(); handleBeforeSendPareDialogOpen();}}>Ok</Button>
        </DialogActions>
      </Dialog>
      <React.Fragment>
        <DoublesBeforeSendPareDialog
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
