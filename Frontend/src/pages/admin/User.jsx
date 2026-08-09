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
    Chip,
    Link,
    Avatar,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import PaginationActions from "../../common/Pagination";
import { GETUSERS } from "../../query/user";
import { useQuery } from "@apollo/client/react";
import { BRAND_COLOR, userColumnOptions, userColumns, userFilterFields } from '../../constants/const'
import LoadingCompo from "../../common/LoadingCompo";
import Filter from "../../filter/FilterModal";
import BlockUserModal from "./BlockUser";

const User = () => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [openFilter, setOpenFilter] = useState(false);
    const [filter, setFilter] = useState({});
    const [blockModalOpen, setBlockModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const { data: userData, loading: userLoading } = useQuery(GETUSERS, {
        variables: { ...filter },
        fetchPolicy: "network-only",
    });

    if (userLoading) return <LoadingCompo />

    const customerUsers = userData?.getUsers?.filter((user) => user.role === "Customer");
    const paginatedRows = customerUsers?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

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
                        onClick={() => setOpenFilter(true)}
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
                        {paginatedRows?.map((row) => {
                            return (
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

                                            </Avatar>
                                            <Box>
                                                <Link href="#" underline="hover" sx={{ color: BRAND_COLOR, fontWeight: 500, fontSize: 14.5 }}>
                                                    {row.name}
                                                </Link>
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
                                        title={row.firstName}
                                    >
                                        {row.firstName}
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
                                        {row.lastName}
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
                                        {row.email}
                                    </TableCell>
                                    <TableCell align="center" sx={{ fontSize: 14.5, py: 1.5, borderColor: "#eef0f4", color: "#1f2937" }}>
                                        {row.role}
                                    </TableCell>
                                    <TableCell align="left" sx={{ fontSize: 14.5, py: 1.5, borderColor: "#eef0f4", color: "#1f2937" }}>
                                        {row.createdAt
                                            ? new Date(Number(row.createdAt)).toLocaleDateString("en-IN", {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric'
                                            })
                                            : '-'}
                                    </TableCell>
                                    <TableCell align="center" sx={{ py: 1.25, borderColor: "#eef0f4" }}>
                                        <Chip
                                            label={row.status}
                                            color={row.status === 'Active' ? 'success' : 'error'}
                                            size="small"
                                            variant="outlined"
                                            sx={{ fontWeight: 500, fontSize: 13.5, minWidth: 88 }}
                                        />
                                    </TableCell>
                                    <TableCell align="center" sx={{ py: 1.25, borderColor: "#eef0f4" }}>
                                        <Button
                                            variant="outlined"
                                            onClick={() => {
                                                setSelectedUser(row);
                                                setBlockModalOpen(true);
                                            }}
                                        >Block</Button>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ display: "flex", justifyContent: { xs: "center", sm: "flex-end" }, alignItems: "center", mt: 1, flexWrap: "wrap" }}>
                <TablePagination
                    component="div"
                    count={userData?.getUsers?.length}
                    page={page}
                    onPageChange={(e, newPage) => setPage(newPage)}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={(e) => {
                        setRowsPerPage(parseInt(e.target.value, 10));
                        setPage(0);
                    }}
                    rowsPerPageOptions={[5, 10, 15, 20, 25]}
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
                <Filter
                    open={openFilter}
                    onClose={() => setOpenFilter(false)}
                    setOpenFilter={setOpenFilter}
                    setFilter={setFilter}
                    setPage={setPage}
                    columnOptions={userColumnOptions}
                    filterField={userFilterFields}
                />
                <BlockUserModal
                    open={blockModalOpen}
                    onClose={() => setBlockModalOpen(false)}
                    selectedUser={selectedUser}
                />
            </Box>
        </Paper>
    );
};
export default User;