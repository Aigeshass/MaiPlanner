import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

const AverageTimeChart = () => {
  const data = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    datasets: [
      {
        label: 'Average Time (minutes)',
        data: [30, 45, 35, 50, 40],
        borderColor: '#9c27b0',
        backgroundColor: 'rgba(156, 39, 176, 0.2)',
        tension: 0.3,
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
        text: 'Average Time Per Event',
      },
    },
  };

  return (
    <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Average Time Spent Per Event
      </Typography>
      <Box sx={{ height: 300 }}>
        <Line data={data} options={options} />
      </Box>
    </Paper>
  );
};

export default AverageTimeChart;
