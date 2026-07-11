import { Box, Typography, Checkbox, FormControlLabel, FormGroup, Slider, Divider } from "@mui/material";

const FilterSidebar = ({ brands, selectedBrands, onBrandChange, priceRange, onPriceChange }) => {
    return (
        <Box
            className="filter-sidebar"
            sx={{
                width: 260,
                flexShrink: 0,  
                pr: 0           
            }}
        >
            <Typography variant="h6" fontWeight={600}>Filters</Typography>
            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle1" fontWeight={600}>Price</Typography>
            <Slider
                value={priceRange}
                onChange={(e, val) => onPriceChange(val)}
                valueLabelDisplay="auto"
                min={0}
                max={20000}
                step={100}
            />
            <Typography variant="body2">₹{priceRange[0]} - ₹{priceRange[1]}</Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle1" fontWeight={600}>Brand</Typography>
            <FormGroup>
                {brands.map((brand) => (
                    <FormControlLabel
                        key={brand}
                        control={
                            <Checkbox
                                checked={selectedBrands.includes(brand)}
                                onChange={() => onBrandChange(brand)}
                                size="small"
                            />
                        }
                        label={brand}
                    />
                ))}
            </FormGroup>
        </Box>
    );
}
export default FilterSidebar;