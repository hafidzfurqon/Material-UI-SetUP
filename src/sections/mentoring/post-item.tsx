import type { CardProps } from '@mui/material/Card';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import { fDate } from 'src/utils/format-time';
import { fShortenNumber } from 'src/utils/format-number';

import { varAlpha } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';
import { SvgColor } from 'src/components/svg-color';
import { Link as Links } from 'react-router-dom';
import { useState } from 'react';
import { Dialog, DialogContent, DialogContentText } from '@mui/material';
import { DialogTitle } from '@mui/material';
import { DialogActions } from '@mui/material';
import { Button } from '@mui/material';

// ----------------------------------------------------------------------

export type PostItemProps = {
  id: string;
  title: string;
  coverUrl: string;
  totalViews: number;
  description: string;
  totalShares: number;
  totalComments: number;
  totalFavorites: number;
  postedAt: string | number | null;
  author: {
    name: string;
    avatarUrl: string;
  };
};

export type MentoringItemProps = {
  id: number;
  materi_singkat: string;
  coverUrl: string;
  totalViews: number;
  description: string;
  totalShares: number;
  totalComments: number;
  totalFavorites: number;
  tanggal_mentoring: string;
  tempat_mentoring: string;
  nama_mentor: string;
  image: string;
  postedAt: string | number | null;
};

export function PostItem({
  sx,
  post,
  latestPost,
  latestPostLarge,
  ...other
}: CardProps & {
  post: MentoringItemProps;
  latestPost: boolean;
  latestPostLarge: boolean;
}) {
  const renderTitle = (
    <Link
      color="inherit"
      variant="subtitle2"
      underline="hover"
      sx={{
        height: 44,
        overflow: 'hidden',
        WebkitLineClamp: 2,
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        ...(latestPostLarge && { typography: 'h5', height: 60 }),
        ...((latestPostLarge || latestPost) && {
          color: 'common.white',
        }),
      }}
    >
      {post.materi_singkat}
    </Link>
  );

  const renderTempat = (
    <Link
      color="inherit"
      variant="subtitle2"
      underline="hover"
      sx={{
        height: 24,
        overflow: 'hidden',
        WebkitLineClamp: 2,
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        ...(latestPostLarge && { typography: 'h5', height: 40 }),
        ...((latestPostLarge || latestPost) && {
          color: 'common.white',
        }),
      }}
    >
      {post.nama_mentor}
    </Link>
  );

  const renderInfo = () => {
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    return (
      <>
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="flex-end"
          sx={{
            mt: 3,
            color: 'text.disabled',
          }}
        >
          <Box
            display="flex"
            sx={{
              ...((latestPostLarge || latestPost) && {
                color: 'common.white',
              }),
            }}
          >
            <Links style={{ color: 'slategray' }} to="">
              <Iconify width={16} icon="solar:eye-bold" sx={{ mr: 0.5 }} />
            </Links>
            <Box
              component="button"
              sx={{
                border: 'none',
                cursor: 'pointer',
                background: 'none',
                color: 'green',
                ...((latestPostLarge || latestPost) && {
                  color: 'common.white',
                }),
              }}
            >
              <Iconify width={16} icon="solar:pen-bold" sx={{ mr: 0.5 }} />
            </Box>
            <Box
              component="button"
              onClick={handleClickOpen}
              sx={{
                border: 'none',
                background: 'none',
                cursor: 'pointer',
              }}
            >
              <Iconify width={16} icon="solar:trash-bin-trash-bold" sx={{ color: 'error.main' }} />
            </Box>
          </Box>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Let Google help apps determine location. This means sending anonymous location data
                to Google, even when no apps are running.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Disagree</Button>
              <Button onClick={handleClose} autoFocus>
                Agree
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </>
    );
  };

  const renderCover = (
    <Box
      component="img"
      alt={post.materi_singkat}
      src={post.image}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
  );

  const renderDate = (
    <Typography
      variant="caption"
      component="div"
      sx={{
        mb: 1,
        color: 'text.disabled',
        ...((latestPostLarge || latestPost) && {
          opacity: 0.48,
          color: 'common.white',
        }),
      }}
    >
      {fDate(post.tanggal_mentoring)}
    </Typography>
  );

  return (
    <Card sx={sx} {...other}>
      <Box
        sx={(theme) => ({
          position: 'relative',
          pt: 'calc(100% * 3 / 4)',
          ...((latestPostLarge || latestPost) && {
            pt: 'calc(100% * 4 / 3)',
            '&:after': {
              top: 0,
              content: "''",
              width: '100%',
              height: '100%',
              position: 'absolute',
              bgcolor: varAlpha(theme.palette.grey['900Channel'], 0.72),
            },
          }),
          ...(latestPostLarge && {
            pt: {
              xs: 'calc(100% * 4 / 3)',
              sm: 'calc(100% * 3 / 4.66)',
            },
          }),
        })}
      >
        {renderCover}
      </Box>

      <Box
        sx={(theme) => ({
          p: theme.spacing(6, 3, 3, 3),
          ...((latestPostLarge || latestPost) && {
            width: 1,
            bottom: 0,
            position: 'absolute',
          }),
        })}
      >
        {renderDate}
        {renderTempat}
        {renderTitle}
        {renderInfo()}
      </Box>
    </Card>
  );
}
