import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          MaiPlanner
        </Typography>
        <Box>
          <Button color="inherit">Dashboard</Button>
          <Button color="inherit">Calendar</Button>
          <Button color="inherit">Tasks</Button>
          <Button color="inherit">Settings</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
