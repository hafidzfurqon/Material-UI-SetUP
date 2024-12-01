import 'src/global.css';

import Fab from '@mui/material/Fab';

import { Router } from 'src/routes/sections';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import { ThemeProvider } from 'src/theme/theme-provider';

import { Iconify } from 'src/components/iconify';
import { Toaster } from 'react-hot-toast';
import { UserContext } from './context/user-context';
import { useFetchAuthenticUsers } from './hooks/kegiatan';
import Loading from './component/Loading';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();
  const { data, isLoading, isPending } = useFetchAuthenticUsers();
  if (isLoading || isPending) {
    return <Loading />;
  }
  const user = isLoading ? null : data;

  const UserContextValue = {
    user,
  };
  return (
    <ThemeProvider>
      <UserContext.Provider value={UserContextValue}>
        <Router />
        {/* {githubButton} */}
        <Toaster position="top-right" />
      </UserContext.Provider>
    </ThemeProvider>
  );
}
