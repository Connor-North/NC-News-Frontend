import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

function Header() {
  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          NC News
        </Typography>
        <Box>
          <Button component={Link} to="/" color="inherit">
            Home
          </Button>
          <Button component={Link} to="/topics/coding" color="inherit">
            Coding
          </Button>
          <Button component={Link} to="/topics/cooking" color="inherit">
            Cooking
          </Button>
          <Button component={Link} to="/topics/football" color="inherit">
            Football
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
