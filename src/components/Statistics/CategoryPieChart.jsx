import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import Chart from 'chart.js/auto';
import { Pie } from 'react-chartjs-2';

const CategoryPieChart = () => {
  const data = {
    labels: ['Work', 'Personal', 'Health', 'Others'],
    datasets: [
      {
        data: [40, 30, 20, 10],
        backgroundColor: ['#1976d2', '#9c27b0', '#ff9800', '#4caf50'],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Event Categories',
      },
    },
  };

  return (
    <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Event Categories
      </Typography>
      <Box sx={{ height: 300, display: 'flex', justifyContent: 'center' }}>
        <Pie data={data} options={options} />
      </Box>
    </Paper>
  );
};

export default CategoryPieChart;
