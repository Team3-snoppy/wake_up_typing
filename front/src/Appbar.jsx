import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';


const Appbar = ()=>{
    return (
        <AppBar position="static">
        <Toolbar variant="regular">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" >
            Good Morning typing!!
          </Typography>
        </Toolbar>
       </AppBar>
    );
}

export default Appbar