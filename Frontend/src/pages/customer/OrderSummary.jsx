import { Box, Button, Divider, Paper, Stack, Typography } from "@mui/material";
import { useQuery } from "@apollo/client/react";
import { GETCART } from "../../query/cart";
import LoadingCompo from "../../common/LoadingCompo";

const OrderSummary = ({selectedId}) => {

    const { data: cartData, loading: cartLoading } = useQuery(GETCART);
    const GST_PERCENT = 5;
    const SHIPPING_CHARGE = 49; 

    if (cartLoading) return <LoadingCompo />

    const subtotal = cartData?.getCart?.items?.
        reduce((sum, cartItem) =>
            sum + (cartItem.price * cartItem.quantity), 0);

    const totalMrp = cartData?.getCart?.items?.
        reduce((sum, cartItem) =>
            sum + ((cartItem?.price - (cartItem?.price * (cartItem?.product?.discountPrice) / 100)) * cartItem.quantity), 0);

    const discount = Math.round(subtotal - totalMrp);
    const gstAmount = Math.round((subtotal * GST_PERCENT) / 100);
    const shipping = cartData?.getCart?.items?.length > 0 ? SHIPPING_CHARGE : 0;
    const totalAmount = subtotal + gstAmount + shipping;

    const handlePlaceOrder = () => {
        if (!selectedId) {
            alert("Please select or add a delivery address.");
            return;
        }
        alert("Order placed successfully!");
    };

    return (
        <>
            <Box sx={{ flex: 1, width: "100%" }}>
                <Paper sx={{ p: 2.5, position: "sticky", top: 90 }}>
                    <Typography fontWeight={700} sx={{ mb: 2, color: "#999", fontSize: 14 }}>
                        ORDER SUMMARY ({cartData?.getCart?.items?.length} {cartData?.getCart?.items?.length === 1 ? "Item" : "Items"})
                    </Typography>

                    <Stack spacing={1.5} sx={{ mb: 2 }}>
                        {cartData?.getCart?.items?.map((item) => (
                            <Stack direction="row" spacing={1.5} key={item.id} alignItems="center">
                                <img
                                    src={item?.product?.productImage}
                                    alt={item?.product?.productName}
                                    style={{ width: 44, height: 52, objectFit: "cover", borderRadius: 4 }}
                                />
                                <Box sx={{ flex: 1, minWidth: 0 }}>
                                    <Typography sx={{ fontSize: 13, fontWeight: 700 }} noWrap>
                                        {item?.product?.brand}
                                    </Typography>
                                    <Typography sx={{ fontSize: 12.5, color: "#888" }} noWrap>
                                        {item?.product?.productName} × {item.quantity}
                                    </Typography>
                                </Box>
                                <Typography sx={{ fontSize: 13.5, fontWeight: 700 }}>
                                    ₹{item.price * item.quantity}
                                </Typography>
                            </Stack>
                        ))}
                    </Stack>

                    <Divider sx={{ mb: 2 }} />

                    <Stack spacing={1.8}>
                        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                            <Typography sx={{ fontSize: 14, color: "#666" }}>Total MRP</Typography>
                            <Typography sx={{ fontSize: 14 }}>₹{totalMrp}</Typography>
                        </Stack>
                        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                            <Typography sx={{ fontSize: 14, color: "#666" }}>Discount on MRP</Typography>
                            <Typography sx={{ fontSize: 14, color: "#03a685" }}>₹{discount}</Typography>
                        </Stack>
                        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                            <Typography sx={{ fontSize: 14, color: "#666" }}>GST ({GST_PERCENT}%)</Typography>
                            <Typography sx={{ fontSize: 14 }}>₹{gstAmount}</Typography>
                        </Stack>
                        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                            <Typography sx={{ fontSize: 14, color: "#666" }}>Shipping Charge</Typography>
                            <Typography sx={{ fontSize: 14 }}>₹{shipping}</Typography>
                        </Stack>
                    </Stack>

                    <Divider sx={{ my: 2 }} />

                    <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                        <Typography fontWeight={700} fontSize={16}>Total Amount</Typography>
                        <Typography fontWeight={700} fontSize={16}>₹{totalAmount}</Typography>
                    </Stack>

                    <Button
                        fullWidth
                        variant="contained"
                        onClick={handlePlaceOrder}
                        disabled={!selectedId}
                        sx={{
                            mt: 3, py: 1.5, bgcolor: "#1842BB",
                            fontWeight: 700, fontSize: 16, textTransform: "none",
                            "&:hover": { bgcolor: "#496edc" },
                        }}
                    >
                        PLACE ORDER
                    </Button>
                    {!selectedId && (
                        <Typography sx={{ fontSize: 12.5, color: "#c62828", mt: 1, textAlign: "center" }}>
                            Select or add a delivery address to continue
                        </Typography>
                    )}
                </Paper>
            </Box>
        </>
    )
}
export default OrderSummary;