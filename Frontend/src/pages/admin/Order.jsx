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
    TablePagination,
    Typography,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Chip,
    Link,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PaginationActions from "../../common/Pagination";
import { BRAND_COLOR } from "../../constants/const";

const orders = [
    {
        id: "ORD-1001",
        customer: "Aditi Sharma",
        items: 3,
        totalAmount: "₹2,499.00",
        paymentMethod: "UPI",
        paymentStatus: "Paid",
        orderStatus: "Pending",
        createdAt: "2026-07-01",
    },
    {
        id: "ORD-1002",
        customer: "Rohan Verma",
        items: 1,
        totalAmount: "₹899.00",
        paymentMethod: "COD",
        paymentStatus: "Pending",
        orderStatus: "Confirmed",
        createdAt: "2026-07-01",
    },
    {
        id: "ORD-1003",
        customer: "Sneha Iyer",
        items: 5,
        totalAmount: "₹5,750.00",
        paymentMethod: "CARD",
        paymentStatus: "Paid",
        orderStatus: "Shipped",
        createdAt: "2026-06-30",
    },
    {
        id: "ORD-1004",
        customer: "Karan Mehta",
        items: 2,
        totalAmount: "₹1,299.00",
        paymentMethod: "UPI",
        paymentStatus: "Failed",
        orderStatus: "Cancelled",
        createdAt: "2026-06-29",
    },
    {
        id: "ORD-1005",
        customer: "Priya Nair",
        items: 4,
        totalAmount: "₹3,120.00",
        paymentMethod: "COD",
        paymentStatus: "Pending",
        orderStatus: "Packed",
        createdAt: "2026-06-29",
    },
    {
        id: "ORD-1006",
        customer: "Vikram Singh",
        items: 1,
        totalAmount: "₹499.00",
        paymentMethod: "CARD",
        paymentStatus: "Paid",
        orderStatus: "Delivered",
        createdAt: "2026-06-28",
    },
];

const columns = [
    { key: "id", label: "Order ID", align: "left" },
    { key: "customer", label: "Customer", align: "left" },
    { key: "items", label: "Items", align: "right" },
    { key: "totalAmount", label: "Total", align: "right" },
    { key: "paymentMethod", label: "Payment", align: "left" },
    { key: "paymentStatus", label: "Payment Status", align: "center" },
    { key: "orderStatus", label: "Order Status", align: "center" },
    { key: "createdAt", label: "Date", align: "left" },
    { key: "action", label: "Action", align: "center" },
];

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

const Order = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [anchorEl, setAnchorEl] = useState(null);
    const [activeRow, setActiveRow] = useState(null);

    const handleMenuOpen = (event, row) => {
        setAnchorEl(event.currentTarget);
        setActiveRow(row);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
        setActiveRow(null);
    };

    const paginatedRows = orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <Paper
            elevation={0}
            sx={{
                width: "100%",
                p: { xs: 2, sm: 3 },
                borderRadius: 2,
                backgroundColor: "#ffffff",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    justifyContent: "space-between",
                    alignItems: { xs: "stretch", sm: "center" },
                    gap: 1.5,
                    mb: 2.5,
                    marginTop: 5,
                }}
            >
                <Typography variant="h5" sx={{ color: "#000000", fontWeight: 500 }}>
                    Order Management
                </Typography>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    <Button
                        variant="outlined"
                        startIcon={<FilterListIcon />}
                        sx={{ textTransform: "none", borderColor: BRAND_COLOR, color: BRAND_COLOR }}
                    >
                        Filter
                    </Button>
                </Box>
            </Box>

            <TableContainer
                sx={{
                    backgroundColor: "#ffffff",
                    borderRadius: 2,
                    width: "100%",
                    overflowX: "auto",
                }}
            >
                <Table sx={{ backgroundColor: "#ffffff", width: "100%", minWidth: 960, tableLayout: "fixed" }}>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: BRAND_COLOR }}>
                            {columns.map((col) => (
                                <TableCell
                                    key={col.key}
                                    align={col.align}
                                    sx={{
                                        color: "#fff",
                                        fontWeight: 500,
                                        fontSize: 14.5,
                                        py: 1.75,
                                        border: "none",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {col.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{ backgroundColor: "#ffffff" }}>
                        {paginatedRows.map((row) => (
                            <TableRow
                                key={row.id}
                                hover
                                sx={{ backgroundColor: "#ffffff", "&:last-child td": { borderBottom: "none" } }}
                            >
                                <TableCell align="left" sx={{ fontSize: 14.5, py: 1.75, borderColor: "#eef0f4" }}>
                                    <Link href="#" underline="hover" sx={{ color: BRAND_COLOR, fontWeight: 500 }}>
                                        {row.id}
                                    </Link>
                                </TableCell>
                                <TableCell align="left" sx={{ fontSize: 14.5, py: 1.75, borderColor: "#eef0f4", color: "#1f2937" }}>
                                    {row.customer}
                                </TableCell>
                                <TableCell align="right" sx={{ fontSize: 14.5, py: 1.75, borderColor: "#eef0f4", color: "#1f2937" }}>
                                    {row.items}
                                </TableCell>
                                <TableCell align="right" sx={{ fontSize: 14.5, py: 1.75, borderColor: "#eef0f4", color: "#1f2937" }}>
                                    {row.totalAmount}
                                </TableCell>
                                <TableCell align="left" sx={{ fontSize: 14.5, py: 1.75, borderColor: "#eef0f4", color: "#1f2937" }}>
                                    {row.paymentMethod}
                                </TableCell>
                                <TableCell align="center" sx={{ py: 1.5, borderColor: "#eef0f4" }}>
                                    <Chip
                                        label={row.paymentStatus}
                                        color={paymentStatusColor(row.paymentStatus)}
                                        size="small"
                                        variant="outlined"
                                        sx={{ fontWeight: 500, fontSize: 13.5, minWidth: 88 }}
                                    />
                                </TableCell>
                                <TableCell align="center" sx={{ py: 1.5, borderColor: "#eef0f4" }}>
                                    <Chip
                                        label={row.orderStatus}
                                        color={orderStatusColor(row.orderStatus)}
                                        size="small"
                                        variant="outlined"
                                        sx={{ fontWeight: 500, fontSize: 13.5, minWidth: 96 }}
                                    />
                                </TableCell>
                                <TableCell align="left" sx={{ fontSize: 14.5, py: 1.75, borderColor: "#eef0f4", color: "#1f2937" }}>
                                    {row.createdAt}
                                </TableCell>
                                <TableCell align="center" sx={{ py: 1.5, borderColor: "#eef0f4" }}>
                                    <IconButton size="small" onClick={(e) => handleMenuOpen(e, row)}>
                                        <MoreHorizIcon fontSize="small" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={handleMenuClose}>View Details</MenuItem>
                <MenuItem onClick={handleMenuClose}>Update Status</MenuItem>
                <MenuItem onClick={handleMenuClose}>Mark as Paid</MenuItem>
                <MenuItem onClick={handleMenuClose} sx={{ color: "error.main" }}>
                    Cancel Order
                </MenuItem>
            </Menu>
            <Box sx={{ display: "flex", justifyContent: { xs: "center", sm: "flex-end" }, alignItems: "center", mt: 1, flexWrap: "wrap" }}>
                <TablePagination
                    component="div"
                    count={orders.length}
                    page={page}
                    onPageChange={(e, newPage) => setPage(newPage)}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={(e) => {
                        setRowsPerPage(parseInt(e.target.value, 10));
                        setPage(0);
                    }}
                    rowsPerPageOptions={[10, 20, 50]}
                    labelRowsPerPage="Page size:"
                    ActionsComponent={PaginationActions}
                    sx={{
                        "& .MuiTablePagination-toolbar": { pl: 0, pr: 0, minHeight: 0 },
                        "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
                            fontSize: 14,
                            color: "#6b7280",
                        },
                    }}
                />
            </Box>
        </Paper>
    );
};
export default Order;