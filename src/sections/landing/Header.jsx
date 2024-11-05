import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Stack,
  useMediaQuery,
  Menu,
  MenuItem,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

import { useState } from 'react';
import image from '../../../public/assets/images/Logo_rohis.png';

export default function Header() {
  const isMobile = useMediaQuery('(max-width:600px)');
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#16a34a' }}>
      <Toolbar>
        <IconButton size="large" aria-label="logo" edge="start" color="inherit">
          <img src={image} alt="" width={50} />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
          }}
        >
          RODAMU
        </Typography>

        {isMobile ? (
          <>
            <Link to="/sign-in">
              <Button size="small" variant="outlined" sx={{ bgcolor: 'white', color: 'black' }}>
                Login
              </Button>
            </Link>
            <IconButton size="large" edge="end" color="inherit" onClick={handleMenuClick}>
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              PaperProps={{
                style: {
                  backgroundColor: '#16a34a',
                  color: 'white',
                },
              }}
            >
              <MenuItem onClick={handleClose}>
                <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
                  Home
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link to="/about" style={{ color: 'white', textDecoration: 'none' }}>
                  About Us
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link to="/gallery" style={{ color: 'white', textDecoration: 'none' }}>
                  Gallery
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link to="/faq" style={{ color: 'white', textDecoration: 'none' }}>
                  FAQ&rsquo;s
                </Link>
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Stack
            direction="row"
            spacing={2}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
              Home
            </Link>
            <Link to="/about" style={{ color: 'white', textDecoration: 'none' }}>
              About Us
            </Link>
            <Link to="/gallery" style={{ color: 'white', textDecoration: 'none' }}>
              Gallery
            </Link>
            <Link to="/faq" style={{ color: 'white', textDecoration: 'none' }}>
              FAQ&rsquo;s
            </Link>
            <Link to="/sign-in">
              <Button
                size="small"
                variant="outlined"
                sx={{
                  bgcolor: 'white',
                  color: 'black',
                  '&:hover': {
                    bgcolor: '#4d7c0f',
                  },
                }}
              >
                Login
              </Button>
            </Link>
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
}
