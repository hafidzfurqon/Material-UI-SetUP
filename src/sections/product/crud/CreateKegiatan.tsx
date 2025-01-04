import { Container, FormLabel, Stack, TextField, Button, Typography } from '@mui/material';
import { Box } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { CONFIG } from 'src/config-global';
import { error } from 'src/hooks/error';
import { useMutationCreateKegiatan } from 'src/hooks/kegiatan';
import { router } from 'src/hooks/routing/useRouting';
import { useRouter } from 'src/routes/hooks';

type Data = {
  judul: string;
  deskripsi: string;
  tanggal_kegiatan: string;
  image: string;
};
export default function CreateKegiatan() {
  const Router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutationCreateKegiatan({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fetchKegiatan'] });
      toast.success('Kegiatan Ditambah');
      Router.back();
    },
    onError: (err: error) => {
      toast.error(err.message);
    },
  });
  const OnSubmit: any = (data: any) => {
    const { image: gambar, ...rest } = data;
    const formData: any = new FormData();
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
      <Container>
        <Typography variant="h4">Tambah Kegiatan baru disini</Typography>
        <Box sx={{ mt: 5 }}>
          <form onSubmit={handleSubmit(OnSubmit)}>
            <Stack spacing={3}>
              <TextField
                {...register('judul', { required: 'Judul Lengkap is required' })}
                autoFocus
                required
                margin="dense"
                id="nama"
                label="Judul"
                type="text"
                fullWidth
                variant="outlined"
                error={!!errors.nama}
              />
              <TextField
                {...register('deskripsi', { required: 'Deskripsi is required' })}
                margin="dense"
                id="Deskripsi"
                label="Deskripsi"
                type="text"
                fullWidth
                variant="outlined"
                error={!!errors.kelas}
              />
              <TextField
                {...register('tanggal_kegiatan', { required: 'Tanggal Kegiatan is required' })}
                margin="dense"
                id="tanggal"
                label="Tanggal Kegiatan"
                InputLabelProps={{ shrink: true }}
                type="date"
                fullWidth
                variant="outlined"
                error={!!errors.jurusan}
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
              <Box sx={{ display: 'flex', gap: 2, py: 2 }}>
                <Button type="submit" variant="contained">
                  Submit
                </Button>
                <Link to={router.kegiatan.list}>
                  <Button type="submit" variant="outlined" disabled={isPending}>
                    Kembali
                  </Button>
                </Link>
              </Box>
            </Stack>
          </form>
        </Box>
      </Container>
    </>
  );
}
