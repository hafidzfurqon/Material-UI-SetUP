// Import statements

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { RouterLink } from 'src/routes/components';
import { Grid } from '@mui/material';
// import Grid from '@mui/system/Unstable_Grid/Grid';

const LINKS = [
  {
    headline: 'Rodamu',
    children: [{ name: 'About us' }, { name: 'Contact us' }, { name: 'FAQs' }],
  },
  {
    headline: 'Legal',
    children: [{ name: 'Terms and Condition' }, { name: 'Privacy Policy' }],
  },
  {
    headline: 'CONTACT',
    children: [{ name: 'rodamu@gmail.com' }],
  },
];

export default function Footer() {
  const mainFooter = (
    <Box
      component="footer"
      sx={{
        position: 'relative',
        bgcolor: '#fff',
        width: '100%',
      }}
    >
      <Divider />

      <Container
        sx={{
          pt: 5,
          pb: 5,
          textAlign: { xs: 'center', md: 'unset' },
        }}
      >
        <Box />

        <Grid
          container
          spacing={3}
          justifyContent={{
            xs: 'center',
            md: 'space-between',
          }}
        >
          <Grid
            item
            xs={12}
            md={3}
            sx={{ textAlign: { xs: 'center', md: 'left' }, mb: { xs: 3, md: 0 } }}
          >
            <Typography
              variant="body2"
              sx={{
                maxWidth: 270,
                mx: { xs: 'auto', md: 'unset' },
              }}
            >
              Menjadi barisan kuat untuk berdakwah, menjadi perisai kuat untuk islam, dan jadikan
              ikatan keislaman ini sebagai pondasi pada diri pribadi untuk men-Tauhidkan Agama
              Allah💪🏻🕌. Bismillah, Hamasah, for Lillah.
            </Typography>

            <Stack
              direction="row"
              justifyContent={{ xs: 'center', md: 'flex-start' }}
              sx={{
                mt: 3,
                mb: { xs: 5, md: 0 },
              }}
            >
              {/* {_socials.map((social) => (
                <IconButton
                  key={social.name}
                  sx={{
                    '&:hover': {
                      bgcolor: alpha(social.color, 0.08),
                    },
                  }}
                >
                  <Iconify color={social.color} icon={social.icon} />
                </IconButton>
              ))} */}
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack
              spacing={5}
              direction={{ xs: 'column', md: 'row' }}
              alignItems={{ xs: 'center', md: 'flex-start' }}
            >
              {LINKS.map((list) => (
                <Stack
                  key={list.headline}
                  spacing={2}
                  alignItems={{ xs: 'center', md: 'flex-start' }}
                  sx={{ width: 1 }}
                >
                  <Typography component="div" variant="overline">
                    {list.headline}
                  </Typography>

                  {list.children.map((link) => (
                    <Link
                      key={link.name}
                      component={RouterLink}
                      href={link.href}
                      color="inherit"
                      variant="body2"
                    >
                      {link.name}
                    </Link>
                  ))}
                </Stack>
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Typography variant="body2" sx={{ mt: 5, textAlign: 'center' }}>
          Copyright © 2024. Hak Cipta Dilindungi. Rohis Darul Muttaqein
        </Typography>
      </Container>
    </Box>
  );

  return mainFooter;
}
