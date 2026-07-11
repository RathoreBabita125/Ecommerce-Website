import { Box, Button, Stack } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import './Home.css';

const categories = [
    "Popular", "Women", "Men", "Kids", "Home & Kitchen",
    "Beauty", "Electronic", "Mobile", "Toys", "Food", "Books", "Furniture"
];

const Category = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const activeCategory = searchParams.get("category") || "Popular";

    const handleCategoryClick = (cat) => {
        setSearchParams({ category: cat });

        setTimeout(() => {
            const productSection = document.getElementById("product-listing");
            if (!productSection) return;

            const stickyHeader = document.querySelector(".sticky-header-offset");
            const offset = stickyHeader ? stickyHeader.offsetHeight : 0;
            const sectionTop = productSection.getBoundingClientRect().top + window.scrollY;

            window.scrollTo({
                top: sectionTop - offset,
                behavior: "smooth"
            });
        }, 100);
    };

    return (
       <Box className="category-items" sx={{ maxWidth: "1400px", mx: "auto", px: { xs: 2, md: 4 } }}>
            <Stack direction={'row'} spacing={8}>
                {categories.map((cat) => (
                    <Button
                        key={cat}
                        onClick={() => handleCategoryClick(cat)}
                        className={`category-btn ${activeCategory === cat ? "active-category" : ""}`}
                    >
                        {cat}
                    </Button>
                ))}
            </Stack>
        </Box>
    );
}
export default Category;




