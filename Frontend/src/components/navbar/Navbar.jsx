import { AppBar, Avatar, Box, IconButton, Stack, Toolbar, Tooltip, TextField, Button, Badge, Menu, MenuItem, Divider } from '@mui/material';
import './Navbar.css';
import CompanyLogo from '../../assets/company.png';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from "@mui/material/InputAdornment";
import { useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import LogoutIcon from '@mui/icons-material/Logout';
import { LOGOUT } from '../../query/user';
import { client } from '../../client/client';
import { toast } from 'react-toastify';
import { useMutation, useQuery } from '@apollo/client/react';
import { GETCART } from '../../query/cart';
import LoadingCompo from '../../common/LoadingCompo';
import { GETMYWISHLISTPRODUCT } from '../../query/wishlist';
import { useSearchParams, useLocation } from 'react-router-dom';

const Navbar = () => {

    const { authUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const [logout] = useMutation(LOGOUT);
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchInput, setSearchInput] = useState(searchParams.get("search") || "");

    const { data: cartItems, loading: cartItemLoading } = useQuery(GETCART);
    const { data: wishlistProducts, loading: wishlistLoading } = useQuery(GETMYWISHLISTPRODUCT);

    useEffect(() => {
        const timer = setTimeout(() => {
            const trimmed = searchInput.trim();

            if (trimmed) {
                const params = new URLSearchParams(location.search);
                params.set("search", trimmed);
                if (location.pathname !== "/") {
                    navigate(`/?${params.toString()}`);
                } else {
                    setSearchParams(params);
                }
            } else {
                const params = new URLSearchParams(location.search);
                params.delete("search");
                if (location.pathname === "/") {
                    setSearchParams(params);
                }
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [searchInput, setSearchParams, navigate, location.pathname, location.search]);

    if (cartItemLoading || wishlistLoading) return <LoadingCompo />

    const cartCount = cartItems?.getCart?.items?.length
    const wishlistCount = wishlistProducts?.getMyWishlist.length

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        try {
            await logout();
            await client.clearStore();
            toast.success("You have successfully logged out.");
            navigate("/signin", { replace: true });
        } catch (error) {
            toast.error(error?.message || "Logout failed");
        }
    };

    const handleSearchKeyDown = (event) => {
        if (event.key === "Enter") {
            const trimmed = searchInput.trim();
            if (trimmed) {
                navigate(`/?search=${encodeURIComponent(trimmed)}`);
            }
        }
    };
    return (
        <AppBar AppBarposition='relative' className='navbar-section'>
            <Toolbar>
                <Box sx={{ width: '100%' }}>
                    <Box className='navbar-items'>
                        <Box>
                            <img src={CompanyLogo} alt="logo" style={{ width: 200, cursor: "pointer" }}
                                onClick={() => {
                                    navigate('/')
                                }}
                            />
                        </Box>
                        <Box>
                            <TextField
                                variant="outlined"
                                size="medium"
                                className='search-input'
                                placeholder="Search products..."
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                onKeyDown={handleSearchKeyDown}
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="end">
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
                                        <Avatar
                                            className='profile'
                                            onClick={handleMenu}
                                        >
                                            {authUser?.firstName?.[0].toUpperCase()}
                                        </Avatar>
                                    </IconButton>
                                    <Menu
                                        sx={{ marginTop: 6, marginLeft: 7 }}
                                        id="menu-appbar"
                                        anchorEl={anchorEl}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                    >
                                        <Box sx={{ textAlign: 'center' }}>
                                            <MenuItem >{authUser.firstName}</MenuItem>
                                            <MenuItem >{authUser.email}</MenuItem>
                                            <Divider />
                                            <MenuItem onClick={handleLogout}>
                                                <LogoutIcon />
                                                Logout
                                            </MenuItem>
                                        </Box>
                                    </Menu>

                                </Tooltip>
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

                            <Stack
                                sx={{ alignItems: 'center', cursor: 'pointer' }}
                                onClick={() => navigate('/wishlist')}
                            >
                                <Badge badgeContent={wishlistCount} color="error">
                                    <FavoriteBorderIcon className='cart-wishlist-icon' />
                                </Badge>
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