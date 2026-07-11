import { Dialog,DialogContent,IconButton,Box,Typography,Chip,Divider,Stack,} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import { BRAND_COLOR } from "../../constants/const";

function statusColor(status) {
    if (status === "Active") return "success";
    if (status === "Out of stock") return "error";
    return "default";
}

const currency = (val) => {
    if (val === null || val === undefined || val === "") return "-";
    return `₹${Number(val).toLocaleString("en-IN")}`;
};

const InfoRow = ({ label, value }) => (
    <Box sx={{ display: "flex", justifyContent: "space-between", py: 0.9 }}>
        <Typography sx={{ fontSize: 14, color: "#6b7280" }}>{label}</Typography>
        <Typography sx={{ fontSize: 14, color: "#1f2937", fontWeight: 500 }}>
            {value || "-"}
        </Typography>
    </Box>
);

const ViewProductModal = ({ open, handleClose, product }) => {
    if (!product) return null;

    const hasDiscount =
        product.discountPrice &&
        Number(product.discountPrice) > 0 &&
        Number(product.discountPrice) < Number(product.price);

    const discountPercent = hasDiscount
        ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
        : 0;

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
            <IconButton
                onClick={handleClose}
                sx={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    backgroundColor: "#f3f4f6",
                    zIndex: 1,
                    "&:hover": { backgroundColor: "#e5e7eb" },
                }}
                size="small"
            >
                <CloseIcon sx={{ fontSize: 18 }} />
            </IconButton>

            <DialogContent sx={{ p: { xs: 2.5, sm: 4 } }}>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={4}>
                    <Box
                        sx={{
                            width: { xs: "100%", sm: 280 },
                            flexShrink: 0,
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <Box
                            sx={{
                                width: 260,
                                height: 260,
                                borderRadius: 2,
                                border: "1px solid #eef0f4",
                                backgroundColor: "#fafafa",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                overflow: "hidden",
                            }}
                        >
                            {product.productImage ? (
                                <Box
                                    component="img"
                                    src={product.productImage}
                                    alt={product.productName}
                                    sx={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "contain",
                                    }}
                                />
                            ) : (
                                <Inventory2OutlinedIcon sx={{ fontSize: 64, color: "#cbd5e1" }} />
                            )}
                        </Box>
                    </Box>

                    {/* Product Details */}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography sx={{ fontSize: 12.5, color: BRAND_COLOR, fontWeight: 600, letterSpacing: 0.5 }}>
                            {product.category?.categoryName?.toUpperCase() || "PRODUCT"}
                        </Typography>

                        <Typography sx={{ fontSize: 22, fontWeight: 600, color: "#1f2937", mt: 0.5 }}>
                            {product.productName}
                        </Typography>

                        <Typography sx={{ fontSize: 14, color: "#9ca3af", mt: 0.25 }}>
                            {product.brand}
                        </Typography>

                        <Chip
                            label={product.status}
                            color={statusColor(product.status)}
                            size="small"
                            variant="outlined"
                            sx={{ mt: 1.25, fontWeight: 500, fontSize: 12.5 }}
                        />

                        {/* Price section */}
                        <Box sx={{ display: "flex", alignItems: "baseline", gap: 1.25, mt: 2.5 }}>
                            <Typography sx={{ fontSize: 26, fontWeight: 700, color: "#1f2937" }}>
                                {currency(hasDiscount ? product.discountPrice : product.price)}
                            </Typography>
                            {hasDiscount && (
                                <>
                                    <Typography
                                        sx={{
                                            fontSize: 16,
                                            color: "#9ca3af",
                                            textDecoration: "line-through",
                                        }}
                                    >
                                        {currency(product.price)}
                                    </Typography>
                                    <Typography sx={{ fontSize: 14, color: "#16a34a", fontWeight: 600 }}>
                                        {discountPercent}% off
                                    </Typography>
                                </>
                            )}
                        </Box>

                        {/* Color / Size */}
                        {(product.color || product.size) && (
                            <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                                {product.color && (
                                    <Chip
                                        label={`Color: ${product.color}`}
                                        size="small"
                                        sx={{ backgroundColor: "#eef0f4", fontSize: 12.5 }}
                                    />
                                )}
                                {product.size && product.size !== "-" && (
                                    <Chip
                                        label={`Size: ${product.size}`}
                                        size="small"
                                        sx={{ backgroundColor: "#eef0f4", fontSize: 12.5 }}
                                    />
                                )}
                            </Box>
                        )}

                        <Divider sx={{ my: 2.5 }} />

                        {/* Description */}
                        <Typography sx={{ fontSize: 14, fontWeight: 600, color: "#1f2937", mb: 0.75 }}>
                            Description
                        </Typography>
                        <Typography sx={{ fontSize: 14, color: "#6b7280", lineHeight: 1.6 }}>
                            {product.description || "No description available."}
                        </Typography>

                        <Divider sx={{ my: 2.5 }} />

                        {/* Extra info */}
                        <InfoRow label="Product ID" value={product.id} />
                        <InfoRow label="Slug" value={product.slug} />
                        <InfoRow label="Stock Quantity" value={product.stockQty} />
                    </Box>
                </Stack>
            </DialogContent>
        </Dialog>
    );
};
export default ViewProductModal;