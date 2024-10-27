import { LoadingButton } from '@mui/lab';
import { Button, Container, InputAdornment, Stack, TextField } from '@mui/material';
import { Typography } from '@mui/material';
import { FormLabel } from '@mui/material';
import { Box } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { CONFIG } from 'src/config-global';
import { useMutationMentoring } from 'src/hooks/mentoring/useMutationMentoring';
import { router } from 'src/hooks/routing/useRouting';
import { useRouter } from 'src/routes/hooks';

export default function CreateView() {
  const Router = useRouter();
  const { register, handleSubmit } = useForm();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutationMentoring({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mentoring'] });
      toast.success('Mentoring Berhasil Ditambah');
      Router.back('/mentoring');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  const OnSubmit = (data) => {
    const { image: gambar, ...rest } = data;
    const formData = new FormData();
    Object.entries(rest).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append('image', gambar[0]);
    mutate(formData);
  };
  return (
    <>
      <Helmet>
        <title> {`Tambah - ${CONFIG.appName}`}</title>
      </Helmet>
      <Container sx={{ mb: 5 }}>
        <Typography variant="h4" sx={{ mt: 3 }}>
          Tambah Mentoring baru disini
        </Typography>
        <Box sx={{ mt: { xs: 6, md: 5 } }}>
          <Box component="form" onSubmit={handleSubmit(OnSubmit)}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                id="tanggal_mentoring"
                {...register('tanggal_mentoring')}
                label="Tanggal Mentoring"
                InputLabelProps={{ shrink: true }}
                sx={{ mb: 3 }}
                type="date"
              />
              <TextField
                fullWidth
                autoFocus
                required
                margin="dense"
                id="nama_mentor"
                {...register('nama_mentor')}
                label="Nama Mentor"
                sx={{ mb: 3 }}
                type="text"
              />
              <TextField
                {...register('tempat_mentoring', { required: 'Tempat mentoring is required' })}
                autoFocus
                required
                margin="dense"
                id="tempat_mentoring"
                label="Tempat mentoring"
                type="text"
                fullWidth
                variant="outlined"
              />
              <TextField
                fullWidth
                id="materi_singkat"
                {...register('materi_singkat')}
                label="Materi Singkat"
                sx={{ mb: 3 }}
                type="text"
                variant="outlined"
              />
              <FormLabel>
                Image
                <TextField
                  {...register('image')}
                  margin="dense"
                  id="image"
                  type="file"
                  fullWidth
                  variant="outlined"
                />
              </FormLabel>
              <Box display="flex" gap={2}>
                <Link to={router.mentoring.list}>
                  <LoadingButton color="inherit" variant="contained">
                    Batal
                  </LoadingButton>
                </Link>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  sx={{
                    bgcolor: '#16a34a',
                    '&:hover': {
                      bgcolor: '#4d7c0f',
                    },
                  }}
                  disabled={isPending}
                >
                  Submit
                </LoadingButton>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Container>
    </>
  );
}
