import { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Stack,
    FormLabel,
    Box,
    Button,
    Typography,
    IconButton,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client/react";
import { ADDCATEGORY, GETCATEGORIES } from "../../query/category";
import { BRAND_COLOR } from "../../constants/const";

const initialState = {
    categoryName: "",
    slug: "",
    description: "",
    isActive: true,
    categoryImage: "",
};

const AddCategoryModal = ({ open, handleClose }) => {
    const [category, setCategory] = useState(initialState);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState("");
    const [error, setError] = useState({
        categoryName: "",
        description: "",
    });

    const [addCategory] = useMutation(ADDCATEGORY, {
        refetchQueries: [{ query: GETCATEGORIES }],
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === "categoryName") {
            const autoSlug = value
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "");
            setCategory((prev) => ({ ...prev, categoryName: value, slug: autoSlug }));
            return;
        }
        setCategory((prev) => ({ ...prev, [name]: value }));
    };

    // const handleToggleActive = (event) => {
    //     setCategory((prev) => ({ ...prev, isActive: event.target.checked }));
    // };

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

    const validateCategory = () => {
        const newError = {};
        if (!category.categoryName.trim()) {
            newError.categoryName = "Category name is required.";
        }
        if (!category.description.trim()) {
            newError.description = "Description is required.";
        }
        setError((prev) => ({ ...prev, ...newError }));
        return Object.keys(newError).length === 0;
    };

    const isValidCategory =
        category.categoryName.trim() !== "" && category.description.trim() !== "";

    const handleAddCategory = async () => {
        try {
            const isValid = validateCategory();
            if (!isValid) {
                return;
            }

            await addCategory({
                variables: {
                    categoryName: category.categoryName,
                    slug: category.slug,
                    description: category.description,
                    isActive: category.isActive,
                    categoryImage: imagePreview,
                },
            });
            toast.success("Category has been successfully added.");
            setCategory(initialState);
            setImageFile(null);
            setImagePreview("");
            handleClose();
        } catch (error) {
            console.log(error);
            toast.error("Creating category failed.");
        }
    };

    const handleCancel = () => {
        setCategory(initialState);
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
                    Add Category
                </DialogTitle>
                <DialogContent>
                    <Stack spacing={2}>
                        <Box>
                            <FormLabel sx={{ fontSize: 13.5, color: "#374151" }}>Category Image</FormLabel>
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
                            <FormLabel sx={{ fontSize: 13.5, color: "#374151" }}>Category Name *</FormLabel>
                            <TextField
                                fullWidth
                                required
                                name="categoryName"
                                margin="dense"
                                placeholder="e.g. Electronics"
                                value={category.categoryName}
                                onChange={handleInputChange}
                                error={!!error.categoryName}
                                helperText={error.categoryName}
                            />
                        </Box>

                        <Box>
                            <FormLabel sx={{ fontSize: 13.5, color: "#374151" }}>Slug</FormLabel>
                            <TextField
                                fullWidth
                                name="slug"
                                margin="dense"
                                placeholder="auto-generated-from-name"
                                value={category.slug}
                                onChange={handleInputChange}
                            />
                        </Box>

                        <Box>
                            <FormLabel sx={{ fontSize: 13.5, color: "#374151" }}>Description *</FormLabel>
                            <TextField
                                fullWidth
                                required
                                name="description"
                                multiline
                                rows={3}
                                margin="dense"
                                placeholder="Short description of the category"
                                value={category.description}
                                onChange={handleInputChange}
                                error={!!error.description}
                                helperText={error.description}
                            />
                        </Box>
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ mt: 1 }}>
                    <Button onClick={handleCancel} sx={{ backgroundColor: '#1842BB', color: 'white' }}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleAddCategory}
                        disabled={!isValidCategory}
                        sx={{
                            textTransform: "none",
                            backgroundColor: isValidCategory ? BRAND_COLOR : "#e0e0e0",
                            color: "#fff",
                            px: 3,
                            "&:hover": { backgroundColor: isValidCategory ? BRAND_COLOR : "#e0e0e0", opacity: 0.9 },
                        }}
                    >
                        Add Category
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};
export default AddCategoryModal;