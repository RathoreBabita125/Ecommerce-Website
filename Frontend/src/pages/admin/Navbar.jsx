import { useContext, useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { AuthContext } from "../../context/AuthContext";

const Navbar = ({ setMobileOpen }) => {

  const drawerWidth = 360;
  const { authUser } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { md: `calc(100% - ${drawerWidth}px)` },
        ml: { md: `${drawerWidth}px` },
        bgcolor: "#1842BB",
    }}
    >
      <Toolbar
         sx={{
             alignItems:'center',
             justifyContent:'center',
             display:'flex',
             height: '10vh',
            }}
      >
        <IconButton
          color="inherit"
          edge="start"
          onClick={() => setMobileOpen(true)}
          sx={{
            mr: 2,
            display: { md: "none" },
            alignItems:'center'
          }}
        >
        <MenuIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />

        {/* Avatar */}
        <IconButton onClick={handleOpen} >
          <Avatar
            sx={{
              bgcolor: "#fff",
              color: "#1842BB",
              fontWeight: "bold",
            }}
          >
            {authUser?.firstName?.charAt(0).toUpperCase()}
            </Avatar>
        </IconButton>

        {/* Profile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}>
            <Box sx={{ px: 2, py: 1 }}>
            <Typography fontWeight={600}> {authUser?.name}</Typography>
            <Typography variant="body2" color="text.secondary"> {authUser?.email}</Typography>
            </Box>
            <Divider />

            <MenuItem onClick={handleClose}>
                <ListItemIcon><PersonIcon fontSize="small" /></ListItemIcon>
                Profile
            </MenuItem>
          <Divider />

          <MenuItem onClick={() => handleClose()}>
            <ListItemIcon><LogoutIcon fontSize="small" /></ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;