export const validateCoupon = (coupon, setErrors) => {
    const newErrors = {};

    if (!coupon.couponCode.trim()) {
        newErrors.couponCode = "Coupon code is required";
    } else if (!/^[A-Z0-9]{4,15}$/.test(coupon.couponCode.trim().toUpperCase())) {
        newErrors.couponCode = "Useletters and numbers only";
    }
    else if(coupon.couponCode>=8){
        newErrors.couponCode = "Coupon code can be of 8 length character.";
    }

    if (!coupon.discount) {
        newErrors.discount = "Discount is required";
    } else if (Number(coupon.discount) <= 0) {
        newErrors.discount = "Discount must be greater than 0";
    } else if (Number(coupon.discount) > 90) {
        newErrors.discount = "Discount cannot exceed 90%";
    }

    if (coupon.minOrderValue === "") {
        newErrors.minOrderValue = "Minimum order value is required";
    } else if (Number(coupon.minOrderValue) < 0) {
        newErrors.minOrderValue = "Minimum order value cannot be negative";
    }

    if (!coupon.expiryDate) {
        newErrors.expiryDate = "Expiry date is required";
    } else {
        const selectedDate = new Date(coupon.expiryDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) {
            newErrors.expiryDate = "Expiry date must be in the future";
        }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};