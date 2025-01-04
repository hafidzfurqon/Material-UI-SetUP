import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { Iconify } from 'src/components/iconify';
import { useForm } from 'react-hook-form';
import { ListItemButton, Stack } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useMutationLogin } from './Authentikasi/useMutationLogin';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

// ----------------------------------------------------------------------
type Login = {
  email: string;
  password: string;
};

type error = {
  message: string;
};

export function SignInView() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit } = useForm<Login>();
  const { mutate, isPending } = useMutationLogin({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usersData'] });
      toast.success('Login Berhasil 🙌');
      router.push('/dashboard');
    },
    onError: (error: error) => {
      toast.error(error.message || 'Email atau password salah');
    },
  });

  const OnSubmit: any = (data: any) => {
    mutate(data);
  };
  const renderForm = (
    <Stack spacing={3}>
      <Box
        component="form"
        display="flex"
        flexDirection="column"
        alignItems="flex-end"
        onSubmit={handleSubmit(OnSubmit)}
      >
        <TextField
          fullWidth
          {...register('email')}
          label="Email address"
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 3 }}
        />

        <TextField
          fullWidth
          {...register('password')}
          label="Password"
          InputLabelProps={{ shrink: true }}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ mb: 3 }}
        />
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          color="inherit"
          variant="contained"
          disabled={isPending}
        >
          {isPending ? 'Loading...' : ' Sign in'}
        </LoadingButton>
      </Box>
    </Stack>
  );

  return (
    <>
      <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
        <Typography variant="h5">Sign in to RODAMU</Typography>
      </Box>

      {renderForm}

      <Box
        sx={{
          my: 2,
          '&::before, &::after': { borderTopStyle: 'dashed' },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="overline"
          sx={{ color: 'text.secondary', fontWeight: 'fontWeightMedium', mb: 1 }}
        >
          Belum Daftar ? Register disini
        </Typography>
        <Box
          sx={{ mx: 3, gap: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <ListItemButton
            disableGutters
            sx={{
              pl: 2,
              py: 1,
              gap: 3,
              // display : 'flex',
              display: 'flex',
              mt: 2,

              pr: 1.5,
              borderRadius: 0.75,
              typography: 'body2',
              fontWeight: 'fontWeightMedium',
              minHeight: 'var(--layout-nav-item-height)',
              bgcolor: 'var(--layout-nav-item-active-bg)',
              color: 'var(--layout-nav-item-active-color)',
              '&:hover': {
                bgcolor: 'var(--layout-nav-item-hover-bg)',
              },
            }}
            href="/"
          >
            <Box component="span">Kembali</Box>
          </ListItemButton>
          <ListItemButton
            disableGutters
            sx={{
              pl: 2,
              py: 1,
              gap: 3,
              // display : 'flex',
              display: 'flex',
              mt: 2,

              pr: 1.5,
              borderRadius: 0.75,
              typography: 'body2',
              fontWeight: 'fontWeightMedium',
              minHeight: 'var(--layout-nav-item-height)',
              bgcolor: 'var(--layout-nav-item-active-bg)',
              color: 'var(--layout-nav-item-active-color)',
              '&:hover': {
                bgcolor: 'var(--layout-nav-item-hover-bg)',
              },
            }}
            href="/sign-up"
          >
            <Box component="span">Daftar disini</Box>
          </ListItemButton>
        </Box>
      </Box>
    </>
  );
}
