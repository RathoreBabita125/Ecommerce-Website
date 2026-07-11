import { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Select,
    MenuItem,
    Stack,
    FormControl,
    FormLabel,
    Box,
    Button,
    Typography,
    IconButton,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@apollo/client/react";
import { EDITPRODUCT } from "../../query/product";
import { GETCATEGORIES } from "../../query/category";
import { GETPRODUCTS } from "../../query/product";
import { BRAND_COLOR, colors, sizes, statuses } from "../../constants/const";

const emptyState = {
    id: "",
    productName: "",
    slug: "",
    brand: "",
    category: "",
    color: "",
    size: "",
    description: "",
    price: "",
    discountPrice: "",
    stockQty: "",
    status: "Active",
    productImage: "",
};

const mapRowToFormState = (row) => ({
    id: row?.id ?? "",
    productName: row?.productName ?? "",
    slug: row?.slug ?? "",
    brand: row?.brand ?? "",
    category: row?.category?.id ?? "",
    color: row?.color ?? "",
    size: row?.size ?? "",
    description: row?.description ?? "",
    price: row?.price ?? "",
    discountPrice: row?.discountPrice ?? "",
    stockQty: row?.stockQty ?? "",
    status: row?.status ?? "Active",
    productImage: row?.productImage ?? "",
});

const EditProductModal = ({ open, handleClose, productToEdit }) => {
    const [product, setProduct] = useState(emptyState);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState("");
    const [editProduct] = useMutation(EDITPRODUCT, {
        refetchQueries: [{ query: GETPRODUCTS }],
    });
    const { loading: categoryLoading, data: categoryData } = useQuery(GETCATEGORIES);
    const [error, setError] = useState({
        productName: "",
        description: "",
        brand: "",
        category: "",
        price: "",
        stockQty: "",
    });

    useEffect(() => {
        if (productToEdit) {
            const mapped = mapRowToFormState(productToEdit);
            setProduct(mapped);
            setImagePreview(mapped.productImage);
            setImageFile(null);
        }
    }, [productToEdit]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === "productName") {
            const autoSlug = value
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "");
            setProduct((prev) => ({ ...prev, productName: value, slug: autoSlug }));
            return;
        }
        setProduct((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (event) => {
        const file = event.target.files?.[0];
        if (!file) return;
        setImageFile(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleRemoveImage = () => {
        setImageFile(null);
        setImagePreview("");
    };

    const validateEditInputs = () => {
        const newError = {};
        if (!product.productName || product.productName.trim() === "") {
            newError.productName = "Product name field is required.";
        }
        if (!product.brand || product.brand.trim() === "") {
            newError.brand = "Brand field is required.";
        }
        if (!product.category) {
            newError.category = "Category field is required.";
        }
        if (!product.price) {
            newError.price = "Price field is required.";
        }
        if (!product.stockQty) {
            newError.stockQty = "Stock quantity field is required.";
        }
        setError(newError);
        return Object.keys(newError).length === 0;
    };

    const isValidProduct =
        product.productName.trim() !== "" &&
        product.brand.trim() !== "" &&
        product.category !== "" &&
        product.price !== "" &&
        product.stockQty !== "";

    const handleUpdateProduct = async () => {
        try {
            if (!validateEditInputs()) {
                return;
            }
            await editProduct({
                variables: {
                    id:product.id,
                    productName: product.productName,
                    slug: product.slug,
                    brand: product.brand,
                    category: product.category,
                    color: product.color,
                    size: product.size,
                    description: product.description,
                    price: Number(product.price),
                    discountPrice: product.discountPrice ? Number(product.discountPrice) : null,
                    stockQty: Number(product.stockQty),
                    status: product.status,
                    productImage: imagePreview,
                },
            });
            toast.success("Product has been updated successfully.");
            handleClose();
        } catch (error) {
            console.log(error);
            toast.error("Updating product failed.");
        }
    };

    const handleCancel = () => {
        handleClose();
    };

    return (
        <Dialog
            open={open}
            fullWidth
            maxWidth="sm"
            onClose={(event, reason) => {
                if (reason === "backdropClick" || reason === "escapeKeyDown") {
                    return;
                }
                handleCancel();
            }}
        >
            <Box sx={{ padding: 2 }}>
                <DialogTitle sx={{ fontWeight: 600, fontSize: 22, color: "#1f2937" }}>
                    Edit Product
                </DialogTitle>
                <DialogContent>
                    <Stack spacing={2}>
                        <Box>
                            <FormLabel sx={{ fontSize: 13.5, color: "#374151" }}>Product Image</FormLabel>
                            <Box
                                sx={{
                                    mt: 1,
                                    border: "1.5px dashed #cbd5e1",
                                    borderRadius: 2,
                                    p: 2,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 2,
                                    backgroundColor: "#fafafa",
                                }}
                            >
                                {imagePreview ? (
                                    <Box sx={{ position: "relative" }}>
                                        <Box
                                            component="img"
                                            src={imagePreview}
                                            alt="preview"
                                            sx={{
                                                width: 72,
                                                height: 72,
                                                borderRadius: 1.5,
                                                objectFit: "cover",
                                                border: "1px solid #eef0f4",
                                            }}
                                        />
                                        <IconButton
                                            size="small"
                                            onClick={handleRemoveImage}
                                            sx={{
                                                position: "absolute",
                                                top: -8,
                                                right: -8,
                                                backgroundColor: "#fff",
                                                border: "1px solid #eef0f4",
                                                width: 20,
                                                height: 20,
                                                "&:hover": { backgroundColor: "#fee2e2" },
                                            }}
                                        >
                                            <CloseIcon sx={{ fontSize: 13 }} />
                                        </IconButton>
                                    </Box>
                                ) : (
                                    <Box
                                        sx={{
                                            width: 72,
                                            height: 72,
                                            borderRadius: 1.5,
                                            backgroundColor: "#eef0f4",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            color: "#9ca3af",
                                        }}
                                    >
                                        <CloudUploadIcon />
                                    </Box>
                                )}
                                <Box>
                                    <Button
                                        component="label"
                                        variant="outlined"
                                        size="small"
                                        startIcon={<CloudUploadIcon sx={{ fontSize: 16 }} />}
                                        sx={{ textTransform: "none", borderColor: BRAND_COLOR, color: BRAND_COLOR }}
                                    >
                                        {imagePreview ? "Change Image" : "Upload Image"}
                                        <input type="file" accept="image/*" hidden onChange={handleImageChange} />
                                    </Button>
                                    <Typography sx={{ fontSize: 12, color: "#9ca3af", mt: 0.75 }}>
                                        {imageFile ? imageFile.name : "PNG or JPG, up to 5MB"}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box>
                            <FormLabel sx={{ fontSize: 13.5, color: "#374151" }}>Product Name *</FormLabel>
                            <TextField
                                fullWidth
                                required
                                name="productName"
                                margin="dense"
                                value={product.productName}
                                onChange={handleInputChange}
                                error={Boolean(error.productName)}
                                helperText={error.productName}
                            />
                        </Box>
                        <Box>
                            <FormLabel sx={{ fontSize: 13.5, color: "#374151" }}>Slug</FormLabel>
                            <TextField
                                fullWidth
                                name="slug"
                                margin="dense"
                                value={product.slug}
                                onChange={handleInputChange}
                                helperText="Auto-generated from product name, edit if needed"
                            />
                        </Box>
                        <Box>
                            <FormLabel sx={{ fontSize: 13.5, color: "#374151" }}>Description</FormLabel>
                            <TextField
                                fullWidth
                                name="description"
                                multiline
                                rows={3}
                                margin="dense"
                                value={product.description}
                                onChange={handleInputChange}
                            />
                        </Box>
                        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                            <Box sx={{ flex: 1 }}>
                                <FormLabel sx={{ fontSize: 13.5, color: "#374151" }}>Brand *</FormLabel>
                                <TextField
                                    fullWidth
                                    required
                                    name="brand"
                                    margin="dense"
                                    value={product.brand}
                                    onChange={handleInputChange}
                                    error={Boolean(error.brand)}
                                    helperText={error.brand}
                                />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <FormLabel sx={{ fontSize: 13.5, color: "#374151" }}>Category *</FormLabel>
                                <FormControl fullWidth margin="dense" error={Boolean(error.category)}>
                                    <Select
                                        name="category"
                                        value={product.category}
                                        onChange={handleInputChange}
                                        displayEmpty
                                        disabled={categoryLoading}
                                    >
                                        <MenuItem value="" disabled>
                                            {categoryLoading ? "Loading categories..." : "Select Category"}
                                        </MenuItem>
                                        {categoryData?.getCategories?.map((cat) => (
                                            <MenuItem value={cat.id} key={cat.id}>
                                                {cat.categoryName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        </Stack>
                        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                            <Box sx={{ flex: 1 }}>
                                <FormLabel sx={{ fontSize: 13.5, color: "#374151" }}>Color</FormLabel>
                                <FormControl fullWidth margin="dense">
                                    <Select name="color" value={product.color} onChange={handleInputChange} displayEmpty>
                                        <MenuItem value="" disabled>
                                            Select Color
                                        </MenuItem>
                                        {colors.map((c) => (
                                            <MenuItem value={c} key={c}>
                                                {c}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <FormLabel sx={{ fontSize: 13.5, color: "#374151" }}>Size</FormLabel>
                                <FormControl fullWidth margin="dense">
                                    <Select name="size" value={product.size} onChange={handleInputChange} displayEmpty>
                                        <MenuItem value="" disabled>
                                            Select Size
                                        </MenuItem>
                                        {sizes.map((s) => (
                                            <MenuItem value={s} key={s}>
                                                {s}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        </Stack>
                        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                            <Box sx={{ flex: 1 }}>
                                <FormLabel sx={{ fontSize: 13.5, color: "#374151" }}>Price *</FormLabel>
                                <TextField
                                    fullWidth
                                    required
                                    type="number"
                                    name="price"
                                    margin="dense"
                                    value={product.price}
                                    onChange={handleInputChange}
                                    error={Boolean(error.price)}
                                    helperText={error.price}
                                />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <FormLabel sx={{ fontSize: 13.5, color: "#374151" }}>Discount Price</FormLabel>
                                <TextField
                                    fullWidth
                                    type="number"
                                    name="discountPrice"
                                    margin="dense"
                                    value={product.discountPrice}
                                    onChange={handleInputChange}
                                />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <FormLabel sx={{ fontSize: 13.5, color: "#374151" }}>Stock Qty *</FormLabel>
                                <TextField
                                    fullWidth
                                    required
                                    type="number"
                                    name="stockQty"
                                    margin="dense"
                                    value={product.stockQty}
                                    onChange={handleInputChange}
                                    error={Boolean(error.stockQty)}
                                    helperText={error.stockQty}
                                />
                            </Box>
                        </Stack>
                        <Box>
                            <FormLabel sx={{ fontSize: 13.5, color: "#374151" }}>Status *</FormLabel>
                            <FormControl fullWidth margin="dense">
                                <Select name="status" value={product.status} onChange={handleInputChange}>
                                    {statuses.map((s) => (
                                        <MenuItem value={s} key={s}>
                                            {s}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ mt: 1 }}>
                    <Button onClick={handleCancel} sx={{ backgroundColor: '#1842BB', color: 'white' }}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleUpdateProduct}
                        disabled={!isValidProduct}
                        sx={{
                            textTransform: "none",
                            backgroundColor: isValidProduct ? BRAND_COLOR : "#e0e0e0",
                            color: "#fff",
                            px: 3,
                            "&:hover": { backgroundColor: isValidProduct ? BRAND_COLOR : "#e0e0e0", opacity: 0.9 },
                        }}
                    >
                        Save Changes
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};
export default EditProductModal;