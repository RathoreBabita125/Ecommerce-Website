import {Dialog,DialogTitle,DialogContent,DialogActions,Button,Typography,Box,} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client/react";
import { DELETEPRODUCT, GETPRODUCTS } from "../../query/product";

const DeleteProductModal = ({ open, handleClose, productToDelete }) => {
    const [deleteProduct, { loading }] = useMutation(DELETEPRODUCT, {
        refetchQueries: [{ query: GETPRODUCTS }],
    });

    const handleConfirmDelete = async () => {
        try {
            await deleteProduct({
                variables: { id: productToDelete?.id },
            });
            toast.success("Product has been deleted successfully.");
            handleClose();
        } catch (error) {
            console.log(error);
            toast.error("Deleting product failed.");
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
                    <WarningAmberIcon sx={{ color: "#dc2626", fontSize: 28 }} />
                </Box>

                <DialogTitle sx={{ p: 0, fontWeight: 600, fontSize: 18, color: "#1f2937" }}>
                    Are you sure you want to delete this product?
                </DialogTitle>

                <Typography sx={{ fontSize: 14, color: "#6b7280", mt: 1 }}>
                    {productToDelete?.productName
                        ? `"${productToDelete.productName}" will be permanently removed. This action cannot be undone.`
                        : "This action cannot be undone."}
                </Typography>
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
                    onClick={handleConfirmDelete}
                    disabled={loading}
                    sx={{
                        textTransform: "none",
                        backgroundColor: "#dc2626",
                        color: "#fff",
                        px: 3,
                        "&:hover": { backgroundColor: "#b91c1c" },
                    }}
                >
                    {loading ? "Deleting..." : "Delete"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
export default DeleteProductModal;