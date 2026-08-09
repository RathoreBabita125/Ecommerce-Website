import { Box, Typography, Grid } from "@mui/material";
import ProductCard from "./ProductCard";

const ProductGrid = ({ products, onProductClick, onAddToCart, onAddToWishlist }) => {
    if (products?.length === 0) {
        return (
            <Box sx={{ p: 4, textAlign: "center", width: "100%" }}>
                <Typography variant="h6">No products found</Typography>
            </Box>
        );
    }
    return (
        <Grid container className="product-grid" sx={{ p: 2, gap: 5 }}>
            {products?.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    onClick={onProductClick}
                    onAddToCart={onAddToCart}
                    onAddToWishlist={onAddToWishlist}
                />
            ))}
        </Grid>
    );
}
export default ProductGrid;