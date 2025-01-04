import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { fDate } from 'src/utils/format-time';
import { MenuItem, menuItemClasses, MenuList, Popover, Typography } from '@mui/material';
import { Iconify } from 'src/components/iconify';
import { useCallback, useState } from 'react';

// ----------------------------------------------------------------------

export type ProductItemProps = {
  id: any;
  judul: string;
  image: string;
  deskripsi: string;
  tanggal_kegiatan: string;
};

export function ProductItem({ kegiatan }: { kegiatan: ProductItemProps }) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);
  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);
  const renderImg = (
    <Box
      component="img"
      alt={kegiatan.judul}
      src={kegiatan.image}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
  );

  const renderPrice = (
    <></>
    // <Typography variant="subtitle1">
    //   <Typography
    //     component="span"
    //     variant="body1"
    //     sx={{
    //       color: 'text.disabled',
    //       textDecoration: 'line-through',
    //     }}
    //   >
    //     {product.priceSale && fCurrency(product.priceSale)}
    //   </Typography>
    //   &nbsp;
    //   {fCurrency(product.price)}
    // </Typography>
  );

  return (
    <>
      <Card>
        <Box sx={{ pt: '100%', position: 'relative' }}>
          {/* {product.status && renderStatus} */}

          {renderImg}
        </Box>

        <Stack spacing={2} sx={{ p: 3 }}>
          <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
            {kegiatan.judul}
          </Link>
          <Box sx={{ color: 'inherit' }}>{kegiatan.deskripsi}</Box>
          <Typography
            component="span"
            variant="body1"
            sx={{
              color: 'text.disabled',
            }}
          >
            {fDate(kegiatan.tanggal_kegiatan)}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Box
              component="button"
              sx={{ display: 'flex', gap: 1, alignItems: 'center', cursor: 'pointer' }}
            >
              <Iconify width={16} icon="solar:eye-bold" sx={{ mr: 0.5 }} />
              <Typography sx={{ mr: 2 }}>Lihat</Typography>
            </Box>
            <Box
              component="button"
              sx={{ display: 'flex', gap: 1, alignItems: 'center', cursor: 'pointer' }}
            >
              <Iconify width={16} icon="solar:pen-bold" sx={{ mr: 0.5 }} />
              <Typography sx={{ mr: 2 }}>Edit</Typography>
            </Box>
          </Box>
        </Stack>
      </Card>
    </>
  );
}
