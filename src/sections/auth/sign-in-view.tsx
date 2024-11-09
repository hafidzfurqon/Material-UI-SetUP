import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { Iconify } from 'src/components/iconify';
import { useForm } from 'react-hook-form';
import { Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useMutationLogin } from './Authentikasi/useMutationLogin';
import toast from 'react-hot-toast';

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
      toast.error(error.message);
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
        <Typography variant="h5">Sign in</Typography>
        <Typography variant="body2" color="text.secondary">
          Belum Daftar? Register Dulu Yuk!
        </Typography>
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
        <Link to="/">Register</Link>
      </Box>
    </>
  );
}
