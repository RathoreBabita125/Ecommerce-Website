import { Dialog, DialogContent, Box, Typography, IconButton, Button, Stack, Divider, Chip, Rating } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";
import { useQuery } from "@apollo/client/react";
import { GETMYWISHLISTPRODUCT } from "../../query/wishlist";
import LoadingCompo from "../../common/LoadingCompo";

const ProductDetailModal = ({ open, onClose, product}) => {
    
    const {handleAddProductToCart} = useContext(CartContext);
    const {handleAddToWishlist} = useContext(WishlistContext);
    const {data:wishlistData, loading} = useQuery(GETMYWISHLISTPRODUCT);

    if (!product) return null;

    if(loading) return <LoadingCompo/>

    const wishlistedDetail=wishlistData?.getMyWishlist?.filter((wishlistProduct)=>{
        return wishlistProduct.product.id===product.id
    });

    return (
        <Dialog
            open={open}
            onClose={(event, reason) => {
                if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
                    return;
                }
                onclose();
            }}
            maxWidth="lg"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    minHeight: 550
                }
            }}
        >
            <Box sx={{ padding: 7 }}>
                <IconButton
                    onClick={onClose}
                    sx={{ position: "absolute", top: 12, right: 12, zIndex: 1, bgcolor: "#fff" }}
                >
                    <CloseIcon />
                </IconButton>

                <DialogContent sx={{ p: 0 }}>
                    <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, minHeight: 550 }}>
                        <Box sx={{ flex: 1, bgcolor: "#f5f5f5" }}>
                            <img
                                src={product?.productImage}
                                alt={product?.productName}
                                style={{ width: "100%", height: "100%", minHeight: 550, objectFit: "cover" }}
                            />
                        </Box>

                        <Box sx={{ flex: 1, p: 5 }}>
                            <Typography sx={{ fontWeight: 700, fontSize: 24 }}>{product?.brand}</Typography>
                            <Typography sx={{ fontSize: 16, color: "#666", mb: 1.5 }}>{product?.productName}</Typography>
                            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
                                <Rating value={4.1} precision={0.1} size="small" readOnly />
                                <Typography sx={{ fontSize: 14, color: "#666" }}>
                                    {4.1} | {550} Reviews
                                </Typography>
                            </Stack>

                            <Divider sx={{ my: 2.5 }} />

                            <Stack direction="row" alignItems="center" spacing={1.5}>
                                <Typography sx={{ fontWeight: 700, fontSize: 28 }}>₹{product.price}</Typography>
                                {product.price && (
                                    <>
                                        <Typography sx={{ fontSize: 18, color: "#999", textDecoration: "line-through" }}>
                                            ₹{product.price + (product.price * 10 / 100)}
                                        </Typography>
                                        <Typography sx={{ fontSize: 16, color: "#ff905a", fontWeight: 600 }}>
                                            ({product.discountPrice}% OFF)
                                        </Typography>
                                    </>
                                )}
                            </Stack>
                            <Typography sx={{ fontSize: 13, color: "#03a685", mt: 0.5 }}>
                                inclusive of all taxes
                            </Typography>

                            {product.stockLeft && (
                                <Chip
                                    label="Only Few Left!"
                                    size="small"
                                    sx={{ mt: 1.5, bgcolor: "#fff3e0", color: "#ff905a", fontWeight: 600 }}
                                />
                            )}

                            <Divider sx={{ my: 2.5 }} />

                            <Stack spacing={0.8} sx={{ mb: 2.5 }}>
                                <Typography sx={{ fontSize: 15 }}><b>Category:</b> {product.category.categoryName}</Typography>
                                {product.color && (
                                    <Typography sx={{ fontSize: 15 }}><b>Color:</b> {product.color}</Typography>
                                )}
                                <Typography variant="body1"><b>Description:</b> {product?.description}</Typography>
                            </Stack>

                            <Divider sx={{ my: 5 }} />

                            <Stack direction="row" spacing={2}>
                                <Button
                                    variant="contained"
                                    startIcon={<ShoppingCartIcon />}
                                    onClick={()=>handleAddProductToCart(product, 1)}
                                    sx={{
                                        flex: 1, bgcolor: "#1842BB", py: 1.6, fontSize: 16,
                                        "&:hover": { bgcolor: "#1842BB" }
                                    }}
                                >
                                    Add to Cart
                                </Button>
                                <IconButton
                                    onClick={()=>handleAddToWishlist(product)}
                                    sx={{ border: "1px solid #ddd", borderRadius: 1.5, px: 2 }}
                                >
                                    {wishlistedDetail?.isWishlisted ? (
                                        <FavoriteIcon sx={{ color: "#1842BB" }} />
                                    ) : (
                                        <FavoriteBorderIcon />
                                    )}
                                </IconButton>
                            </Stack>
                        </Box>
                    </Box>
                </DialogContent>
            </Box>
        </Dialog>
    );
}
export default ProductDetailModal;