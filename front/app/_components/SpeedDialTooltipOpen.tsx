import { type Session } from "next-auth";
import React from 'react';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SinglesSelectDialog from './SinglesSelectDialog';
import DoublesSelectDialog from './DoublesSelectDialog';
import AddPersonDialog from './AddPersonDialog';

export default function SpeedDialTooltipOpen({fetchData}: any) {
  const [dialOpen, setDialOpen] = React.useState(false);
  const handleDialOpen = () => setDialOpen(true);
  const handleDialClose = () => setDialOpen(false);

  const actions = [
    { icon: <PeopleIcon onClick={() => {handleDoublesClickOpen();}} />, name: 'ダブルス' },
    { icon: <PersonIcon onClick={() => {handleSinglesClickOpen();}}/>, name: 'シングルス' },
    { icon: <PersonAddIcon onClick={() => {handleAddPersonClickOpen();}} />, name: 'メンバーを追加' },
  ];

  const [singlesOpen, setSinglesOpen] = React.useState(false);
  const handleSinglesClickOpen = () => {
    setSinglesOpen(true);
  };
  const handleSinglesClose = (event: any, reason: any) => {
    if (reason !== 'backdropClick') {
      setSinglesOpen(false);
    }
  };

  const [doublesOpen, setDoublesOpen] = React.useState(false);
  const handleDoublesClickOpen = () => {
    setDoublesOpen(true);
  };
  const handleDoublesClose = (event: any, reason: any) => {
    if (reason !== 'backdropClick') {
      setDoublesOpen(false);
    }
  };

  const [addPersonOpen, setAddPersonOpen] = React.useState(false);
  const handleAddPersonClickOpen = () => {
    setAddPersonOpen(true);
  };
  const handleAddPersonClose = (event: any, reason: any) => {
    if (reason !== 'backdropClick') {
      setAddPersonOpen(false);
    }
  };

  return (
    <>
      <Box sx={{ position: 'fixed', bottom: 60, left: 0, right: {xs: 10, md:100 ,lg:276}}}>
        <Backdrop open={dialOpen} />
        <SpeedDial
          ariaLabel="SpeedDial tooltip example"
          sx={{ position: 'absolute', bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}
          onClose={handleDialClose}
          onOpen={handleDialOpen}
          open={dialOpen}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              tooltipOpen
              onClick={handleDialClose}
            />
          ))}
        </SpeedDial>
        <SinglesSelectDialog
          singlesOpen={singlesOpen}
          handleSinglesClose={handleSinglesClose}
        />
        <DoublesSelectDialog
          doublesOpen={doublesOpen}
          handleDoublesClose={handleDoublesClose}
        />
        <AddPersonDialog
          addPersonOpen={addPersonOpen}
          handleAddPersonClose={handleAddPersonClose}
          fetchData={fetchData}
        />
      </Box>
    </>
  );
}
