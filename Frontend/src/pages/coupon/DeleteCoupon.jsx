import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { DELETECOUPON, GETCOUPONS } from "../../query/coupon";
import { useMutation } from "@apollo/client/react";
import { toast } from 'react-toastify';
import { BRAND_COLOR } from "../../constants/const";

const DeleteCoupon = ({ open, onClose, selectedCoupon }) => {

    const [deleteCoupon] = useMutation(DELETECOUPON, {
        refetchQueries: [GETCOUPONS]
    });

    const handleConfirmDelete = async () => {
        try {
            const response = await deleteCoupon({
                variables: {
                    id: selectedCoupon.id
                }
            });
            if (response) {
                toast.success("Coupon has been deleted successfully.");
                onClose();
            }
        } catch (error) {
            toast.error(`Coupon deletion failed: ${error.message}`);
        }
    }

    return (
        <Dialog
            open={open}
            onClose={(event, reason) => {
                if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
                    return;
                }
                onClose();
            }}
        >
            <DialogTitle sx={{ fontWeight: 700, color: '#1842BB' }}>Delete Coupon</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete this coupon?
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button
                    onClick={onClose}
                    sx={{ textTransform: "none", fontWeight: 600 }}
                    variant="outlined"
                >
                    No
                </Button>
                <Button
                    onClick={handleConfirmDelete}
                    variant="contained"
                    sx={{ bgcolor: BRAND_COLOR, textTransform: "none", fontWeight: 600, } }
                >
                    Yes, Delete
                </Button>
            </DialogActions>
        </Dialog>
    )
}
export default DeleteCoupon;