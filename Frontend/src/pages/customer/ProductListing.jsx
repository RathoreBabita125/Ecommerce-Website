import { Box, Stack, Typography } from "@mui/material";
import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import FilterSidebar from "../customer/FilterSidebar";
import ProductGrid from "../customer/Product";
import ProductDetailModal from "./ProductDetailModal";
import { GETPRODUCTS } from "../../query/product";
import { useQuery } from '@apollo/client/react'
import LoadingCompo from "../../common/LoadingCompo";

const ProductListing = () => {
    const [searchParams] = useSearchParams();
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 500000]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const selectedCategory = searchParams.get("category") || "Popular";
    const searchTerm = searchParams.get("search") || "";

    const { data: productData, loading: productLoading } = useQuery(GETPRODUCTS, {
        variables: {
            productName: searchTerm || undefined,
        },
    });

    const categoryProducts = useMemo(() => {
        if (selectedCategory === "Popular") return productData?.getProducts;
        return productData?.getProducts?.filter((p) => p?.category?.categoryName === selectedCategory);
    }, [productData, selectedCategory]);

    const brands = useMemo(() => {
        return [...new Set(categoryProducts?.map((p) => p.brand))];
    }, [categoryProducts]);

    const handleBrandChange = (brand) => {
        setSelectedBrands((prev) =>
            prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
        );
    };

    const filteredProducts = useMemo(() => {
        return categoryProducts?.filter((p) => {
            const brandMatch = selectedBrands?.length === 0 || selectedBrands.includes(p.brand);
            const priceMatch = p.price >= priceRange[0] && p.price <= priceRange[1];
            return brandMatch && priceMatch;
        });
    }, [categoryProducts, selectedBrands, priceRange]);

    const handleProductClick = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    if (productLoading) {
        return <LoadingCompo />
    }

    return (
        <>
            <Stack className="product-listing" sx={{ p: 12 }} spacing={4}>
                <Typography variant="h4" color="initial" sx={{ fontWeight: 600 }}>
                    Product Details
                </Typography>
                <Box sx={{ display: "flex", gap: 10 }}>
                    <FilterSidebar
                        brands={brands}
                        selectedBrands={selectedBrands}
                        onBrandChange={handleBrandChange}
                        priceRange={priceRange}
                        onPriceChange={setPriceRange}
                    />
                    <Stack sx={{ flex: 1 }}>
                        <ProductGrid
                            products={filteredProducts}
                            onProductClick={handleProductClick}
                        />
                    </Stack>
                </Box>
            </Stack>
            <ProductDetailModal
                open={isModalOpen}
                onClose={handleCloseModal}
                product={selectedProduct}
            />
        </>
    );
}
export default ProductListing;