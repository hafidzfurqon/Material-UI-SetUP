import 'src/global.css';

import { Router } from 'src/routes/sections';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import { ThemeProvider } from 'src/theme/theme-provider';

import { Toaster } from 'react-hot-toast';
import { UserContext, UserProvider } from './context/user-context';
import Loading from './component/Loading';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();


  return (
    <ThemeProvider>
      <UserProvider>
        <Router />
        {/* {githubButton} */}
        <Toaster position="top-right" />
      </UserProvider>
    </ThemeProvider>
  );
}
