import * as React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

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

export default function BeforeSendPareDialog({beforeSendPareDialogOpen, 
                                              handleBeforeSendPareDialogClose, 
                                              makedPare, handleMakePare, 
                                              playersWithStatus}: any) {
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/singles_records`;
  const { data: session, status } = useSession();
  const router = useRouter();

  const handlePareSubmit = async () => {
    for (let i = 0; i < makedPare.length; i ++) {
      const member1 = playersWithStatus.find((item: Member) => item.name === makedPare[i][0]);
      const member2 = playersWithStatus.find((item: Member) => item.name === makedPare[i][1]);

      if (session) {
        await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            member_1_id: member1.id,
            member_2_id: member2.id,
            email: session.user?.email,
          }),
        })
      }
    }
    router.push('/match');
  };

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
        <Button onClick={() => {handleMakePare(playersWithStatus);}}>組み直す</Button>
        <Button onClick={() => {handleBeforeSendPareDialogClose(); handlePareSubmit();}} autoFocus>登録する</Button>
      </DialogActions>
    </Dialog>
  );
}
