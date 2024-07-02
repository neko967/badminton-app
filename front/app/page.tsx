"use client";

import { useSession } from 'next-auth/react';
import { Grid, Typography, Box, Button, Container, Paper } from '@mui/material';
import { useRouter } from 'next/navigation';
import { styled } from '@mui/system';
import { signIn } from 'next-auth/react';
import error from "next/error";

const HeroSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  color: 'white',
  padding: theme.spacing(15, 0),
  textAlign: 'center',
}));

const FeatureSection = styled(Box)({
  padding: '80px 0', // テーマのspacingを使用する代わりに直接値を指定
  backgroundColor: "white", // theme.palette.grey[100]の代わりに直接色を指定
});

const FeatureItem = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(2),
  padding: theme.spacing(1, 4),
}));

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleNavigateToGroups = () => {
    if (session) {
      router.push('/groups');
    } else {
      signIn("google", { callbackUrl: "/groups" }).catch(() => {
        console.error(error);
      });
    }
  };

  return (
    <>
      <HeroSection>
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
            スポーツチーム管理を簡単に
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 4 }}>
            試合記録、メンバー管理、パフォーマンス分析を一つのアプリで
          </Typography>
          <Box>
            <StyledButton
              variant="contained"
              size="large"
              onClick={() => { signIn("google", { callbackUrl: "/" }).catch(() => {
                  console.error(error);
                });
              }}
            >
              Googleでログイン
            </StyledButton>
            <StyledButton
              variant="outlined"
              size="large"
              onClick={handleNavigateToGroups}
              sx={{ backgroundColor: 'white' }}
            >
              グループ一覧へ
            </StyledButton>
          </Box>
        </Container>
      </HeroSection>
      <FeatureSection>
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <FeatureItem elevation={3}>
                <Typography variant="h4" component="h3" gutterBottom fontWeight="bold">
                  簡単グループ作成
                </Typography>
                <Typography>
                  チームやグループを簡単に作成し、メンバーを管理できます。
                </Typography>
              </FeatureItem>
            </Grid>
            <Grid item xs={12} md={4}>
              <FeatureItem elevation={3}>
                <Typography variant="h4" component="h3" gutterBottom fontWeight="bold">
                  試合記録
                </Typography>
                <Typography>
                  シングルスやダブルスの試合結果を簡単に記録し、保存できます。
                </Typography>
              </FeatureItem>
            </Grid>
            <Grid item xs={12} md={4}>
              <FeatureItem elevation={3}>
                <Typography variant="h4" component="h3" gutterBottom fontWeight="bold">
                  パフォーマンス分析
                </Typography>
                <Typography>
                  試合結果に基づいて個人やチームのパフォーマンスを分析します。
                </Typography>
              </FeatureItem>
            </Grid>
          </Grid>
        </Container>
      </FeatureSection>
    </>
  );
}
