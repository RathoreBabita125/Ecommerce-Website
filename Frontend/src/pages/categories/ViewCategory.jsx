import {
    Dialog,
    DialogContent,
    DialogActions,
    Button,
    Box,
    Typography,
    Chip,
    Avatar,
    Divider,
    Stack,
} from "@mui/material";
import { format, isValid } from "date-fns";
import { BRAND_COLOR } from "../../constants/const";

const ViewCategoryModal = ({ open, handleClose, category }) => {
    if (!category) return null;

    const formattedDate =
        category.createdAt && isValid(new Date(category.createdAt))
            ? format(new Date(category.createdAt), "dd MMM yyyy")
            : "-";

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                    <Avatar
                        variant="rounded"
                        src={category.categoryImage || undefined}
                        sx={{
                            width: 80,
                            height: 80,
                            fontSize: 22,
                            backgroundColor: "#eef0f4",
                            color: BRAND_COLOR,
                            fontWeight: 600,
                        }}
                    >
                        {category.categoryName?.[0]?.toUpperCase()}
                    </Avatar>
                    <Box>
                        <Typography sx={{ fontSize: 20, fontWeight: 600, color: "#1f2937" }}>
                            {category.categoryName}
                        </Typography>
                        <Typography sx={{ fontSize: 13, color: "#6b7280", mt: 0.5 }}>
                            /{category.slug}
                        </Typography>
                        <Chip
                            label={category.isActive ? "Active" : "Inactive"}
                            size="small"
                            sx={{
                                mt: 1,
                                fontWeight: 500,
                                fontSize: 12,
                                backgroundColor: category.isActive ? "#dcfce7" : "#fee2e2",
                                color: category.isActive ? "#16a34a" : "#dc2626",
                            }}
                        />
                    </Box>
                </Box>

                <Divider sx={{ mb: 2 }} />

                <Box sx={{ mb: 2 }}>
                    <Typography sx={{ fontSize: 12.5, color: "#9ca3af", fontWeight: 500, mb: 0.5 }}>
                        DESCRIPTION
                    </Typography>
                    <Typography sx={{ fontSize: 14.5, color: "#1f2937" }}>
                        {category.description || "No description provided."}
                    </Typography>
                </Box>
                <Stack direction="row" spacing={4} sx={{ mb: 2 }}>
                    <Box>
                        <Typography sx={{ fontSize: 12.5, color: "#9ca3af", fontWeight: 500, mb: 0.5 }}>
                            CREATED ON
                        </Typography>
                        <Typography sx={{ fontSize: 14.5, color: "#1f2937" }}>
                            {formattedDate}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography sx={{ fontSize: 12.5, color: "#9ca3af", fontWeight: 500, mb: 0.5 }}>
                            TOTAL PRODUCTS
                        </Typography>
                        <Typography sx={{ fontSize: 14.5, color: "#1f2937" }}>
                            {category.product?.length || 0}
                        </Typography>
                    </Box>
                </Stack>

                <Divider sx={{ mb: 2 }} />

                <Box>
                    <Typography sx={{ fontSize: 12.5, color: "#9ca3af", fontWeight: 500, mb: 1 }}>
                        PRODUCTS IN THIS CATEGORY
                    </Typography>
                    {category.product && category.product.length > 0 ? (
                        <Stack spacing={1.5}>
                            {category.product.map((p) => (
                                <Box
                                    key={p.id}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1.5,
                                        p: 1,
                                        borderRadius: 1.5,
                                        border: "1px solid #eef0f4",
                                    }}
                                >
                                    <Avatar
                                        variant="rounded"
                                        src={p.productImage || undefined}
                                        sx={{ width: 40, height: 40, backgroundColor: "#eef0f4" }}
                                    />
                                    <Box sx={{ flex: 1 }}>
                                        <Typography sx={{ fontSize: 13.5, color: "#1f2937", fontWeight: 500 }}>
                                            {p.productName}
                                        </Typography>
                                        <Typography sx={{ fontSize: 12, color: "#6b7280" }}>
                                            Stock: {p.stockQty}
                                        </Typography>
                                    </Box>
                                    <Typography sx={{ fontSize: 13.5, color: "#1f2937", fontWeight: 500 }}>
                                        ₹{p.price}
                                    </Typography>
                                </Box>
                            ))}
                        </Stack>
                    ) : (
                        <Typography sx={{ fontSize: 13.5, color: "#9ca3af" }}>
                            No products found in this category.
                        </Typography>
                    )}
                </Box>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 2.5 }}>
                <Button
                    onClick={handleClose}
                    sx={{ backgroundColor: '#1842BB', color: 'white' }}
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ViewCategoryModal;