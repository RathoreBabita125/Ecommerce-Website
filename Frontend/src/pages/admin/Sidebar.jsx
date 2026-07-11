import { Box, Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import company from '../../assets/company.png';
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory2";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import DiscountIcon from "@mui/icons-material/LocalOffer";
import CategoryIcon from "@mui/icons-material/Category";
import { Link } from "react-router-dom";

const Sidebar = ({ drawerWidth, mobileOpen, setMobileOpen }) => {

  const drawer = (
    <>
      <Toolbar>
        <Box
          component="img"
          src={company}
          alt="Logo"
          sx={{
            width: 100,
            height: 100,
          }}
        />
      </Toolbar>
      <Divider />
      <List sx={{mt:5}}>
        <Link to='/admin/dashboard' style={{textDecoration:'none'}}>
          <ListItemButton >
            <ListItemIcon ><DashboardIcon sx={{color:'#1842BB'}}/></ListItemIcon>
            <ListItemText primary="Dashboard" sx={{color:'black'}}/>
          </ListItemButton>
        </Link>
        <Link to='/admin/products' style={{textDecoration:'none'}}>
          <ListItemButton >
            <ListItemIcon><InventoryIcon sx={{color:'#1842BB'}}/></ListItemIcon>
            <ListItemText primary="Products" sx={{color:'black'}}/>
          </ListItemButton>
        </Link>
        <Link to='/admin/categories' style={{textDecoration:'none'}}>
          <ListItemButton >
            <ListItemIcon><CategoryIcon sx={{color:'#1842BB'}}/></ListItemIcon>
            <ListItemText primary="Categories" sx={{color:'black'}}/>
          </ListItemButton>
        </Link>
        <Link to='/admin/orders' style={{textDecoration:'none'}}>
          <ListItemButton >
            <ListItemIcon><ShoppingCartIcon sx={{color:'#1842BB'}}/></ListItemIcon>
            <ListItemText primary="Orders" sx={{color:'black'}}/>
          </ListItemButton>
        </Link>
        <Link to='/admin/users' style={{textDecoration:'none'}}>
          <ListItemButton >
            <ListItemIcon><PeopleIcon sx={{color:'#1842BB'}}/></ListItemIcon>
            <ListItemText primary="Users" sx={{color:'black'}}/>
          </ListItemButton>
        </Link>
        <Link to='/admin/coupons' style={{textDecoration:'none'}}>
          <ListItemButton >
            <ListItemIcon><DiscountIcon sx={{color:'#1842BB'}}/></ListItemIcon>
            <ListItemText primary="Coupons" sx={{color:'black'}}/>
          </ListItemButton>
        </Link>
      </List>
    </>
  );

  return (
    <>
      <Box
        component="nav"
        sx={{
          width: { md: drawerWidth },
          flexShrink: { md: 0 },
        }}
      >
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>

        {/* Desktop Drawer */}
        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  )
}
export default Sidebar;
