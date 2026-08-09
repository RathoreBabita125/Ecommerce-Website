import { Card, CardMedia, CardContent, Typography, Rating, Chip, Box, IconButton, Button } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ProductDetailModal from "./ProductDetailModal";
import { useContext, useState } from "react";
import { WishlistContext } from "../../context/WishlistContext";

const ProductCard = ({product}) => {

    const [openProduct, setOpenProduct]=useState(false);
    const {handleAddToWishlist} = useContext(WishlistContext);
    const [isWishlisted]=useState(false);
    
    return (
        <Card className="product-card" sx={{ width: 250, m: 1, cursor: "pointer" }}>
            <Box sx={{ position: "relative" }}>
                <CardMedia
                    component="img"
                    height="200"
                    image={product.productImage}
                    alt={product.productName}
                />
                <IconButton
                    onClick={()=>handleAddToWishlist(product)}
                    sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        bgcolor: "#fff",
                        boxShadow: 1,
                        "&:hover": { bgcolor: "#fff" }
                    }}
                    size="small"
                >
                    {isWishlisted ? (
                        <FavoriteIcon sx={{ color: "#1842BB", fontSize: 20 }} />
                    ) : (
                        <FavoriteBorderIcon sx={{ fontSize: 20 }} />
                    )}
                </IconButton>
            </Box>

            <CardContent>
                <Typography variant="body1" fontWeight={600} noWrap>
                    {product.name}
                </Typography>
                
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                    <Rating value={4.1} precision={0.1} size="small" readOnly />
                    <Typography variant="caption">({4.1})</Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1 }}>
                    <Typography variant="subtitle1" fontWeight={700}>₹{product.price}</Typography>
                    <Chip label={product.brand} size="small" variant="outlined" />
                </Box>

                <Button
                    fullWidth
                    variant="contained"
                    startIcon={<ShoppingCartIcon />}
                    onClick={()=>setOpenProduct(true)}
                    sx={{
                        mt: 1.5,
                        bgcolor: "#1842BB",
                        textTransform: "none",
                        "&:hover": { bgcolor: "#4670ed" }
                    }}
                >
                    Add to Cart
                </Button>
                <ProductDetailModal
                    open={openProduct}
                    product={product}
                    onClose={()=>setOpenProduct(false)}
                />
            </CardContent>
        </Card>
    );
}
export default ProductCard;