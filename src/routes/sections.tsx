import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { varAlpha } from 'src/theme/styles';
import { AuthLayout } from 'src/layouts/auth';
import { DashboardLayout } from 'src/layouts/dashboard';
import { useQuery } from '@tanstack/react-query';
import axiosInstance, { endpoints } from 'src/utils/axios';
import { MentoringView } from 'src/sections/mentoring/view/mentoring-view';
import CreateView from 'src/sections/mentoring/crud/CreateView';

// ----------------------------------------------------------------------

export const HomePage = lazy(() => import('src/pages/home'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const MentoringPage = lazy(() => import('src/pages/mentoring'));
export const DokumentasiPage = lazy(() => import('src/pages/dokumentasi'));
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
        {
          path: 'mentoring',
          children: [
            {
              path: '',
              element: <MentoringPage />,
            },
            {
              path: 'create',
              element: <CreateView />,
            },
          ],
        },
        {
          path: 'dokumentasi',
          children: [
            {
              path: '',
              element: <DokumentasiPage />,
            },
            {
              path: 'create',
              element: <CreateView />,
            },
          ],
        },
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
