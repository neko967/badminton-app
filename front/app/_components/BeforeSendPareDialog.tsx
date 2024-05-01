import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function BeforeSendPareDialog({beforeSendPareDialogOpen, handleBeforeSendPareDialogClose, makedPare}: any) {

  return (
    <Dialog
      open={beforeSendPareDialogOpen}
      onClose={handleBeforeSendPareDialogClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"このペアで対戦を組みますか？"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
            ccc
          {makedPare.map((pare: any, index: number) => {
            <div
              key={index}
            >
              ddd
              <dt className="">aaa{pare[0]}</dt>
              <dt className="">bbb{pare[1]}</dt>
            </div>
          })}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleBeforeSendPareDialogClose}>Disagree</Button>
        <Button onClick={handleBeforeSendPareDialogClose} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}
