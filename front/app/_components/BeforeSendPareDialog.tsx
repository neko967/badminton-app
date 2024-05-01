import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function BeforeSendPareDialog({beforeSendPareDialogOpen, handleBeforeSendPareDialogClose, makedPare, handleMakePare}: any) {
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
      <DialogContent  id="alert-dialog-description">
        <div>
          {makedPare.length === 0 ? (
            <p>ペアがありません</p>
          ) : (
            <div className="flex flex-col w-full">
              {makedPare.map((pare: any, index: number) => (
                <div key={index} className="w-full flex items-center">
                  <p>{pare[0]} - {pare[1]}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleBeforeSendPareDialogClose}>キャンセル</Button>
        <Button onClick={handleMakePare}>組み直す</Button>
        <Button onClick={handleBeforeSendPareDialogClose} autoFocus>登録する</Button>
      </DialogActions>
    </Dialog>
  );
}
