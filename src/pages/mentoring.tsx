import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { MentoringView } from 'src/sections/mentoring/view/mentoring-view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Mentoring - ${CONFIG.appName}`}</title>
      </Helmet>

      <MentoringView />
    </>
  );
}
