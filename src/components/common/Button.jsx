import { Button as MuiButton } from '@mui/material';

function Button({ children, ...props }) {
  return (
    <MuiButton 
      variant="contained" 
      sx={{ 
        borderRadius: '8px',
        textTransform: 'none',
        ...props.sx 
      }} 
      {...props}
    >
      {children}
    </MuiButton>
  );
}

export default Button;
