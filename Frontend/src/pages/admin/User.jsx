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
    Avatar,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PaginationActions from "../../common/Pagination";
import { GETUSERS } from "../../query/user";
import { useQuery } from "@apollo/client/react";
import { BRAND_COLOR, userColumns } from '../../constants/const'
import LoadingCompo from "../../common/LoadingCompo";

const customers = [
    {
        id: "CUST-2001",
        name: "Aditi Sharma",
        email: "aditi.sharma@example.com",
        phone: "+91 98765 43210",
        city: "Jaipur",
        role: "CUSTOMER",
        orders: 12,
        joinedAt: "2025-11-14",
        status: "Active",
    },
    {
        id: "CUST-2002",
        name: "Rohan Verma",
        email: "rohan.verma@example.com",
        phone: "+91 91234 56789",
        city: "Delhi",
        role: "CUSTOMER",
        orders: 3,
        joinedAt: "2026-01-02",
        status: "Active",
    },
    {
        id: "CUST-2003",
        name: "Sneha Iyer",
        email: "sneha.iyer@example.com",
        phone: "+91 99887 66554",
        city: "Pune",
        role: "CUSTOMER",
        orders: 27,
        joinedAt: "2025-06-20",
        status: "Active",
    },
    {
        id: "CUST-2004",
        name: "Karan Mehta",
        email: "karan.mehta@example.com",
        phone: "+91 90909 12345",
        city: "Ahmedabad",
        role: "CUSTOMER",
        orders: 0,
        joinedAt: "2026-06-30",
        status: "Blocked",
    },
    {
        id: "CUST-2005",
        name: "Priya Nair",
        email: "priya.nair@example.com",
        phone: "+91 98123 45670",
        city: "Kochi",
        role: "CUSTOMER",
        orders: 8,
        joinedAt: "2025-09-10",
        status: "Active",
    },
    {
        id: "CUST-2006",
        name: "Admin User",
        email: "admin@store.com",
        phone: "+91 90000 00000",
        city: "Mumbai",
        role: "ADMIN",
        orders: 0,
        joinedAt: "2025-01-01",
        status: "Active",
    },
];


function statusColor(status) {
    return status === "Active" ? "success" : "error";
}

function initials(name) {
    return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
}

const User = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [anchorEl, setAnchorEl] = useState(null);
    const [activeRow, setActiveRow] = useState(null);
    const { data: userData, loading: userLoading } = useQuery(GETUSERS);

    if (userLoading) {
        return <LoadingCompo/>
    }
    const handleMenuOpen = (event, row) => {
        setAnchorEl(event.currentTarget);
        setActiveRow(row);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
        setActiveRow(null);
    };

    const paginatedRows = customers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

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
                    Customer Management
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
                <Table sx={{ backgroundColor: "#ffffff", width: "100%", minWidth: 1080, tableLayout: "fixed" }}>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: BRAND_COLOR }}>
                            {userColumns.map((col) => (
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
                                <TableCell align="left" sx={{ fontSize: 14.5, py: 1.5, borderColor: "#eef0f4" }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
                                        <Avatar
                                            sx={{
                                                width: 32,
                                                height: 32,
                                                fontSize: 13,
                                                backgroundColor: "#eef0f4",
                                                color: BRAND_COLOR,
                                                fontWeight: 600,
                                            }}
                                        >
                                            {initials(row.name)}
                                        </Avatar>
                                        <Box>
                                            <Link href="#" underline="hover" sx={{ color: BRAND_COLOR, fontWeight: 500, fontSize: 14.5 }}>
                                                {row.name}
                                            </Link>
                                            <Typography sx={{ fontSize: 12.5, color: "#9ca3af" }}>{row.id}</Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell
                                    align="left"
                                    sx={{
                                        fontSize: 14.5,
                                        py: 1.5,
                                        borderColor: "#eef0f4",
                                        color: "#1f2937",
                                        maxWidth: 0,
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                    }}
                                    title={row.email}
                                >
                                    {row.email}
                                </TableCell>
                                <TableCell
                                    align="left"
                                    sx={{
                                        fontSize: 14.5,
                                        py: 1.5,
                                        borderColor: "#eef0f4",
                                        color: "#1f2937",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {row.phone}
                                </TableCell>
                                <TableCell
                                    align="center"
                                    sx={{
                                        fontSize: 14.5,
                                        py: 1.5,
                                        borderColor: "#eef0f4",
                                        color: "#1f2937",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                        pl: 1, 
                                    }}
                                >
                                    {row.city}
                                </TableCell>
                                <TableCell align="center" sx={{ fontSize: 14.5, py: 1.5, borderColor: "#eef0f4", color: "#1f2937" }}>
                                    {row.orders}
                                </TableCell>
                                <TableCell align="left" sx={{ fontSize: 14.5, py: 1.5, borderColor: "#eef0f4", color: "#1f2937" }}>
                                    {row.joinedAt}
                                </TableCell>
                                <TableCell align="center" sx={{ py: 1.25, borderColor: "#eef0f4" }}>
                                    <Chip
                                        label={row.status}
                                        color={statusColor(row.status)}
                                        size="small"
                                        variant="outlined"
                                        sx={{ fontWeight: 500, fontSize: 13.5, minWidth: 88 }}
                                    />
                                </TableCell>
                                <TableCell align="center" sx={{ py: 1.25, borderColor: "#eef0f4" }}>
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
                <MenuItem onClick={handleMenuClose}>View Orders</MenuItem>
                <MenuItem
                    onClick={handleMenuClose}
                    sx={{ color: activeRow?.status === "Active" ? "error.main" : "success.main" }}
                >
                    {activeRow?.status === "Active" ? "Block Customer" : "Unblock Customer"}
                </MenuItem>
            </Menu>
            <Box sx={{ display: "flex", justifyContent: { xs: "center", sm: "flex-end" }, alignItems: "center", mt: 1, flexWrap: "wrap" }}>
                <TablePagination
                    component="div"
                    count={customers.length}
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
export default User;