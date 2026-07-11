import { Box, Typography, Stack, IconButton, Button, Divider, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/Delete";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { GST_PERCENT, SHIPPING_CHARGE } from "../../constants/const";

const CartPage = () => {
    const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);
    const navigate = useNavigate();

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalMrp = cartItems.reduce((sum, item) => sum + (item.price + item.price * 10 / 100) * item.quantity, 0);
    const discount = totalMrp - subtotal;
    const gstAmount = Math.round((subtotal * GST_PERCENT) / 100);
    const shipping = cartItems.length > 0 ? SHIPPING_CHARGE : 0;
    const totalAmount = subtotal + gstAmount + shipping;

    const handlePlaceOrder = () => {
        if (cartItems.length === 0) return;
        navigate("/checkout");
    };

    if (cartItems.length === 0) {
        return (
            <Box sx={{ textAlign: "center", py: 10 }}>
                <Typography variant="h5" sx={{ mb: 2 }}>Your cart is empty</Typography>
                <Button variant="contained" onClick={() => navigate("/")} sx={{ bgcolor: "#1842BB" }}>
                    Continue Shopping
                </Button>
            </Box>
        );
    }

    return (
        <Box sx={{ maxWidth: "1200px", mx: "auto", px: { xs: 2, md: 4 }, py: 4 }}>
            <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
                My Cart ({cartItems.length} {cartItems.length === 1 ? "item" : "items"})
            </Typography>
            <Box sx={{ display: "flex", gap: 3, flexDirection: { xs: "column", md: "row" } }}>
                <Box sx={{ flex: 2 }}>
                    <Paper sx={{ p: 2 }}>
                        {cartItems.map((item, idx) => (
                            <Box key={item.id}>
                                <Stack direction="row" spacing={2} sx={{ py: 2 }}>
                                    <img
                                        src={item.productImage}
                                        alt={item.productName}
                                        style={{ width: 110, height: 130, objectFit: "cover", borderRadius: 4 }}
                                    />
                                    <Box sx={{ flex: 1 }}>
                                        <Typography fontWeight={700}>{item.brand}</Typography>
                                        <Typography sx={{ color: "#666", fontSize: 14 }} noWrap>
                                            {item.productName}
                                        </Typography>

                                        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mt: 1 }}>
                                            <Typography fontWeight={700}>₹{item.price}</Typography>
                                            <Typography sx={{ color: "#999", textDecoration: "line-through", fontSize: 14 }}>
                                                {/* ₹{item.price+(item.price*10/100)} */}
                                            </Typography>
                                        </Stack>

                                        <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 1.5 }}>
                                            <IconButton
                                                size="small"
                                                sx={{ border: "1px solid #ddd" }}
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            >
                                                <RemoveIcon fontSize="small" />
                                            </IconButton>
                                            <Typography sx={{ fontWeight: 600, minWidth: 20, textAlign: "center" }}>
                                                {item.quantity}
                                            </Typography>
                                            <IconButton
                                                size="small"
                                                sx={{ border: "1px solid #ddd" }}
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            >
                                                <AddIcon fontSize="small" />
                                            </IconButton>

                                            <IconButton
                                                size="small"
                                                onClick={() => removeFromCart(item.id)}
                                                sx={{ ml: 2, color: "#999" }}
                                            >
                                                <DeleteOutlineIcon fontSize="small" />
                                            </IconButton>
                                        </Stack>
                                    </Box>

                                    <Typography fontWeight={700} sx={{ minWidth: 80, textAlign: "right" }}>
                                        ₹{item.price * item.quantity}
                                    </Typography>
                                </Stack>
                                {idx < cartItems.length - 1 && <Divider />}
                            </Box>
                        ))}
                    </Paper>
                </Box>

                {/* Order summary */}
                <Box sx={{ flex: 1 }}>
                    <Paper sx={{ p: 2.5, position: "sticky", top: 90 }}>
                        <Typography fontWeight={700} sx={{ mb: 2, color: "#999", fontSize: 14 }}>
                            PRICE DETAILS ({cartItems.length} {cartItems.length === 1 ? "Item" : "Items"})
                        </Typography>

                        <Stack spacing={1.8}>
                            <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                                <Typography sx={{ fontSize: 14, color: "#666" }}>Total MRP</Typography>
                                <Typography sx={{ fontSize: 14 }}>₹{totalMrp}</Typography>
                            </Stack>

                            <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                                <Typography sx={{ fontSize: 14, color: "#666" }}>Discount on MRP</Typography>
                                <Typography sx={{ fontSize: 14, color: "#03a685" }}>- ₹{discount}</Typography>
                            </Stack>

                            <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                                <Typography sx={{ fontSize: 14, color: "#666" }}>GST (5%)</Typography>
                                <Typography sx={{ fontSize: 14 }}>₹{gstAmount}</Typography>
                            </Stack>

                            <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                                <Typography sx={{ fontSize: 14, color: "#666" }}>Shipping Charge</Typography>
                                <Typography sx={{ fontSize: 14 }}>₹{shipping}</Typography>
                            </Stack>
                        </Stack>

                        <Divider sx={{ my: 2 }} />

                        <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                            <Typography fontWeight={700} fontSize={16}>Total Amount</Typography>
                            <Typography fontWeight={700} fontSize={16}>₹{totalAmount}</Typography>
                        </Stack>

                        <Button
                            fullWidth
                            variant="contained"
                            onClick={handlePlaceOrder}
                            sx={{
                                mt: 3, py: 1.5, bgcolor: "#1842BB",
                                fontWeight: 700, fontSize: 16, textTransform: "none",
                                "&:hover": { bgcolor: "#496edc" }
                            }}
                        >
                            PLACE ORDER
                        </Button>
                    </Paper>
                </Box>
            </Box>
        </Box>
    );
}
export default CartPage;