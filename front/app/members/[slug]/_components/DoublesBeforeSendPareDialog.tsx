import * as React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import type { Member } from '@/app/types/index';

interface DoublesBeforeSendPareDialogProps {
  beforeSendPareDialogOpen: boolean;
  handleBeforeSendPareDialogClose: () => void;
  makedPare: string[][];
  handleMakePare: () => void;
  playersWithStatus: Member[];
  params: { slug: string };
}

export default function DoublesBeforeSendPareDialog({
  beforeSendPareDialogOpen,
  handleBeforeSendPareDialogClose,
  makedPare,
  handleMakePare,
  playersWithStatus,
  params,
}: DoublesBeforeSendPareDialogProps) {

  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/doubles_records`;
  const { data: session, status } = useSession();
  const router = useRouter();

  const handlePareSubmit = async () => {
    for (let i = 0; i < makedPare.length; i ++) {
      const member1 = playersWithStatus.find((item: Member) => item.name === makedPare[i][0]);
      const member2 = playersWithStatus.find((item: Member) => item.name === makedPare[i][1]);
      const member3 = playersWithStatus.find((item: Member) => item.name === makedPare[i][2]);
      const member4 = playersWithStatus.find((item: Member) => item.name === makedPare[i][3]);

      if (session) {
        await fetch(API_URL, {
          method: "POST",
          headers: {
            'slug': `${params.slug}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            member_1_id: member1?.id,
            member_2_id: member2?.id,
            member_3_id: member3?.id,
            member_4_id: member4?.id,
          }),
        })
      }
    }
    router.push(`/records/${params.slug}?set_value=1`);
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
              {makedPare.map((pare, index) => (
                <div key={index} className="w-full flex items-center border-b border-slate-500 border-opacity-45">
                  <div className="w-5/12 flex justify-start">
                    <div className="w-full">
                      <div className="flex justify-start">
                        <p>{pare[0]}</p>
                      </div>
                      <div className="flex justify-start">
                        <p>{pare[1]}</p>
                      </div>
                    </div>
                  </div>
                  <div className="w-1/6 flex justify-center">
                    <p>-</p>
                  </div>
                  <div className="w-5/12 flex justify-end">
                    <div className="w-full">
                      <div className="flex justify-end">
                        <p>{pare[2]}</p>
                      </div>
                      <div className="flex justify-end">
                        <p>{pare[3]}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleBeforeSendPareDialogClose}>キャンセル</Button>
        <Button onClick={() => {handleMakePare();}}>組み直す</Button>
        <Button onClick={() => {handleBeforeSendPareDialogClose(); handlePareSubmit();}} autoFocus>登録する</Button>
      </DialogActions>
    </Dialog>
  );
}