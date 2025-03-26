import { Box } from '@mui/material';

function Layout({ children }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, md: 3 } }}>
        {children}
      </Box>
      <Box component="footer" sx={{ p: 2, textAlign: 'center', mt: 'auto', bgcolor: '#f5f5f5' }}>
        © {new Date().getFullYear()} MaiPlanner
      </Box>
    </Box>
  );
}

export default Layout;
