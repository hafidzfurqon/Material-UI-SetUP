import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { PendaftaranView } from 'src/sections/pendaftaran/view';


// ----------------------------------------------------------------------

export default function PendaftaranPage() {
  return (
    <>
      <Helmet>
        <title> {`Pendaftar - ${CONFIG.appName}`}</title>
      </Helmet>

      <PendaftaranView />
    </>
  );
}
