import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import CommonRequests from '../components/Statistics/CommonRequests';
import AverageTimeChart from '../components/Statistics/AverageTimeChart';
import CategoryPieChart from '../components/Statistics/CategoryPieChart';
import SchedulingTimeChart from '../components/Statistics/SchedulingTimeChart';

const StatisticsPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        User Statistics and Analytics
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <CommonRequests />
        </Grid>
        <Grid item xs={12} md={6}>
          <AverageTimeChart />
        </Grid>
        <Grid item xs={12} md={6}>
          <CategoryPieChart />
        </Grid>
        <Grid item xs={12} md={6}>
          <SchedulingTimeChart />
        </Grid>
      </Grid>
    </Box>
  );
};

export default StatisticsPage;
