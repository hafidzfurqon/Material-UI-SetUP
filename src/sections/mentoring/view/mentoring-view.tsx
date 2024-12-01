import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';

import { _posts } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

import { MentoringItemProps, PostItem } from '../post-item';
import { PostSort } from '../post-sort';
import { PostSearch } from '../post-search';
import { useFetchMentoring } from 'src/hooks/mentoring/useFetchMentoring';
import { TablePagination } from '@mui/material';
import { useTable } from 'src/sections/user/view';
import { Link } from 'react-router-dom';
import { router } from 'src/hooks/routing/useRouting';
import toast from 'react-hot-toast';

// ----------------------------------------------------------------------

export function MentoringView() {
  const table = useTable();
  const [sortBy, setSortBy] = useState('latest');
  const { data: AllMentoring, isLoading, error } = useFetchMentoring();
  const handleSort = useCallback((newSort: string) => {
    setSortBy(newSort);
  }, []);
  console.log(AllMentoring);
  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  if (error) {
    toast.error(error.message);
  }
  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Mentoring
        </Typography>
        <Link to={router.mentoring.create}>
          <Button
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            Tambah Mentoring
          </Button>
        </Link>
      </Box>

      <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: 5 }}>
        <PostSearch posts={AllMentoring} />
        <PostSort
          sortBy={sortBy}
          onSort={handleSort}
          options={[
            { value: 'latest', label: 'Latest' },
            { value: 'oldest', label: 'Oldest' },
          ]}
        />
      </Box>

      <Grid container spacing={3}>
        {AllMentoring.map((mentoring: MentoringItemProps, index: number) => {
          const latestPostLarge = index === 0;
          const latestPost = index === 1 || index === 2;

          return (
            <Grid
              key={mentoring.id}
              xs={12}
              sm={latestPostLarge ? 12 : 6}
              md={latestPostLarge ? 6 : 3}
            >
              <PostItem
                post={mentoring}
                latestPost={latestPost}
                latestPostLarge={latestPostLarge}
              />
            </Grid>
          );
        })}
      </Grid>

      <TablePagination
        component="div"
        page={table.page}
        count={AllMentoring.length}
        rowsPerPage={table.rowsPerPage}
        onPageChange={table.onChangePage}
        rowsPerPageOptions={[5, 10, 25]}
        onRowsPerPageChange={table.onChangeRowsPerPage}
      />
    </DashboardContent>
  );
}
