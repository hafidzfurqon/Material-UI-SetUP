import { Container, FormLabel, MenuItem, Select, Stack, TextField, Button, Typography } from '@mui/material';
import { Box } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { router } from 'src/hooks/routing/useRouting';
import { useMutationCreateUsers } from 'src/hooks/users/useMutationCreateUsers';
import { useRouter } from 'src/routes/hooks';

const CreateUserView = () => {
  const Router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutationCreateUsers({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allUsers'] });
      toast.success('User berhasil di tambah');
      Router.back('/user');
    },
  });

  const onSubmit = (data) => {
    const { nama, kelas, jurusan, divisi, email, password, password_confirmation, roles, image } =
      data;
    const formData = new FormData();
    formData.append('nama', nama);
    formData.append('kelas', kelas);
    formData.append('roles', roles);
    formData.append('jurusan', jurusan);
    formData.append('divisi', divisi);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('password_confirmation', password_confirmation);
    formData.append('image', image[0]);
    mutate(formData);
  };

  return (
    <Container>
      <Typography variant='h4'>Tambah User baru disini</Typography>
      <Box sx={{ mt: 5 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <TextField
              {...register('nama', { required: 'Nama Lengkap is required' })}
              autoFocus
              required
              margin="dense"
              id="nama"
              label="Nama Lengkap"
              type="text"
              fullWidth
              variant="outlined"
              error={!!errors.nama}
              helperText={errors.nama?.message}
            />
            <TextField
              {...register('kelas', { required: 'Kelas is required' })}
              margin="dense"
              id="kelas"
              label="Kelas (12)"
              type="number"
              fullWidth
              variant="outlined"
              error={!!errors.kelas}
              helperText={errors.kelas?.message}
            />
            <TextField
              {...register('jurusan', { required: 'Jurusan is required' })}
              margin="dense"
              id="jurusan"
              label="Jurusan (PPLG)"
              type="text"
              fullWidth
              variant="outlined"
              error={!!errors.jurusan}
              helperText={errors.jurusan?.message}
            />
            <TextField
              {...register('divisi', { required: 'Divisi is required' })}
              margin="dense"
              id="divisi"
              label="Divisi (PSDM)"
              type="text"
              fullWidth
              variant="outlined"
              error={!!errors.divisi}
              helperText={errors.divisi?.message}
            />
            <TextField
              {...register('email', { required: 'Email is required' })}
              margin="dense"
              id="email"
              label="Email (example@gmail.com)"
              type="email"
              fullWidth
              variant="outlined"
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              {...register('password', { required: 'Password is required' })}
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <TextField
              {...register('password_confirmation', {
                required: 'Password confirmation is required',
              })}
              margin="dense"
              id="password_confirmation"
              label="Konfirmasi Password"
              type="password"
              fullWidth
              variant="outlined"
              error={!!errors.password_confirmation}
              helperText={errors.password_confirmation?.message}
            />
            <FormLabel>
              Image
              <TextField
                {...register('image', { required: 'Image is required' })}
                margin="dense"
                id="image"
                type="file"
                fullWidth
                variant="outlined"
                error={!!errors.image}
                helperText={errors.image?.message}
              />
            </FormLabel>
            <FormLabel>
              Role
              <Select
                {...register('roles', { required: 'Role is required' })}
                margin="dense"
                id="roles"
                fullWidth
                defaultValue="" // Ensure a value is selected to avoid uncontrolled component warnings
                error={!!errors.roles}
              >
                <MenuItem value="pembina">Pembina</MenuItem>
                <MenuItem value="mentor">Mentor</MenuItem>
                <MenuItem value="alumni">Alumni</MenuItem>
              </Select>
            </FormLabel>
            <Box sx={{ display: 'flex', gap: 2, py: 2 }}>
              <Button type="submit" variant="contained" disabled={isPending}>
                Submit
              </Button>
              <Link to={router.users.list}>
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
};

export default CreateUserView;
