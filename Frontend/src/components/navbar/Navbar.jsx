import {AppBar, Avatar, Box, IconButton, Stack, Toolbar, Tooltip,TextField, Button, Badge} from '@mui/material';
import './Navbar.css';
import CompanyLogo from '../../assets/company.png';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import InputAdornment from "@mui/material/InputAdornment";
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';

const Navbar = () => {
    const { authUser } = useContext(AuthContext);
    const { cartCount } = useContext(CartContext);
    const navigate = useNavigate();

    return (
        <AppBar AppBarposition='relative' className='navbar-section'>
            <Toolbar>
                <Box sx={{ width: '100%' }}>
                    <Box className='navbar-items'>
                        <Box>
                            <img src={CompanyLogo} alt="logo" style={{ width: 200, cursor: "pointer" }} />
                        </Box>
                        <Box>
                            <TextField
                                variant="outlined"
                                size="medium"
                                className='search-input'
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon sx={{ fontSize: '40px' }} />
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                            />
                        </Box>
                        <Stack direction={'row'} spacing={4} sx={{ alignItems: 'center' }}>
                            {authUser && (
                                <Tooltip className='avtar-icon'>
                                    <IconButton>
                                        <Avatar className='profile'>
                                            {authUser?.firstName?.[0].toUpperCase()}
                                        </Avatar>
                                    </IconButton>
                                </Tooltip>
                            )}
                            {!authUser && (
                                <Stack sx={{ alignItems: 'center' }}>
                                    <PersonIcon className='cart-wishlist-icon' />
                                    <Link to='/signup'><Button sx={{ color: '#1842BB' }}>Sign up</Button></Link>
                                </Stack>
                            )}

                            <Stack
                                sx={{ alignItems: 'center', cursor: 'pointer' }}
                                onClick={() => navigate('/cart')}
                            >
                                <Badge badgeContent={cartCount} color="error">
                                    <ShoppingCartIcon className='cart-wishlist-icon' />
                                </Badge>
                                <Button sx={{ color: '#1842BB' }}>Cart</Button>
                            </Stack>

                            <Stack sx={{ alignItems: 'center' }}>
                                <FavoriteBorderIcon className='cart-wishlist-icon' />
                                <Button sx={{ color: '#1842BB' }}>Wishlist</Button>
                            </Stack>
                        </Stack>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    )
}
export default Navbar;