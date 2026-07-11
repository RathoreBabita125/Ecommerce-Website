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
    Switch,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FilterListIcon from "@mui/icons-material/FilterList";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import PaginationActions from "../../common/Pagination";
import { BRAND_COLOR } from "../../constants/const";

const coupons = [
    {
        id: 1,
        couponCode: "WELCOME10",
        discount: 1, 
        discountValue: 10,
        minOrderValue: 500,
        expiryDate: "2026-08-15",
        isActive: true,
    },
    {
        id: 2,
        couponCode: "FLAT200",
        discount: 0, 
        discountValue: 200,
        minOrderValue: 1000,
        expiryDate: "2026-07-20",
        isActive: true,
    },
    {
        id: 3,
        couponCode: "SUMMER25",
        discount: 1,
        discountValue: 25,
        minOrderValue: 800,
        expiryDate: "2026-06-30",
        isActive: false,
    },
    {
        id: 4,
        couponCode: "FESTIVE500",
        discount: 0,
        discountValue: 500,
        minOrderValue: 2500,
        expiryDate: "2026-11-05",
        isActive: true,
    },
    {
        id: 5,
        couponCode: "NEWUSER15",
        discount: 1,
        discountValue: 15,
        minOrderValue: 300,
        expiryDate: "2026-07-10",
        isActive: true,
    },
];

const columns = [
    { key: "couponCode", label: "Coupon Code", width: "16%" },
    { key: "discountValue", label: "Discount", width: "14%" },
    { key: "minOrderValue", label: "Min. Order Value", width: "15%" },
    { key: "expiryDate", label: "Expiry Date", width: "14%" },
    { key: "validity", label: "Validity", width: "12%" },
    { key: "isActive", label: "Status", width: "10%" },
    { key: "action", label: "Action", width: "8%" },
];

const currency = (val) => `₹${val.toLocaleString("en-IN")}`;

function isExpired(dateStr) {
    return new Date(dateStr) < new Date("2026-07-04");
}

const Coupon = () => {
    const [rows, setRows] = useState(coupons);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [anchorEl, setAnchorEl] = useState(null);
    const [activeRow, setActiveRow] = useState(null);
    const [copiedId, setCopiedId] = useState(null);

    const handleMenuOpen = (event, row) => {
        setAnchorEl(event.currentTarget);
        setActiveRow(row);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
        setActiveRow(null);
    };

    const toggleActive = (id) => {
        setRows((prev) => prev.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c)));
    };

    const handleCopy = (code, id) => {
        navigator.clipboard?.writeText(code);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 1200);
    };

    const paginatedRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

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
                    Coupon Management
                </Typography>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        sx={{
                            backgroundColor: BRAND_COLOR,
                            textTransform: "none",
                            boxShadow: "none",
                            "&:hover": { backgroundColor: BRAND_COLOR, opacity: 0.9, boxShadow: "none" },
                        }}
                    >
                        Add Coupon
                    </Button>
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
                <Table sx={{ backgroundColor: "#ffffff", width: "100%", minWidth: 1000, tableLayout: "fixed" }}>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: BRAND_COLOR }}>
                            {columns.map((col) => (
                                <TableCell
                                    key={col.key}
                                    align="center"
                                    sx={{
                                        color: "#fff",
                                        fontWeight: 500,
                                        fontSize: 14.5,
                                        py: 1.75,
                                        border: "none",
                                        whiteSpace: "nowrap",
                                        width: col.width,
                                        textAlign: "center",
                                    }}
                                >
                                    {col.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{ backgroundColor: "#ffffff" }}>
                        {paginatedRows.map((row) => {
                            const expired = isExpired(row.expiryDate);
                            return (
                                <TableRow
                                    key={row.id}
                                    hover
                                    sx={{ backgroundColor: "#ffffff", "&:last-child td": { borderBottom: "none" } }}
                                >
                                    <TableCell align="center" sx={{ py: 1.5, borderColor: "#eef0f4" }}>
                                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0.5 }}>
                                            <Chip
                                                label={row.couponCode}
                                                size="small"
                                                sx={{
                                                    fontWeight: 600,
                                                    fontSize: 13.5,
                                                    letterSpacing: 0.5,
                                                    backgroundColor: "#eef0f4",
                                                    color: BRAND_COLOR,
                                                }}
                                            />
                                            <IconButton size="small" onClick={() => handleCopy(row.couponCode, row.id)}>
                                                <ContentCopyIcon sx={{ fontSize: 15, color: copiedId === row.id ? "#16a34a" : "#9ca3af" }} />
                                            </IconButton>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="center" sx={{ fontSize: 14.5, py: 1.5, borderColor: "#eef0f4", color: "#1f2937", fontWeight: 500 }}>
                                        {row.discount === 1 ? `${row.discountValue}% OFF` : `${currency(row.discountValue)} OFF`}
                                    </TableCell>
                                    <TableCell align="center" sx={{ fontSize: 14.5, py: 1.5, borderColor: "#eef0f4", color: "#1f2937" }}>
                                        {currency(row.minOrderValue)}
                                    </TableCell>
                                    <TableCell align="center" sx={{ fontSize: 14.5, py: 1.5, borderColor: "#eef0f4", color: "#1f2937" }}>
                                        {row.expiryDate}
                                    </TableCell>
                                    <TableCell align="center" sx={{ py: 1.25, borderColor: "#eef0f4" }}>
                                        <Chip
                                            label={expired ? "Expired" : "Valid"}
                                            color={expired ? "error" : "success"}
                                            size="small"
                                            variant="outlined"
                                            sx={{ fontWeight: 500, fontSize: 13.5, minWidth: 78 }}
                                        />
                                    </TableCell>
                                    <TableCell align="center" sx={{ py: 1.25, borderColor: "#eef0f4" }}>
                                        <Switch
                                            size="small"
                                            checked={row.isActive}
                                            onChange={() => toggleActive(row.id)}
                                            sx={{
                                                "& .MuiSwitch-switchBase.Mui-checked": { color: BRAND_COLOR },
                                                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                                                    backgroundColor: BRAND_COLOR,
                                                },
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell align="center" sx={{ py: 1.25, borderColor: "#eef0f4" }}>
                                        <IconButton size="small" onClick={(e) => handleMenuOpen(e, row)}>
                                            <MoreHorizIcon fontSize="small" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={handleMenuClose}>Edit Coupon</MenuItem>
                <MenuItem onClick={handleMenuClose}>View Usage</MenuItem>
                <MenuItem onClick={handleMenuClose} sx={{ color: "error.main" }}>
                    Delete Coupon
                </MenuItem>
            </Menu>
            <Box sx={{ display: "flex", justifyContent: { xs: "center", sm: "flex-end" }, alignItems: "center", mt: 1, flexWrap: "wrap" }}>
                <TablePagination
                    component="div"
                    count={rows.length}
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
export default Coupon;