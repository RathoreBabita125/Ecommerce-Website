import { useState } from "react";
import {
    Stack, TextField, Button, Dialog, DialogTitle,
    DialogContent, DialogActions, FormControlLabel, Switch,
    MenuItem
} from "@mui/material";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@apollo/client/react";
import { CREATECOUPON, GETCOUPONS } from "../../query/coupon";
import { validateCoupon } from "../../validators/validateCoupon";
import { BRAND_COLOR } from "../../constants/const";
import { GETUSERS } from "../../query/user";
import LoadingCompo from "../../common/LoadingCompo";

const emptyCoupon = {
    couponCode: "",
    discount: "",
    minOrderValue: "",
    expiryDate: "",
    isActive: true,
};

const AddCouponModal = ({ open, onClose }) => {
    const [coupon, setCoupon] = useState(emptyCoupon);
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);

    const [createCoupon] = useMutation(CREATECOUPON, {
        refetchQueries: [GETCOUPONS]
    });

    const { data: userData, loading: userLoading } = useQuery(GETUSERS);

    if(userLoading) return <LoadingCompo/>

    const handleFieldChange = (event) => {
        const { name, value, checked, type } = event.target;
        setCoupon((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handleSaveCoupon = async () => {

        if (!validateCoupon(coupon, setErrors)) return;
        setSaving(true);

        try {
            const response = await createCoupon({
                variables: {
                    couponCode: coupon.couponCode.trim().toUpperCase(),
                    discount: Number(coupon.discount),
                    minOrderValue: Number(coupon.minOrderValue),
                    expiryDate: coupon.expiryDate,
                    isActive: coupon.isActive,
                    user:coupon.user
                }
            });

            if (response) {
                toast.success("Coupon created successfully.");
                setCoupon(emptyCoupon);
                setErrors(emptyCoupon);
                onClose();
            }
        } catch (error) {
            toast.error(`Failed to create coupon: ${error.message}`);
        } finally {
            setSaving(false);
        }
    };

    const customerUsers = userData?.getUsers?.filter((user) => user.role === "Customer");

    return (
        <Dialog
            open={open}
            onClose={(event, reason) => {
                if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
                    return;
                }
                onClose();
            }}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle sx={{ fontWeight: 700, color: '#1842BB' }}>
                Add New Coupon
            </DialogTitle>
            <DialogContent>
                <Stack spacing={2.5} sx={{ mt: 1 }}>
                    <TextField
                        label="Coupon Code"
                        name="couponCode"
                        fullWidth
                        value={coupon.couponCode}
                        onChange={handleFieldChange}
                        error={!!errors.couponCode}
                        helperText={errors.couponCode}
                        size="small"
                        required
                        inputProps={{ style: { textTransform: "uppercase" } }}
                    />

                    <TextField
                        label="Discount (%)"
                        name="discount"
                        type="number"
                        fullWidth
                        value={coupon.discount}
                        onChange={handleFieldChange}
                        error={!!errors.discount}
                        helperText={errors.discount}
                        size="small"
                        required
                        inputProps={{ min: 1, max: 90 }}
                    />

                    <TextField
                        label="Minimum Order Value (₹)"
                        name="minOrderValue"
                        type="number"
                        fullWidth
                        value={coupon.minOrderValue}
                        onChange={handleFieldChange}
                        error={!!errors.minOrderValue}
                        helperText={errors.minOrderValue}
                        size="small"
                        required
                        inputProps={{ min: 0 }}
                    />

                    <TextField
                        label="Expiry Date"
                        name="expiryDate"
                        type="date"
                        fullWidth
                        value={coupon.expiryDate}
                        onChange={handleFieldChange}
                        error={!!errors.expiryDate}
                        helperText={errors.expiryDate}
                        size="small"
                        required
                        slotProps={{
                            inputLabel: {
                                shrink: true
                            }
                        }}
                        inputProps={{ min: new Date().toISOString().split("T")[0] }}
                    />

                    <TextField
                        select
                        label="Assign to User (optional)"
                        name="user"
                        value={coupon.user}
                        onChange={handleFieldChange}
                        helperText="Leave empty for a general coupon"
                    >
                        <MenuItem value="">
                            <em>None (General coupon)</em>
                        </MenuItem>
                        {customerUsers.map((u) => (
                            <MenuItem key={u.id} value={u.id}>
                                {u.firstName} ({u.email})
                            </MenuItem>
                        ))}
                    </TextField>

                    <FormControlLabel
                        control={
                            <Switch
                                checked={coupon.isActive}
                                onChange={handleFieldChange}
                                name="isActive"
                                sx={{
                                    "& .MuiSwitch-switchBase.Mui-checked": { color: "#1842BB" },
                                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { backgroundColor: "#1842BB" },
                                }}
                            />
                        }
                        label="Active"
                    />
                </Stack>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2.5 }}>
                <Button
                    onClick={onClose}
                    variant="outlined"
                    sx={{ color: BRAND_COLOR, textTransform: "none", fontWeight: 600 }}
                    disabled={saving}
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleSaveCoupon}
                    variant="contained"
                    sx={{
                        bgcolor: "#1842BB", fontWeight: 700, textTransform: "none", px: 3,
                        "&:hover": { bgcolor: "#496edc" },
                    }}
                    disabled={saving}
                >
                    {saving ? "Creating..." : "Create Coupon"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
export default AddCouponModal;