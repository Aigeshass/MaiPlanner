import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

const CommonRequests = () => {
  const data = {
    labels: ['Schedule Meeting', 'Change Event Name', 'Add Participants', 'Cancel Event'],
    datasets: [
      {
        label: 'Requests',
        data: [12, 19, 7, 5],
        backgroundColor: '#1976d2',
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
        text: 'Common User Requests',
      },
    },
  };

  return (
    <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Common User Requests
      </Typography>
      <Box sx={{ height: 300 }}>
        <Bar data={data} options={options} />
      </Box>
    </Paper>
  );
};

export default CommonRequests;
