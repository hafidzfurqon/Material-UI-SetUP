import type { TableRowProps } from '@mui/material/TableRow';

import Box from '@mui/material/Box';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

type TableNoDataProps = TableRowProps & {
  searchQuery: string;
};

export function TableNoData({ searchQuery, ...other }: TableNoDataProps) {
  return (
    <TableRow {...other}>
      <TableCell align="center" colSpan={7}>
        <Box sx={{ py: 15, textAlign: 'center' }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Not found
          </Typography>

          <Typography variant="body2">
            Tidak ada user dengan nama &nbsp;
            <strong>&quot;{searchQuery}&quot;</strong>.
            <br /> Mungkin ada typo atau kata yang salah cobalah lagi.
          </Typography>
        </Box>
      </TableCell>
    </TableRow>
  );
}
