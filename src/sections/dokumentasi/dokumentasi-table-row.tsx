import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuList from '@mui/material/MenuList';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';

import { Iconify } from 'src/components/iconify';

import { fDate } from 'src/utils/format-time';
import { useQueryClient } from '@tanstack/react-query';
import { useDeleteDokumentasi } from 'src/hooks/dokumentasi/useDeleteDokumentasi';
import toast from 'react-hot-toast';
import { error } from 'src/hooks/error';
import DialogDelete from 'src/component/DialogDelete';
import { Dialog, DialogContent, Stack } from '@mui/material';
import { DialogTitle } from '@mui/material';
import { DialogContentText } from '@mui/material';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { DialogActions } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useUpdateDokumentasi } from 'src/hooks/dokumentasi/useUpdateDokumentasi';
// ----------------------------------------------------------------------

export type DokumentasiProps = {
  id: any;
  judul: string;
  keterangan_dokumentasi: string;
  tanggal_upload: string;
  link_gdrive: string;
};

type DokumentasTableRowProps = {
  row: DokumentasiProps;
  selected: boolean;
  onSelectRow: () => void;
};

export function DokumentasiTableRow({ row, selected, onSelectRow }: DokumentasTableRowProps) {
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
  const [opened, setOpened] = useState(false);

  const handleClickOpened = () => {
    setOpened(true);
  };

  const { register, handleSubmit: submitEdit } = useForm();

  const handleClose = () => {
    setOpened(false);
  };

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const queryClient = useQueryClient();

  const { mutate: DeleteDokumentasi, isPending } = useDeleteDokumentasi({
    onSuccess: () => {
      toast.success('Dokumentasi Berhasil Dihapus');
      queryClient.invalidateQueries({ queryKey: ['dokumentasi'] });
      setOpen(false);
    },
    onError: (err: error) => {
      toast.error(err.message);
    },
  });

  const handleSubmit = () => {
    DeleteDokumentasi(row.id);
  };
  const { mutate, isPending: loadingUpdate } = useUpdateDokumentasi(row.id);
  const handleEdit = (data: any) => {
    mutate(data);
    handleClose();
  };
  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
        </TableCell>

        <TableCell component="th" scope="row">
          <Box gap={2} display="flex" alignItems="center">
            {row.judul}
          </Box>
        </TableCell>

        <TableCell>{row.keterangan_dokumentasi}</TableCell>

        <TableCell
          sx={{
            maxWidth: 50,
            overflowY: 'hidden',
          }}
        >
          {row.link_gdrive}
        </TableCell>

        <TableCell>{fDate(row.tanggal_upload)}</TableCell>

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
          <Dialog
            onSubmit={submitEdit(handleEdit)}
            open={opened}
            onClose={handleClose}
            PaperProps={{
              component: 'form',
            }}
          >
            <DialogTitle>Subscribe</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To subscribe to this website, please enter your email address here. We will send
                updates occasionally.
              </DialogContentText>
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
              </Stack>
            </DialogContent>
            <DialogActions
              sx={{
                px: 3,
                py: 3,
              }}
            >
              <Button onClick={handleClose} variant="outlined">
                Cancel
              </Button>
              <Button type="submit">Update</Button>
            </DialogActions>
          </Dialog>

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
