import { Typography, Box, Container, Grid, Button, ImageListItem, ImageList } from '@mui/material';
import Footer from './footer';
import Header from './Header';
import image from '../../../public/assets/images/Banner pendaftaran Rohis.jpg';
import Backgrounds from '../../../public/assets/images/Background-Rohis.png';
import image2 from '../../../public/assets/images/rohis-3.jpg';
import { useFetchKegiatan } from 'src/hooks/kegiatan';

export function LandingPage() {
  const { data, isLoading, isFetching } = useFetchKegiatan();
  const itemData = [
    {
      img: '/assets/images/Banner pendaftaran Rohis.jpg',
      title: 'Breakfast',
    },
    {
      img: '/assets/images/Banner pendaftaran Rohis.jpg',
      title: 'Sea star',
    },
    {
      img: '/assets/images/Banner pendaftaran Rohis.jpg',
      title: 'Bike',
    },
  ];
  return (
    <Box>
      <Header />
      {/* Hero Page */}
      <Box
        sx={{
          position: 'relative',
          bgcolor: '#fff',
          width: '100%',
        }}
      >
        <Container
          sx={{
            pt: 5,
            pb: 5,
            textAlign: { xs: 'center', md: 'unset' },
          }}
        >
          <Grid
            container
            spacing={3}
            justifyContent={{
              xs: 'center',
              md: 'space-between',
            }}
            alignItems="center" // memastikan konten sejajar vertikal di tengah
          >
            <Grid
              item
              xs={12}
              md={6}
              sx={{ textAlign: { xs: 'center', md: 'left' }, mb: { xs: 3, md: 0 } }}
            >
              <Typography
                variant="h3"
                sx={{
                  mt: 3,
                  fontSize: { xs: '2rem', md: '2.5rem' }, // atur ukuran font responsif
                }}
              >
                Selamat Datang Di Ekstrakulikuler Rohis Darul Muttaqein
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mt: 3,
                  maxWidth: { xs: '100%', md: '500px' }, // batas lebar responsif
                  mx: { xs: 'auto', md: 'unset' },
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit quia soluta
                eaque, voluptatibus. eaque, voluptatibus. eaque, voluptatibus. eaque, voluptatibus.
                eaque, voluptatibus.
              </Typography>
              <Box
                sx={{
                  mt: 3,
                  display: 'flex',
                  gap: 2,
                  justifyContent: { xs: 'center', md: 'flex-start' }, // penyesuaian alignment
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: '#16a34a',
                    '&:hover': {
                      bgcolor: '#4d7c0f',
                    },
                  }}
                >
                  Daftar
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    color: '#16a34a',
                    '&:hover': {
                      bgcolor: '#4d7c0f',
                      color: '#fff',
                    },
                  }}
                >
                  Lebih Lanjut
                </Button>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src={image}
                alt="hello"
                sx={{
                  width: '100%', // gambar responsif, lebar 100% dari grid
                  maxWidth: { xs: '100%', md: '500px' }, // batas maksimal lebar
                  borderRadius: 2,
                  mx: 'auto',
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
      {/* About Page */}
      <Box
        sx={{
          my: { xs: 5, md: 14 },
          backgroundImage: `url(${Backgrounds})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Container
          sx={{
            pt: 5,
            pb: 5,
            textAlign: { xs: 'center', md: 'unset' },
          }}
        >
          <Typography
            variant="h3"
            sx={{
              mt: 3,
              textAlign: 'center',
              mb: { xs: 3, md: 8 },
              color: '#fff',
              fontSize: { xs: '2rem', md: '2.5rem' }, // atur ukuran font responsif
            }}
          >
            About Us
          </Typography>
          <Grid
            container
            spacing={3}
            flexDirection={{
              md: 'row-reverse',
            }}
            justifyContent={{
              xs: 'center',
              md: 'space-between',
            }}
            alignItems="center" // memastikan konten sejajar vertikal di tengah
          >
            <Grid
              item
              xs={12}
              md={6}
              sx={{ textAlign: { xs: 'center', md: 'left' }, mb: { xs: 3, md: 0 } }}
            >
              <Typography
                // variant="h3"
                sx={{
                  mt: 3,
                  color: '#fff',
                  fontSize: { xs: '1rem', md: '1.5rem' }, // atur ukuran font responsif
                }}
              >
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti tempora provident
                aperiam amet sequi natus modi inventore ex quo est impedit, eligendi architecto
                ipsam qui quidem, consequuntur neque maxime similique! Lorem ipsum dolor, sit amet
                consectetur adipisicing elit. Suscipit velit repellendus laboriosam consequuntur
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src={image2}
                alt="hello"
                sx={{
                  width: '100%', // gambar responsif, lebar 100% dari grid
                  maxWidth: { xs: '100%', md: '500px' }, // batas maksimal lebar
                  borderRadius: 2,
                  mx: 'auto',
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* <Container
        sx={{
          pt: 5,
          pb: 5,
          textAlign: { xs: 'center', md: 'unset' },
        }}
      >
        <Typography
          variant="h3"
          sx={{
            mt: 3,
            textAlign: 'center',
            mb: { xs: 3, md: 8 },
            // color: '#fff',
            fontSize: { xs: '2rem', md: '2.5rem' }, // atur ukuran font responsif
          }}
        >
          Kegiatan
        </Typography>
      </Container> */}
      <Container
        sx={{
          pt: 5,
          pb: 5,
          textAlign: { xs: 'center', md: 'unset' },
        }}
      >
        <Typography
          variant="h3"
          sx={{
            mt: 3,
            textAlign: 'center',
            mb: { xs: 3, md: 8 },
            // color: '#fff',
            fontSize: { xs: '2rem', md: '2.5rem' }, // atur ukuran font responsif
          }}
        >
          Gallery
        </Typography>
        <Grid container gap={3} justifyContent={{ xs: 'center' }}>
          {itemData.map((img) => (
            <Box
              key={img.title}
              component="img"
              sx={{
                borderRadius: 1,
                height: 222,
                width: 350,
                maxHeight: { xs: 233, md: 233 },
                maxWidth: { xs: 350, md: 350 },
              }}
              alt="The house from the offer."
              src={`${img.img}`}
            />
          ))}
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
}
