import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { Dokumentasi } from 'src/sections/dokumentasi/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Dokumentasi - ${CONFIG.appName}`}</title>
      </Helmet>

      <Dokumentasi />
    </>
  );
}
