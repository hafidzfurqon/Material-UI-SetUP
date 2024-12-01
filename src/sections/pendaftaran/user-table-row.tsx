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
import { useMutationDeleteUser } from 'src/hooks/users';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { error } from 'src/hooks/error';
import { useMutationDeletePendaftar } from 'src/hooks/pendaftar/useMutationDeletePendaftar';

// ----------------------------------------------------------------------

export type UserProps = {
  id: any;
  nama: string;
  motto_hidup: string;
  kelas: string;
  alasan_masuk: string;
  image: string;
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

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutationDeletePendaftar({
    onSuccess: () => {
      toast.success('User Berhasil Dihapus');
      queryClient.invalidateQueries({ queryKey: ['fetch.pendaftar'] });
      setOpen(false);
    },
    onError: (err: error) => {
      toast.error(err.message);
    },
  });

  const handleSubmit = () => {
    mutate(row.id);
  };

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

        <TableCell>
          {/* <Label color={row.status === 'Offline' ? 'error' : 'success'}>{row.status}</Label> */}
          {row.motto_hidup}
        </TableCell>
        <TableCell>
          {/* <Label color={row.status === 'Offline' ? 'error' : 'success'}>{row.status}</Label> */}
          {row.alasan_masuk}
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
          <MenuItem onClick={handleClosePopover}>
            <Iconify icon="solar:pen-bold" />
            Edit
          </MenuItem>

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
