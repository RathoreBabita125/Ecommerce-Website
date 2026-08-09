import { Box, Typography, Stack, IconButton, Button, Divider, Paper } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LoadingCompo from "../../common/LoadingCompo";
import { useQuery } from "@apollo/client/react";
import { GETMYWISHLISTPRODUCT } from "../../query/wishlist";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";

const WishlistPage = () => {

    const { data: wishlistProducts, loading: wishlistLoading } = useQuery(GETMYWISHLISTPRODUCT);
    const {handleAddProductToCart, navigate} = useContext(CartContext);
    const {handleRemoveFromWishlist} = useContext(WishlistContext);

    if (wishlistLoading) return <LoadingCompo />

    if (wishlistProducts?.getMyWishlist?.length === 0) {
        return (
            <Box sx={{ textAlign: "center", py: 10, mt: 15 }}>
                <Typography variant="h5" sx={{ mb: 2 }}>Your wishlist is empty</Typography>
                <Button variant="contained" onClick={() => navigate("/")} sx={{ bgcolor: "#1842BB" }}>
                    Continue Shopping
                </Button>
            </Box>
        );
    }
    return (
        <Box sx={{ maxWidth: "1200px", mx: "auto", px: { xs: 2, md: 4 }, py: 4, mt: 15 }}>
            <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
                My Wishlist ({wishlistProducts?.getMyWishlist?.length} {wishlistProducts?.getMyWishlist?.length === 1 ? "item" : "items"})
            </Typography>
            <Paper sx={{ p: 2 }}>
                {wishlistProducts?.getMyWishlist?.map((item, idx) => (
                    <Box key={item.id}>
                        <Stack direction="row" spacing={2} sx={{ py: 2, alignItems: "center" }}>
                            <img
                                src={item?.product?.productImage}
                                alt={item?.product?.productName}
                                style={{ width: 110, height: 130, objectFit: "cover", borderRadius: 4 }}
                            />
                            <Box sx={{ flex: 1 }}>
                                <Typography fontWeight={700}>{item?.product?.brand}</Typography>
                                <Typography sx={{ color: "#666", fontSize: 14 }} noWrap>
                                    {item?.product?.productName}
                                </Typography>
                                <Typography fontWeight={700} sx={{ mt: 1 }}>₹{item?.product?.price}</Typography>
                            </Box>
                            <Button
                                variant="contained"
                                startIcon={<ShoppingCartIcon />}
                                onClick={() => handleAddProductToCart(item?.product, 1)}
                                sx={{ bgcolor: "#1842BB", textTransform: "none" }}
                            >
                                Add to Cart
                            </Button>
                            <IconButton
                                onClick={() => handleRemoveFromWishlist(item.id)} sx={{ color: "#999" }}>
                                <DeleteOutlineIcon sx={{ color: '#1842BB' }} />
                            </IconButton>
                        </Stack>
                        {idx < wishlistProducts?.getMyWishlist?.length - 1 && <Divider />}
                    </Box>
                ))}
            </Paper>
        </Box>
    );
};
export default WishlistPage;