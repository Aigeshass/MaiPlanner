import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = ({ variant = 'default', onClick }) => {
  const theme = useTheme();

  // Define different variants of the header
  const variants = {
    default: {
      fontSize: '1.5rem',
      fontWeight: 700,
      padding: '4px 8px',
    },
    large: {
      fontSize: '2rem',
      fontWeight: 700,
      padding: '4px 8px',
    },
    small: {
      fontSize: '1.25rem',
      fontWeight: 600,
      padding: '2px 4px',
    },
  };

  const selectedVariant = variants[variant] || variants.default;

  return (
    <Box 
      display="flex" 
      alignItems="center" 
      gap={1}
      component={Link}
      to="/"
      sx={{ 
        textDecoration: 'none',
        cursor: onClick ? 'pointer' : 'default',
      }}
      onClick={onClick}
    >
      <img 
        src="/favicon.svg" 
        alt="MaiPlanner Logo" 
        height={selectedVariant.fontSize === '2rem' ? 36 : 28} 
        width={selectedVariant.fontSize === '2rem' ? 36 : 28}
        style={{ margin: '0 4px' }}
      />
      <Typography 
        variant={selectedVariant.fontSize === '2rem' ? 'h4' : 'h6'} 
        component="div" 
        sx={{
          fontFamily: '"Quicksand", "Poppins", sans-serif',
          fontWeight: selectedVariant.fontWeight,
          letterSpacing: '0.5px',
          backgroundImage: 'linear-gradient(90deg, #1976d2, #9c27b0)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          color: 'transparent',
          textRendering: 'optimizeLegibility',
          padding: selectedVariant.padding,
        }}
      >
        MaiPlanner
      </Typography>
    </Box>
  );
};

export default Header;
