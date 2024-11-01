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
import { fDate } from 'src/utils/format-time';

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

export function UserTableRow({ row, selected, onSelectRow }: DokumentasTableRowProps) {
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
          <MenuItem onClick={handleClosePopover}>
            <Iconify icon="solar:pen-bold" />
            Edit
          </MenuItem>

          <MenuItem onClick={handleClosePopover} sx={{ color: 'error.main' }}>
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  );
}
