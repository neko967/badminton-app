import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function BeforeSendPareDialog({beforeSendPareDialogOpen, handleBeforeSendPareDialogClose, makedPare}: any) {
  console.log(makedPare);
  console.log(makedPare[0]);

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
          {makedPare.length === 0 ? (
            <p>ペアがありません</p>
          ) : (
            <div>
              {makedPare.map((pare: any, index: number) => (
                <div key={index}>
                  <p>ddd</p>
                  <p>{pare[0]}</p>
                  <p>{pare[1]}</p>
                </div>
              ))}
            </div>
          )}
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
