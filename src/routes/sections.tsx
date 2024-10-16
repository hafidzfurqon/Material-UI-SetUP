import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { varAlpha } from 'src/theme/styles';
import { AuthLayout } from 'src/layouts/auth';
import { DashboardLayout } from 'src/layouts/dashboard';
import { useQuery } from '@tanstack/react-query';
import axiosInstance, { endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

export const HomePage = lazy(() => import('src/pages/home'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const SignInPage = lazy(() => import('src/pages/sign-in'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const Landing = lazy(() => import('src/pages/landing'));
export const CreateViewUser = lazy(() => import('src/sections/user/crud/CreateUserView'));

// ----------------------------------------------------------------------
export type Users = {
  id: number;
  email: string;
  nama: string;
  divisi?: string;
  image?: string;
  kelas?: string;
  jurusan?: string;
  status?: string;
};

const renderFallback = (
  <Box display="flex" alignItems="center" justifyContent="center" flex="1 1 auto">
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
      }}
    />
  </Box>
);

export function Router() {
  const userId = sessionStorage.getItem('user_id');
  const { data: authUser } = useQuery({
    queryKey: ['usersData'],
    queryFn: async () => {
      const res = await axiosInstance.get(`${endpoints.auth.me}/${userId}`);
      return res.data.data;
    },
  });
  return useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense fallback={renderFallback}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        {
          path: 'dashboard',
          element: <HomePage />,
        },
        {
          path: 'user',
          children: [
            {
              path: '',
              element: <UserPage />,
            },
            {
              path: 'create',
              element: <CreateViewUser />,
            },
          ],
        },
        {
          path: 'products',
          element: <ProductsPage />,
        },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      element: (
        <Suspense fallback={renderFallback}>
          <Landing />
        </Suspense>
      ),
      path: '/',
    },
    {
      path: 'sign-in',
      element: (
        <AuthLayout>
          <SignInPage />
        </AuthLayout>
      ),
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}
