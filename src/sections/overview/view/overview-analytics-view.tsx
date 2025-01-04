import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { _tasks, _posts, _timeline } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import { AnalyticsNews } from '../analytics-news';
import { AnalyticsOrderTimeline } from '../analytics-order-timeline';
import { AnalyticsWidgetSummary } from '../analytics-widget-summary';
import { useQuery } from '@tanstack/react-query';
import { Users } from 'src/routes/sections';
import { useFetchKegiatan } from 'src/hooks/kegiatan';
import Loading from 'src/component/Loading';
import { useFetchPendaftar } from 'src/hooks/pendaftar/useFetchPendaftar';
import { useFetchDokumentasi } from 'src/hooks/dokumentasi/useFetchDokumentasi';
import { SvgColor } from 'src/components/svg-color';
import { useFetchMentoring } from 'src/hooks/mentoring/useFetchMentoring';

// ----------------------------------------------------------------------
type User = Users;
export function OverviewAnalyticsView() {
  const { data: authUser } = useQuery<User>({ queryKey: ['usersData'] });
  const { data, isLoading, isFetching } = useFetchKegiatan();
  const {
    data: DataMentoring,
    isLoading: LoadingMentoring,
    isFetching: FetcingMentoring,
  } = useFetchMentoring();
  const {
    data: DataDocs,
    isLoading: loadingDocs,
    isFetching: fetchingDocs,
  } = useFetchDokumentasi();
  const { data: AllUser, isLoading: LoadingUser, isFetching: fetchingUser } = useFetchPendaftar();
  if (
    isLoading ||
    isFetching ||
    LoadingUser ||
    fetchingUser ||
    loadingDocs ||
    fetchingDocs ||
    LoadingMentoring ||
    FetcingMentoring
  ) {
    return <Loading />;
  }
  console.log(DataMentoring);
  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        Hi, Welcome back 👋 {authUser?.nama}
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Jumlah Kegiatan"
            // percent={2.6}
            total={data?.data?.length}
            icon={<SvgColor width="100%" height="100%" src={`/assets/icons/navbar/ic-blog.svg`} />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [22, 8, 35, 50, 82, 84, 77, 12],
            }}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Jumlah Pendaftar"
            // percent={-0.1}
            total={AllUser?.data?.length}
            color="secondary"
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-users.svg" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [56, 47, 40, 62, 73, 30, 23, 54],
            }}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Jumlah Dokumentasi"
            // percent={2.8}
            total={DataDocs?.data?.length}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-message.svg" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [40, 70, 50, 28, 70, 75, 7, 64],
            }}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Mentoring"
            // percent={3.6}
            total={DataMentoring?.length}
            color="error"
            icon={
              <SvgColor width="100%" height="100%" src={`/assets/icons/navbar/ic-analytics.svg`} />
            }
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [56, 30, 23, 54, 47, 40, 62, 73],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AnalyticsNews title="List Kegiatan" list={data?.data?.slice(0, 5)} />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AnalyticsOrderTimeline title="List Mentoring" list={DataMentoring} />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
