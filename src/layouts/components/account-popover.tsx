import type { IconButtonProps } from '@mui/material/IconButton';

import { useState, useCallback, useContext } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';

import { useRouter, usePathname } from 'src/routes/hooks';

import { _myAccount } from 'src/_mock';
import { useMutationLogout } from './useMutationLogout';
import toast from 'react-hot-toast';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Users } from 'src/routes/sections';
import DialogDelete from 'src/component/DialogDelete';
import { UserContext } from 'src/context/user-context';

// ----------------------------------------------------------------------

export type AccountPopoverProps = IconButtonProps & {
  data?: {
    label: string;
    href: string;
    icon?: React.ReactNode;
    info?: React.ReactNode;
  }[];
};

type error = {
  message: string;
};
type Userss = Users;
export function AccountPopover({ data = [], sx, ...other }: AccountPopoverProps) {
  const [open, setOpen] = useState(false);
  const handleClickOpened = () => {
    setOpen(true);
  };
  const router = useRouter();
  const queryClient = useQueryClient();
  const authUser: any = useContext(UserContext);
  const { mutate: Logout, isPending } = useMutationLogout({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usersData'] });
      toast.success('Logout Berhasil 🚀', {
        duration: 2000,
      });
      router.push('/');
    },
    onError: (error: error) => {
      toast.error(error.message);
    },
  });
  // console.log(authUser.user.email);
  const handleLogout = () => {
    Logout();
    return;
  };

  console.log(authUser);

  const pathname = usePathname();

  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  const handleClickItem = useCallback(
    (path: string) => {
      handleClosePopover();
      router.push(path);
    },
    [handleClosePopover, router]
  );

  if (!authUser) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <IconButton
        onClick={handleOpenPopover}
        sx={{
          p: '2px',
          width: 40,
          height: 40,
          background: (theme) =>
            `conic-gradient(${theme.vars.palette.primary.light}, ${theme.vars.palette.warning.light}, ${theme.vars.palette.primary.light})`,
          ...sx,
        }}
        {...other}
      >
        {authUser ? (
          <Avatar
            src={authUser.user.image}
            alt={_myAccount.displayName}
            sx={{ width: 1, height: 1 }}
          >
            {_myAccount.displayName.charAt(0).toUpperCase()}
          </Avatar>
        ) : (
          'Loading...'
        )}
      </IconButton>

      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: { width: 200 },
          },
        }}
      >
        <Box sx={{ p: 2, py: 1.5 }}>
          {authUser ? (
            <>
              <Typography variant="subtitle2" noWrap>
                {authUser?.user.nama}
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                {authUser?.user.email}
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                {authUser?.user.kelas}
              </Typography>
            </>
          ) : (
            <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
              Loading...
            </Typography>
          )}
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuList
          disablePadding
          sx={{
            p: 1,
            gap: 0.5,
            display: 'flex',
            flexDirection: 'column',
            [`& .${menuItemClasses.root}`]: {
              px: 1,
              gap: 2,
              borderRadius: 0.75,
              color: 'text.secondary',
              '&:hover': { color: 'text.primary' },
              [`&.${menuItemClasses.selected}`]: {
                color: 'text.primary',
                bgcolor: 'action.selected',
                fontWeight: 'fontWeightSemiBold',
              },
            },
          }}
        >
          {data.map((option) => (
            <MenuItem
              key={option.label}
              selected={option.href === pathname}
              onClick={() => handleClickItem(option.href)}
            >
              {option.icon}
              {option.label}
            </MenuItem>
          ))}
        </MenuList>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ p: 1 }}>
          <Button
            onClick={handleClickOpened}
            fullWidth
            color="error"
            size="medium"
            variant="text"
            disabled={isPending}
          >
            Logout
          </Button>
          <DialogDelete
            title="Apakah anda yakin akan Logout?"
            description="Anda akan keluar dari dashboard"
            setOpen={setOpen}
            open={open}
            Submit={handleLogout}
            pending={isPending}
          />
        </Box>
      </Popover>
    </>
  );
}
