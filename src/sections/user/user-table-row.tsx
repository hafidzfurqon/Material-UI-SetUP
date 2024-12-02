import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuList from '@mui/material/MenuList';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';

import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';
import DialogDelete from 'src/component/DialogDelete';
import { useMutationDeleteUser, useMutationUpdateUser } from 'src/hooks/users';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { error } from 'src/hooks/error';
import { useForm } from 'react-hook-form';
import { UpdateDialog } from 'src/component/DialogUpdate';
import { FormLabel, TextField } from '@mui/material';
import { Select } from '@mui/material';

// ----------------------------------------------------------------------

export type UserProps = {
  id: any;
  name: string;
  nama: string;
  email: string;
  roles: { name: string }[];
  status: string;
  image: string;
  isVerified: boolean;
  divisi: string;
  password: string;
  password_confirmation: string;
  kelas: string;
  jurusan: string;
  last_online_at?: string;
};

type UserTableRowProps = {
  row: UserProps;
  selected: boolean;
  onSelectRow: () => void;
};

export function UserTableRow({ row, selected, onSelectRow }: UserTableRowProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  const roleOrder = [
    'pembina',
    'mentor',
    'alumni',
    'bph',
    'pengurus_kegiatan',
    'pengurus_dokumentasi',
    'pengurus_rohis',
  ];

  const formatRoleName = (role: string) => {
    return role
      .replace(/_/g, ' ') // Ganti underscore dengan spasi
      .split(' ') // Pisahkan berdasarkan spasi
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Kapital huruf pertama setiap kata
      .join(' '); // Gabungkan kembali menjadi string
  };

  const defaultValues = {
    nama: row?.nama || '',
    divisi: row?.divisi || '',
    jurusan: row?.jurusan || '',
    kelas: row?.kelas || '',
    roles: row?.roles || '',
    email: row?.email || '',
    password: row?.password || '',
    password_confirmation: row?.password_confirmation || '',
  };
  const [opened, setOpened] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClickOpened = () => {
    setOpened(true);
  };

  const { register, handleSubmit: submitEdit } = useForm({
    defaultValues,
  });

  const handleClose = () => {
    setOpened(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutationDeleteUser({
    onSuccess: () => {
      toast.success('User Berhasil Dihapus');
      queryClient.invalidateQueries({ queryKey: ['allUsers'] });
      setOpen(false);
    },
    onError: (err: error) => {
      toast.error(err.message);
    },
  });

  const handleSubmit = () => {
    mutate(row.id);
  };

  const { mutate: UpdateUser, isPending: loadingUpdate } = useMutationUpdateUser(
    {
      onSuccess: () => {
        toast.success('Dokumentasi Berhasil Diupdate');
        queryClient.invalidateQueries({ queryKey: ['dokumentasi'] });
        setOpen(false);
      },
      onError: (err: error) => {
        toast.error(err.message);
      },
    },
    row.id
  );
  const handleEdit = (data: any) => {
    UpdateUser(data);
    handleClose();
  };
  const FieldRHF = (
    <>
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
      />
      <TextField
        {...register('kelas', { required: 'Kelas is required' })}
        margin="dense"
        id="kelas"
        label="Kelas (12)"
        type="number"
        fullWidth
        variant="outlined"
      />
      <TextField
        {...register('jurusan', { required: 'Jurusan is required' })}
        margin="dense"
        id="jurusan"
        label="Jurusan (PPLG)"
        type="text"
        fullWidth
        variant="outlined"
      />
      <TextField
        {...register('divisi', { required: 'Divisi is required' })}
        margin="dense"
        id="divisi"
        label="Divisi (PSDM)"
        type="text"
        fullWidth
        variant="outlined"
      />
      <TextField
        {...register('email')}
        margin="dense"
        id="email"
        label="Email (example@gmail.com)"
        type="email"
        fullWidth
        variant="outlined"
      />
      <TextField
        {...register('password', { required: 'Password is required' })}
        margin="dense"
        id="password"
        label="Password"
        type="password"
        fullWidth
        variant="outlined"
      />
      <TextField
        {...register('password_confirmation', {
          required: 'Password confirmation is required',
        })}
        margin="dense"
        name="password_confirmation"
        label="Konfirmasi Password"
        type="password"
        fullWidth
        variant="outlined"
      />
      <FormLabel>
        Role
        <Select
          {...register('roles', { required: 'Role is required' })}
          margin="dense"
          id="roles"
          fullWidth
          defaultValue={row.roles}
        >
          <MenuItem value="pembina">Pembina</MenuItem>
          <MenuItem value="mentor">Mentor</MenuItem>
          <MenuItem value="alumni">Alumni</MenuItem>
          <MenuItem value="bph">BPH</MenuItem>
          <MenuItem value="pengurus_kegiatan">Pengurus Kegiatan</MenuItem>
          <MenuItem value="pengurus_dokumentasi">Pengurus Dokumentasi</MenuItem>
          <MenuItem value="pengurus_rohis">Pengurus Rohis</MenuItem>
        </Select>
      </FormLabel>
    </>
  );
  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
        </TableCell>

        <TableCell component="th" scope="row">
          <Box gap={2} display="flex" alignItems="center">
            <Avatar alt={row.nama} src={row.image} />
            {row.nama}
          </Box>
        </TableCell>

        <TableCell>{row.kelas}</TableCell>

        <TableCell>{row.jurusan}</TableCell>

        <TableCell>{row.divisi}</TableCell>

        <TableCell align="center">
          {roleOrder
            .map((role) => {
              const foundRole = row.roles.find((nama: any) => nama.name === role);
              return foundRole ? formatRoleName(foundRole.name) : null;
            })
            .filter(Boolean)
            .join(', ')}
        </TableCell>

        <TableCell>
          <Label color={row.status === 'Offline' ? 'error' : 'success'}>{row.status}</Label>
        </TableCell>

        <TableCell>
          {row.status === 'Offline' && row.last_online_at ? (
            <div>
              {`${formatDistanceToNow(new Date(row.last_online_at), {
                addSuffix: true,
                locale: id,
              })}`}
            </div>
          ) : (
            <Box>Not Found</Box>
          )}
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuList
          disablePadding
          sx={{
            p: 0.5,
            gap: 0.5,
            width: 140,
            display: 'flex',
            flexDirection: 'column',
            [`& .${menuItemClasses.root}`]: {
              px: 1,
              gap: 2,
              borderRadius: 0.75,
              [`&.${menuItemClasses.selected}`]: { bgcolor: 'action.selected' },
            },
          }}
        >
          <MenuItem onClick={handleClickOpened}>
            <Iconify icon="solar:pen-bold" />
            Edit
          </MenuItem>
          <UpdateDialog
            SubmitForm={submitEdit}
            SubmitFormValue={handleEdit}
            open={opened}
            title="Update User"
            subTitle=" Update User ini Untuk menghilangkan salah ketik ataupun yang lainnya."
            pending={loadingUpdate}
            setOpen={setOpened}
            field={FieldRHF}
          />
          <MenuItem onClick={handleClickOpen} sx={{ color: 'error.main' }}>
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>
          <DialogDelete
            title="Apakah anda yakin akan hapus"
            description="data yang telah di hapus tidak akan kembali"
            setOpen={setOpen}
            open={open}
            Submit={handleSubmit}
            pending={isPending}
          />
        </MenuList>
      </Popover>
    </>
  );
}
