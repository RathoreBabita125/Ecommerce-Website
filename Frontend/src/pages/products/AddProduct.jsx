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
import { useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import { validateProducts } from "../../validators/productValidate";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@apollo/client/react";
import { ADDPRODUCT, GETPRODUCTS } from "../../query/product";
import { GETCATEGORIES } from "../../query/category";
import { BRAND_COLOR, colors, sizes, statuses } from "../../constants/const";

const initialState = {
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
    status: "",
    productImage: ""
};

const AddProductModal = ({ open, handleClose }) => {
    const newError = {};
    const [product, setProduct] = useState(initialState);
    const [imageFile, setImageFile] = useState(null);       
    const [imagePreview, setImagePreview] = useState("");   
    const [addProduct] = useMutation(ADDPRODUCT, {
        refetchQueries: [{ query: GETPRODUCTS }],
    });
    const { loading: categoryLoading, data: categoryData } = useQuery(GETCATEGORIES,);
    const [error, setError] = useState({
        productName: "",
        description: "",
        brand: "",
        category: "",
        price: "",
        stockQty: "",
    });

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

    const compressImage = (file, maxWidth = 500) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    const scale = maxWidth / img.width;
                    canvas.width = maxWidth;
                    canvas.height = img.height * scale;

                    const ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                    resolve(canvas.toDataURL("image/jpeg", 0.7)); 
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        });
    };

    const handleImageChange = async (event) => {
        const file = event.target.files?.[0];
        if (!file) return;
        setImageFile(file);

        const compressed = await compressImage(file);
        setImagePreview(compressed);
    };

    const handleRemoveImage = () => {
        setImageFile(null);
        setImagePreview("");
    };

    const isValidProduct =
        product.productName.trim() !== "" &&
        product.brand.trim() !== "" &&
        product.category !== "" &&
        product.price !== "" &&
        product.stockQty !== "";

    const handleAddProduct = async () => {
        try {
            const isValidProduct = validateProducts(product, setError, newError);
            if (!isValidProduct) {
                return;
            }

            const response = await addProduct({
                variables: {
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
                }
            });
            toast.success("Product has been successfully added.");
            setProduct(initialState);
            setImageFile(null);
            setImagePreview("");
            handleClose();
        } catch (error) {
            console.log(error);
            toast.error("Creation product is failed.");
        }
    };

    const handleCancel = () => {
        setProduct(initialState);
        setImageFile(null);
        setImagePreview("");
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
                    Add Product
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
                                placeholder="Product name"
                                value={product.productName}
                                onChange={handleInputChange}
                            />
                        </Box>
                        <Box>
                            <FormLabel sx={{ fontSize: 13.5, color: "#374151" }}>Slug</FormLabel>
                            <TextField
                                fullWidth
                                name="slug"
                                margin="dense"
                                placeholder="auto-generated-from-name"
                                value={product.slug}
                                onChange={handleInputChange}
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
                                placeholder="Short description of the product"
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
                                    placeholder="Brand name"
                                    value={product.brand}
                                    onChange={handleInputChange}
                                />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <FormLabel sx={{ fontSize: 13.5, color: "#374151" }}>Category *</FormLabel>
                                <FormControl fullWidth margin="dense">
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
                                    placeholder="Price"
                                    value={product.price}
                                    onChange={handleInputChange}
                                />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <FormLabel sx={{ fontSize: 13.5, color: "#374151" }}>Discount Price</FormLabel>
                                <TextField
                                    fullWidth
                                    type="number"
                                    name="discountPrice"
                                    margin="dense"
                                    placeholder="Discount price"
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
                                    placeholder="Stock quantity"
                                    value={product.stockQty}
                                    onChange={handleInputChange}
                                />
                            </Box>
                        </Stack>

                        <Box>
                            <FormLabel sx={{ fontSize: 13.5, color: "#374151" }}>Status *</FormLabel>
                            <FormControl fullWidth margin="dense">
                                <Select name="status" value={product.status} onChange={handleInputChange}>
                                    <MenuItem value="" disabled>Select Status</MenuItem>
                                    {statuses.map((status) => (
                                        <MenuItem value={status} key={status}>
                                            {status}
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
                        onClick={handleAddProduct}
                        disabled={!isValidProduct}
                        sx={{
                            textTransform: "none",
                            backgroundColor: isValidProduct ? BRAND_COLOR : "#e0e0e0",
                            color: "#fff",
                            px: 3,
                            "&:hover": { backgroundColor: isValidProduct ? BRAND_COLOR : "#e0e0e0", opacity: 0.9 },
                        }}
                    >
                        Add Product
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};
export default AddProductModal;