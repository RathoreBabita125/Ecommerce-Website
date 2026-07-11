import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client/react";
import { GETCATEGORIES, UPDATECATEGORYSTATUS } from "../../query/category";

const DeleteCategoryModal = ({ open, handleClose, categoryToDelete }) => {
    const [updateStatus, { loading }] = useMutation(UPDATECATEGORYSTATUS, {
        refetchQueries: [{ query: GETCATEGORIES }],
    });

    const isCurrentlyActive = Boolean(categoryToDelete?.isActive);
    const actionLabel = isCurrentlyActive ? "Deactivate" : "Activate";

    const handleConfirmUpdate = async () => {
        try {
            await updateStatus({
                variables: { id: categoryToDelete?.id },
            });
            toast.success(
                `Category has been ${isCurrentlyActive ? "deactivated" : "activated"} successfully.`
            );
            handleClose();
        } catch (error) {
            console.log(error);
            toast.error("Updating category failed.");
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
            <DialogContent sx={{ pt: 4, pb: 2, textAlign: "center" }}>
                <Box
                    sx={{
                        width: 56,
                        height: 56,
                        borderRadius: "50%",
                        backgroundColor: "#fee2e2",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mx: "auto",
                        mb: 2,
                    }}
                >
                    <WarningAmberIcon sx={{ color: "#FFC107", fontSize: 28 }} />
                </Box>

                <DialogTitle sx={{ p: 0, fontWeight: 600, fontSize: 18, color: "#1f2937" }}>
                    Are you sure you want to {actionLabel.toLowerCase()} this category?
                </DialogTitle>

                <Typography sx={{ fontSize: 14, color: "#6b7280", mt: 1 }}>
                    {categoryToDelete?.categoryName
                        ? `"${categoryToDelete.categoryName}" will be ${
                              isCurrentlyActive ? "deactivated" : "activated"
                          }. This action can be undone.`
                        : "This action can be undone."}
                </Typography>

                {isCurrentlyActive && categoryToDelete?.product?.length > 0 && (
                    <Typography sx={{ fontSize: 13, color: "#dc2626", mt: 1.5, fontWeight: 500 }}>
                        Warning: {categoryToDelete.product.length} product(s) are linked to this category.
                    </Typography>
                )}
            </DialogContent>

            <DialogActions sx={{ justifyContent: "center", pb: 3, gap: 1.5 }}>
                <Button
                    onClick={handleClose}
                    disabled={loading}
                    sx={{
                        textTransform: "none",
                        color: "#374151",
                        border: "1px solid #d1d5db",
                        px: 3,
                        "&:hover": { backgroundColor: "#f3f4f6" },
                    }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleConfirmUpdate}
                    disabled={loading}
                    color="warning"
                    sx={{
                        textTransform: "none",
                        backgroundColor: "#FFC107",
                        color: "#fff",
                        px: 3,
                        "&:hover": { backgroundColor: "#FFC107" },
                    }}
                >
                    {loading ? "Updating..." : actionLabel}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
export default DeleteCategoryModal;