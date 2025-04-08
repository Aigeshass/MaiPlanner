import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

const SchedulingTimeChart = () => {
  const data = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Time Spent (hours)',
        data: [5, 8, 6, 7],
        backgroundColor: '#ff9800',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Time Spent on Scheduling',
      },
    },
  };

  return (
    <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Time Spent Scheduling
      </Typography>
      <Box sx={{ height: 300 }}>
        <Bar data={data} options={options} />
      </Box>
    </Paper>
  );
};

export default SchedulingTimeChart;
