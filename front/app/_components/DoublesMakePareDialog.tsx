import React, { useState, useEffect } from 'react';
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

export default function DoublesMakePareDialog({ doublesMakePareDialogOpen, handleDoublesMakePareDialogClose, playersWithStatus}: any) {
  const [howToPare, setHowToPare] = useState<string>('random');
  const handleHowToPareChange = (event: SelectChangeEvent) => {
    setHowToPare(event.target.value as string);
  };

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

  function getRandomThreeAndRestShuffle(array: any) {
    const shuffled = array.sort(() => 0.5 - Math.random());
    const randomThree = shuffled.slice(0, 3);
    const rest = shuffled.slice(3);
    return [randomThree, rest];
  }

  function getRandomTwoAndRestShuffle(data: any) {
    const shuffled = data.sort(() => 0.5 - Math.random());
    const randomTwo = shuffled.slice(0, 2);
    const rest = shuffled.slice(2);
    return [randomTwo, rest];
  }

  const handleMakePare = () => {
    const newPares = [];
    playersWithStatus.sort((a: Member, b: Member) => b.doubles_strength - a.doubles_strength);

    switch (howToPare) {
      case "random":
        if (playersWithStatus.length % 4 === 0) {
          shuffleArray(playersWithStatus); 
          for (let i = 0; i < playersWithStatus.length; i += 4) {
            newPares.push([playersWithStatus[i].name,
                           playersWithStatus[i + 1].name,
                           playersWithStatus[i + 2].name,
                           playersWithStatus[i + 3].name]);
          }
        } else if (playersWithStatus.length % 4 === 1) {
          const [three_twice_players_array, rest_players_array]: Member[][] = getRandomThreeAndRestShuffle(playersWithStatus);
          const opponent_to_twice_player: Member = rest_players_array[getRandomInt(rest_players_array.length)];
          newPares.push([three_twice_players_array[0].name,
                         three_twice_players_array[1].name,
                         three_twice_players_array[2].name,
                         opponent_to_twice_player.name]);
          const players_except_opponent_to_twice_player : Member[] = playersWithStatus.filter((item: Member) => item.id !== opponent_to_twice_player.id);
          shuffleArray(players_except_opponent_to_twice_player);
          for (let i = 0; i < players_except_opponent_to_twice_player.length ; i += 4 ) {
            newPares.push([players_except_opponent_to_twice_player[i].name,
                           players_except_opponent_to_twice_player[i + 1].name,
                           players_except_opponent_to_twice_player[i + 2].name,
                           players_except_opponent_to_twice_player[i + 3].name]);
          }
        } else if (playersWithStatus.length % 4 === 2) {
          const [two_twice_players_array, rest_players_array]: Member[][] = getRandomTwoAndRestShuffle(playersWithStatus);
          const [two_opponent_to_twice_player, normal_players_array]: Member[][] = getRandomTwoAndRestShuffle(rest_players_array);
          newPares.push([two_twice_players_array[0].name,
                         two_twice_players_array[1].name,
                         two_opponent_to_twice_player[0].name,
                         two_opponent_to_twice_player[1].name]);
          const players_except_opponent_to_twice_player: Member[] = [two_twice_players_array, normal_players_array].flat();
          shuffleArray(players_except_opponent_to_twice_player);
          for (let i = 0; i < players_except_opponent_to_twice_player.length ; i += 4 ) {
            newPares.push([players_except_opponent_to_twice_player[i].name,
                           players_except_opponent_to_twice_player[i + 1].name,
                           players_except_opponent_to_twice_player[i + 2].name,
                           players_except_opponent_to_twice_player[i + 3].name]);
          }
        } else if (playersWithStatus.length % 4 === 3) {
          const twice_player: Member = playersWithStatus[getRandomInt(playersWithStatus.length)];
          const players_array_except_twice_player: Member[] = playersWithStatus.filter((item: Member) => item.id !== twice_player.id);
          const [three_opponent_to_twice_players_array, normal_players_array]: Member[][] = getRandomThreeAndRestShuffle(players_array_except_twice_player);
          newPares.push([twice_player.name,
                         three_opponent_to_twice_players_array[0].name,
                         three_opponent_to_twice_players_array[1].name,
                         three_opponent_to_twice_players_array[2].name]);
          const players_except_opponent_to_twice_player: Member[] = [twice_player, normal_players_array].flat();
          shuffleArray(players_except_opponent_to_twice_player);
          for (let i = 0; i < players_except_opponent_to_twice_player.length ; i += 4 ) {
            newPares.push([players_except_opponent_to_twice_player[i].name,
                           players_except_opponent_to_twice_player[i + 1].name,
                           players_except_opponent_to_twice_player[i + 2].name,
                           players_except_opponent_to_twice_player[i + 3].name]);
          }
        }
        break;
      case "even":
        if (playersWithStatus.length % 4 === 0) {
          for (let i = 0; i < playersWithStatus.length; i += 4) {
            const set_game_players = [playersWithStatus[i], playersWithStatus[i + 1], playersWithStatus[i + 2], playersWithStatus[i + 3]]
            shuffleArray(set_game_players);
            newPares.push([set_game_players[0].name, 
                           set_game_players[1].name,
                           set_game_players[2].name,
                           set_game_players[3].name]);
          }
        } else if (playersWithStatus.length % 4 === 1) {
          const [three_twice_players_array, rest_players_array]: Member[][] = getRandomThreeAndRestShuffle(playersWithStatus);
          const one_opponent_to_twice_player: Member = rest_players_array[getRandomInt(rest_players_array.length)];
          newPares.push([three_twice_players_array[0].name,
                         three_twice_players_array[1].name,
                         three_twice_players_array[2].name,
                         one_opponent_to_twice_player.name]);
          const players_except_opponent_to_twice_player : Member[] = playersWithStatus.filter((item: Member) => item.id !== one_opponent_to_twice_player.id);
          for (let i = 0; i < players_except_opponent_to_twice_player.length ; i += 4 ) {
            const set_game_players = [players_except_opponent_to_twice_player[i],
                                      players_except_opponent_to_twice_player[i + 1],
                                      players_except_opponent_to_twice_player[i + 2],
                                      players_except_opponent_to_twice_player[i + 3]]
            shuffleArray(set_game_players);
            newPares.push([set_game_players[0].name, 
                           set_game_players[1].name,
                           set_game_players[2].name,
                           set_game_players[3].name]);
          }
        } else if (playersWithStatus.length % 4 === 2) {
          const [two_twice_players_array, rest_players_array]: Member[][] = getRandomTwoAndRestShuffle(playersWithStatus);
          const [two_opponent_to_twice_player, once_players_array]: Member[][] = getRandomTwoAndRestShuffle(rest_players_array);
          newPares.push([two_twice_players_array[0].name,
                         two_twice_players_array[1].name,
                         two_opponent_to_twice_player[0].name,
                         two_opponent_to_twice_player[1].name]);
          const players_except_two_pponent_to_twice_player : Member[] = playersWithStatus.filter((item: Member) => item.id !== two_opponent_to_twice_player[0].id
                                                                                                                && item.id !== two_opponent_to_twice_player[1].id);
          for (let i = 0; i < players_except_two_pponent_to_twice_player.length ; i += 4 ) {
            const set_game_players = [players_except_two_pponent_to_twice_player[i],
                                      players_except_two_pponent_to_twice_player[i + 1],
                                      players_except_two_pponent_to_twice_player[i + 2],
                                      players_except_two_pponent_to_twice_player[i + 3]]
            shuffleArray(set_game_players);
            newPares.push([set_game_players[0].name, 
                           set_game_players[1].name,
                           set_game_players[2].name,
                           set_game_players[3].name]);
          }
        } else if (playersWithStatus.length % 4 === 3) {
          const twice_player: Member = playersWithStatus[getRandomInt(playersWithStatus.length)];
          const players_array_except_twice_player: Member[] = playersWithStatus.filter((item: Member) => item.id !== twice_player.id);
          const [three_players_opponent_to_twice_player_array, once_players_array]: Member[][] = getRandomThreeAndRestShuffle(players_array_except_twice_player);
          newPares.push([twice_player.name,
                         three_players_opponent_to_twice_player_array[0].name,
                         three_players_opponent_to_twice_player_array[1].name,
                         three_players_opponent_to_twice_player_array[2].name]);
          const players_except_three_opponent_to_twice_player: Member[] = playersWithStatus.filter((item: Member) => item.id !== three_players_opponent_to_twice_player_array[0].id
                                                                                                                  && item.id !== three_players_opponent_to_twice_player_array[1].id
                                                                                                                  && item.id !== three_players_opponent_to_twice_player_array[2].id);
          for (let i = 0; i < players_except_three_opponent_to_twice_player.length ; i += 4 ) {
            const set_game_players = [players_except_three_opponent_to_twice_player[i],
                                      players_except_three_opponent_to_twice_player[i + 1],
                                      players_except_three_opponent_to_twice_player[i + 2],
                                      players_except_three_opponent_to_twice_player[i + 3]]
            shuffleArray(set_game_players);
            newPares.push([set_game_players[0].name, 
                           set_game_players[1].name,
                           set_game_players[2].name,
                           set_game_players[3].name]);
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
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
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
          howToPare={howToPare}
          handleMakePare={handleMakePare}
          playersWithStatus={playersWithStatus}
        />
      </React.Fragment>
    </div>
  );
}
