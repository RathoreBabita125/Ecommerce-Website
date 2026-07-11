import { useState } from "react";
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Button,
    Chip,
    Divider,
    Select,
    MenuItem,
    FormControl,
    Grid,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PersonIcon from "@mui/icons-material/Person";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { BRAND_COLOR } from "../../constants/const";

const order = {
    id: "ORD-1003",
    orderStatus: "Shipped",
    paymentMethod: "CARD",
    paymentStatus: "Paid",
    placedAt: "30 Jun 2026, 4:12 PM",
    subTotal: 5750.0,
    discountAmount: 350.0,
    taxAmount: 180.0,
    shippingCharge: 99.0,
    totalAmount: 5679.0,
    customer: {
        name: "Sneha Iyer",
        email: "sneha.iyer@example.com",
        phone: "+91 98765 43210",
    },
    address: {
        line: "204, Silver Oak Residency, MG Road",
        city: "Pune",
        state: "Maharashtra",
        pincode: "411001",
    },
    items: [
        { id: 1, product: "Wireless Mouse X2", quantity: 2, price: 1499.0, discount: 100.0 },
        { id: 2, product: "Bluetooth Speaker Mini", quantity: 1, price: 2999.0, discount: 200.0 },
        { id: 3, product: "Ceramic Coffee Mug", quantity: 2, price: 375.5, discount: 25.0 },
    ],
};

const statusSteps = ["Pending", "Confirmed", "Packed", "Shipped", "Delivered"];

function orderStatusColor(status) {
    switch (status) {
        case "Delivered":
            return "success";
        case "Cancelled":
            return "error";
        case "Shipped":
        case "Packed":
            return "info";
        case "Confirmed":
            return "primary";
        default:
            return "warning";
    }
}

function paymentStatusColor(status) {
    if (status === "Paid") return "success";
    if (status === "Failed") return "error";
    return "warning";
}

const currency = (val) =>
    `₹${val.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const SectionCard = ({ icon, title, children, sx }) => (
    <Paper
        elevation={0}
        sx={{
            p: { xs: 2, sm: 2.5 },
            borderRadius: 2,
            backgroundColor: "#ffffff",
            border: "1px solid #eef0f4",
            ...sx,
        }}
    >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.75 }}>
            <Box sx={{ color: BRAND_COLOR, display: "flex" }}>{icon}</Box>
            <Typography sx={{ fontSize: 15.5, fontWeight: 600, color: "#1f2937" }}>{title}</Typography>
        </Box>
        {children}
    </Paper>
);

const OrderItem = () => {
    const [status, setStatus] = useState(order.orderStatus);
    const activeStepIndex = statusSteps.indexOf(status);
    const isCancelled = status === "Cancelled";

    return (
        <Box sx={{ p: { xs: 2, sm: 3 }, mt: 5 }}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    justifyContent: "space-between",
                    alignItems: { xs: "flex-start", sm: "center" },
                    gap: 1.5,
                    mb: 2.5,
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <IconWrap />
                    <Box>
                        <Typography variant="h5" sx={{ color: "#000000", fontWeight: 500 }}>
                            Order {order.id}
                        </Typography>
                        <Typography sx={{ fontSize: 13.5, color: "#6b7280", mt: 0.25 }}>
                            Placed on {order.placedAt}
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    <Chip
                        label={order.orderStatus}
                        color={orderStatusColor(order.orderStatus)}
                        size="small"
                        variant="outlined"
                        sx={{ fontWeight: 500, fontSize: 13.5, minWidth: 96 }}
                    />
                    <Chip
                        label={order.paymentStatus}
                        color={paymentStatusColor(order.paymentStatus)}
                        size="small"
                        variant="outlined"
                        sx={{ fontWeight: 500, fontSize: 13.5, minWidth: 88 }}
                    />
                </Box>
            </Box>

            <Grid container spacing={2.5}>
                <Grid item xs={12} md={7.5} sx={{ width: { md: "62%" } }}>
                    <SectionCard icon={<ReceiptLongIcon fontSize="small" />} title="Order Items" sx={{ mb: 2.5 }}>
                        <TableContainer>
                            <Table sx={{ minWidth: 480 }}>
                                <TableHead>
                                    <TableRow sx={{ backgroundColor: BRAND_COLOR }}>
                                        <TableCell sx={{ color: "#fff", fontWeight: 500, fontSize: 14, border: "none", py: 1.5 }}>
                                            Product
                                        </TableCell>
                                        <TableCell align="right" sx={{ color: "#fff", fontWeight: 500, fontSize: 14, border: "none", py: 1.5 }}>
                                            Qty
                                        </TableCell>
                                        <TableCell align="right" sx={{ color: "#fff", fontWeight: 500, fontSize: 14, border: "none", py: 1.5 }}>
                                            Price
                                        </TableCell>
                                        <TableCell align="right" sx={{ color: "#fff", fontWeight: 500, fontSize: 14, border: "none", py: 1.5 }}>
                                            Discount
                                        </TableCell>
                                        <TableCell align="right" sx={{ color: "#fff", fontWeight: 500, fontSize: 14, border: "none", py: 1.5 }}>
                                            Subtotal
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {order.items.map((item) => (
                                        <TableRow key={item.id} sx={{ "&:last-child td": { borderBottom: "none" } }}>
                                            <TableCell sx={{ fontSize: 14.5, py: 1.75, borderColor: "#eef0f4", color: "#1f2937" }}>
                                                {item.product}
                                            </TableCell>
                                            <TableCell align="right" sx={{ fontSize: 14.5, py: 1.75, borderColor: "#eef0f4", color: "#1f2937" }}>
                                                {item.quantity}
                                            </TableCell>
                                            <TableCell align="right" sx={{ fontSize: 14.5, py: 1.75, borderColor: "#eef0f4", color: "#1f2937" }}>
                                                {currency(item.price)}
                                            </TableCell>
                                            <TableCell align="right" sx={{ fontSize: 14.5, py: 1.75, borderColor: "#eef0f4", color: "#dc2626" }}>
                                                - {currency(item.discount)}
                                            </TableCell>
                                            <TableCell align="right" sx={{ fontSize: 14.5, py: 1.75, borderColor: "#eef0f4", color: "#1f2937", fontWeight: 500 }}>
                                                {currency(item.quantity * item.price - item.discount)}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </SectionCard>
                </Grid>

                <Grid item xs={12} md={4.5} sx={{ width: { md: "38%" } }}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                        <SectionCard icon={<PersonIcon fontSize="small" />} title="Customer & Address">
                            <Typography sx={{ fontSize: 14.5, fontWeight: 500, color: "#1f2937" }}>
                                {order.customer.name}
                            </Typography>
                            <Typography sx={{ fontSize: 13.5, color: "#6b7280", mt: 0.25 }}>
                                {order.customer.email}
                            </Typography>
                            <Typography sx={{ fontSize: 13.5, color: "#6b7280" }}>{order.customer.phone}</Typography>
                            <Divider sx={{ my: 1.5 }} />
                            <Typography sx={{ fontSize: 13.5, color: "#6b7280", lineHeight: 1.6 }}>
                                {order.address.line}
                                <br />
                                {order.address.city}, {order.address.state} - {order.address.pincode}
                            </Typography>
                        </SectionCard>

                        <SectionCard icon={<ReceiptLongIcon fontSize="small" />} title="Price Details">
                            <Row label="Subtotal" value={currency(order.subTotal)} />
                            <Row label="Discount" value={`- ${currency(order.discountAmount)}`} valueColor="#dc2626" />
                            <Row label="Tax" value={`+ ${currency(order.taxAmount)}`} />
                            <Row label="Shipping Charge" value={`+ ${currency(order.shippingCharge)}`} />
                            <Divider sx={{ my: 1.25 }} />
                            <Row
                                label="Total Amount"
                                value={currency(order.totalAmount)}
                                bold
                            />
                            <Divider sx={{ my: 1.25 }} />
                            <Typography sx={{ fontSize: 13.5, color: "#6b7280" }}>
                                Payment Method:{" "}
                                <Box component="span" sx={{ color: "#1f2937", fontWeight: 500 }}>
                                    {order.paymentMethod}
                                </Box>
                            </Typography>
                        </SectionCard>

                        <SectionCard icon={<LocalShippingIcon fontSize="small" />} title="Update Status">
                            <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                                <Select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    sx={{ fontSize: 14.5 }}
                                >
                                    {statusSteps.map((s) => (
                                        <MenuItem key={s} value={s} sx={{ fontSize: 14.5 }}>
                                            {s}
                                        </MenuItem>
                                    ))}
                                    <MenuItem value="Cancelled" sx={{ fontSize: 14.5, color: "error.main" }}>
                                        Cancelled
                                    </MenuItem>
                                </Select>
                            </FormControl>
                            <Box sx={{ display: "flex", gap: 1 }}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    sx={{
                                        backgroundColor: BRAND_COLOR,
                                        textTransform: "none",
                                        boxShadow: "none",
                                        "&:hover": { backgroundColor: BRAND_COLOR, opacity: 0.9, boxShadow: "none" },
                                    }}
                                >
                                    Save Changes
                                </Button>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    color="error"
                                    sx={{ textTransform: "none" }}
                                >
                                    Cancel Order
                                </Button>
                            </Box>
                        </SectionCard>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

const Row = ({ label, value, valueColor, bold }) => (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: 0.5 }}>
        <Typography sx={{ fontSize: bold ? 15 : 14, color: bold ? "#1f2937" : "#6b7280", fontWeight: bold ? 600 : 400 }}>
            {label}
        </Typography>
        <Typography sx={{ fontSize: bold ? 15.5 : 14, color: valueColor || "#1f2937", fontWeight: bold ? 700 : 500 }}>
            {value}
        </Typography>
    </Box>
);

const IconWrap = () => (
    <Button
        startIcon={<ArrowBackIcon />}
        sx={{ textTransform: "none", color: BRAND_COLOR, minWidth: 0, px: 1 }}
    >
        Back
    </Button>
);
export default OrderItem;