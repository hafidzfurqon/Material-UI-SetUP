import {
  Container,
  FormLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Button,
  Typography,
} from '@mui/material';
import { Box } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useMutationDokumentasi } from 'src/hooks/dokumentasi/useMutationDokumentasi';
import { error } from 'src/hooks/error';
import { router } from 'src/hooks/routing/useRouting';
import { useRouter } from 'src/routes/hooks';

type DataDokumentasi = {
  judul: string;
  keterangan_dokumentasi: string;
  tanggal_upload: string;
  link_gdrive: string;
  OnSubmit?: () => void;
};

export default function CreateViewDokumentasi() {
  const Router = useRouter();
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm<DataDokumentasi>();
  const { mutate: SaveDokumentasi, isPending } = useMutationDokumentasi({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dokumentasi'] });
      toast.success('Dokumentasi Ditambah');
      Router.back();
    },
    onError: (err: error) => {
      toast.error(err.message);
    },
  });
  const OnSubmit = (data: any) => {
    SaveDokumentasi(data);
  };

  return (
    <Container>
      <Typography variant="h4">Tambah Dokumentasi baru disini</Typography>
      <Box sx={{ mt: 5 }}>
        <form onSubmit={handleSubmit(OnSubmit)}>
          <Stack spacing={3}>
            <TextField
              {...register('judul', { required: 'Judul Lengkap is required' })}
              autoFocus
              required
              margin="dense"
              id="nama"
              label="Judul Dokumentasi"
              type="text"
              fullWidth
              variant="outlined"
            />
            <TextField
              {...register('keterangan_dokumentasi', { required: 'keterangan is required' })}
              margin="dense"
              id="keterangan"
              label="keterangan"
              type="text"
              fullWidth
              variant="outlined"
            />
            <TextField
              {...register('tanggal_upload', { required: 'tanggal_upload is required' })}
              margin="dense"
              id="jurusan"
              label="Tanggal Upload"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              variant="outlined"
            />
            <TextField
              {...register('link_gdrive', { required: 'link_gdrive is required' })}
              margin="dense"
              id="link_gdrive"
              label="Link Gdrive"
              type="text"
              fullWidth
              variant="outlined"
            />
            <Box sx={{ display: 'flex', gap: 2, py: 2 }}>
              <Button type="submit" variant="contained">
                Submit
              </Button>
              <Link to={router.dokumentasi.list}>
                <Button type="submit" variant="outlined">
                  Kembali
                </Button>
              </Link>
            </Box>
          </Stack>
        </form>
      </Box>
    </Container>
  );
}
