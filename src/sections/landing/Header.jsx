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
            <IconButton size="large" edge="end" color="inherit" onClick={handleMenuClick}>
              <MenuIcon />
            </IconButton>
            <Button variant="outlined" sx={{ bgcolor: 'ffffff' }}>
              Login
            </Button>
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
          <Stack direction="row" spacing={2}>
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
            <Link to="/sign-in" style={{ color: 'white', textDecoration: 'none' }}>
              Login
            </Link>
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
}
