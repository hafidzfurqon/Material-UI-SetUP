import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { useRouter } from 'src/routes/hooks';

import { useForm } from 'react-hook-form';
import { ListItemButton, Stack } from '@mui/material';
import { useMutationPendaftaran } from './Authentikasi/useMutationPendaftaran';
import { FormLabel } from '@mui/material';
import toast from 'react-hot-toast';

// ----------------------------------------------------------------------
type Login = {
  nama: string;
  motto_hidup: string;
  kelas: string;
  alasan_masuk: string;
  images: string;
  jurusan: string;
};

type error = {
  message: string;
};

export function SignUpView() {
  const router = useRouter();
  //   const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit } = useForm();
  const { mutate, isPending } = useMutationPendaftaran({
    onSuccess: () => {
      toast.success('Berhasil Mendaftar Berhasil 🙌');
      router.push('/sign-in');
    },
    onError: (error: error) => {
      toast.error(error.message);
    },
  });

  const OnSubmit = (data: any) => {
    const { image: gambar, ...rest } = data;
    const formData: any = new FormData();
    Object.entries(rest).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append('image', gambar[0]);
    mutate(formData);
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
          {...register('nama')}
          autoFocus
          margin="dense"
          required
          id="nama"
          name="nama"
          label="Nama Lengkap"
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 3 }}
        />
        <TextField
          fullWidth
          {...register('kelas')}
          margin="dense"
          id="kelas"
          name="kelas"
          label="Kelas (12)"
          type="number"
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 3 }}
        />
        <TextField
          fullWidth
          {...register('motto_hidup')}
          margin="dense"
          id="motto_hidup"
          name="motto_hidup"
          label="Moto Hidup"
          type="text"
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 3 }}
        />
        <TextField
          fullWidth
          {...register('jurusan')}
          margin="dense"
          id="jurusan"
          name="jurusan"
          label="Jurusan"
          type="text"
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 3 }}
        />
        <TextField
          fullWidth
          {...register('alasan_masuk')}
          margin="dense"
          id="alasan_masuk"
          name="alasan_masuk"
          label="Alasan Masuk"
          type="text"
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 3 }}
        />
        <FormLabel
          sx={{
            mb: 3,
          }}
        >
          Image (optional)
          <TextField
            {...register('image')}
            margin="dense"
            id="image"
            type="file"
            fullWidth
            variant="outlined"
          />
        </FormLabel>

        {/* <TextField
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
        /> */}
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
        <Typography variant="h5">Daftarkan dirimu RODAMU</Typography>
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
          Sudah punya akun ? Login disini
        </Typography>
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
          href="/sign-in"
        >
          <Box component="span">Login disini</Box>
        </ListItemButton>
      </Box>
    </>
  );
}
