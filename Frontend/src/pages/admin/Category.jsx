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
    Avatar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FilterListIcon from "@mui/icons-material/FilterList";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PaginationActions from "../../common/Pagination";
import AddCategoryModal from "../categories/AddCategory";
import { useQuery } from "@apollo/client/react";
import { format, isValid } from "date-fns";
import EditCategoryModal from "../categories/EditCategory";
import ViewCategoryModal from "../categories/ViewCategory";
import DeleteCategoryModal from "../categories/DeleteCategory";
import Filter from "../../filter/FilterModal";
import { BRAND_COLOR, categoryColumnOptions, categoryFilterFields } from "../../constants/const";
import { GETCATEGORIES } from "../../query/category";

const columns = [
    { key: "categoryImage", label: "Image", width: "8%" },
    { key: "categoryName", label: "Category Name", width: "18%" },
    { key: "slug", label: "Slug", width: "14%" },
    { key: "description", label: "Description", width: "24%" },
    { key: "productCount", label: "Products", width: "10%" },
    { key: "createdAt", label: "Created On", width: "12%" },
    { key: "isActive", label: "Status", width: "8%" },
    { key: "action", label: "Action", width: "6%" },
];

const AdminCategory = () => {
    const [rows, setRows] = useState(0);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [anchorEl, setAnchorEl] = useState(null);
    const [activeRow, setActiveRow] = useState(null);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openViewModal, setOpenViewModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openFilter, setOpenFilter] = useState(false);

    const [filter, setFilter] = useState({
        categoryName: "",
        slug: "",
        description: "",
        isActive: "",
    });

    const queryVariables = {
        categoryName: filter.categoryName || undefined,
        slug: filter.slug || undefined,
        description: filter.description || undefined,
        isActive:
            filter.isActive === "Active"
                ? true
                : filter.isActive === "Inactive"
                    ? false
                    : undefined,
    };

    const { data: categoryData } = useQuery(GETCATEGORIES, {
        variables: queryVariables,
        fetchPolicy: "network-only",
    });

    const handleMenuOpen = (event, row) => {
        setAnchorEl(event.currentTarget);
        setActiveRow(row);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
        setActiveRow(null);
    };
    const handleEditDetails = () => {
        setAnchorEl(null);
        setOpenEditModal(true);
    }
    const handleViewDetails = () => {
        setAnchorEl(null);
        setOpenViewModal(true);
    }
    const handleDeleteDetails = () => {
        setAnchorEl(null);
        setOpenDeleteModal(true);
    }

    const paginatedRows = categoryData?.getCategories?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

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
                    Category Management
                </Typography>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => {
                            setOpenAddModal(true);
                            handleMenuClose();
                        }}
                        sx={{
                            backgroundColor: BRAND_COLOR,
                            textTransform: "none",
                            boxShadow: "none",
                            "&:hover": { backgroundColor: BRAND_COLOR, opacity: 0.9, boxShadow: "none" },
                        }}
                    >
                        Add Category
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<FilterListIcon />}
                        onClick={() => setOpenFilter(true)}
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
                        {paginatedRows?.map((row) => {
                            const isRowInactive = !row.isActive;
                            return (
                                <TableRow
                                    key={row.id}
                                    hover={!isRowInactive}
                                    sx={{
                                        backgroundColor: isRowInactive ? "#f9fafb" : "#ffffff",
                                        opacity: isRowInactive ? 0.55 : 1,
                                        pointerEvents: isRowInactive ? "none" : "auto", 
                                        transition: "opacity 0.2s ease",
                                        "&:last-child td": { borderBottom: "none" },
                                    }}
                                >
                                    <TableCell align="center" sx={{ py: 1.5, borderColor: "#eef0f4" }}>
                                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                                            <Avatar
                                                variant="rounded"
                                                src={row.categoryImage || undefined}
                                                sx={{
                                                    width: 40,
                                                    height: 40,
                                                    fontSize: 13,
                                                    backgroundColor: "#eef0f4",
                                                    color: BRAND_COLOR,
                                                    fontWeight: 600,
                                                    filter: isRowInactive ? "grayscale(1)" : "none",
                                                }}
                                            >
                                            </Avatar>
                                        </Box>
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={{ fontSize: 14.5, py: 1.5, borderColor: "#eef0f4", color: "#1f2937", fontWeight: 500 }}
                                    >
                                        {row.categoryName}
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={{ fontSize: 13.5, py: 1.5, borderColor: "#eef0f4", color: "#6b7280" }}
                                    >
                                        {row.slug}
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
                                        }}
                                        title={row.description}
                                    >
                                        {row.description}
                                    </TableCell>
                                    <TableCell align="center" sx={{ fontSize: 14.5, py: 1.5, borderColor: "#eef0f4", color: "#1f2937" }}>
                                        -
                                    </TableCell>
                                    <TableCell align="center" sx={{ fontSize: 14.5, py: 1.5, borderColor: "#eef0f4", color: "#1f2937" }}>
                                        {row.createdAt && isValid(new Date(row.createdAt))
                                            ? format(new Date(row.createdAt), "dd MMM yyyy")
                                            : "-"}
                                    </TableCell>
                                    <TableCell align="center" sx={{ py: 1.25, borderColor: "#eef0f4" }}>
                                        <Chip
                                            label={row.isActive ? "Active" : "Inactive"}
                                            size="small"
                                            sx={{
                                                fontWeight: 500,
                                                fontSize: 12.5,
                                                backgroundColor: row.isActive ? "#dcfce7" : "#fee2e2",
                                                color: row.isActive ? "#16a34a" : "#dc2626",
                                                border: "none",
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell align="center" sx={{ py: 1.25, borderColor: "#eef0f4", pointerEvents: "auto" }}>
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
                <MenuItem onClick={handleEditDetails}>Edit Category</MenuItem>
                <MenuItem onClick={handleViewDetails}>View Category</MenuItem>
                <MenuItem onClick={handleDeleteDetails} sx={{ color: "error.main" }}>
                    Update Status
                </MenuItem>
            </Menu>
            <Box sx={{ display: "flex", justifyContent: { xs: "center", sm: "flex-end" }, alignItems: "center", mt: 1, flexWrap: "wrap" }}>
                <TablePagination
                    component="div"
                    count={categoryData?.getCategories?.length}
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
            </Box>
            <AddCategoryModal
                open={openAddModal}
                handleClose={() => setOpenAddModal(false)}
            />
            <EditCategoryModal
                open={openEditModal}
                handleClose={() => setOpenEditModal(false)}
                categoryToEdit={activeRow}
            />
            <ViewCategoryModal
                open={openViewModal}
                handleClose={() => {
                    setOpenViewModal(false);
                    setActiveRow(null);
                }}
                category={activeRow}
            />
            <DeleteCategoryModal
                open={openDeleteModal}
                handleClose={() => {
                    setOpenDeleteModal(false);
                    setActiveRow(null);
                }}
                categoryToDelete={activeRow}
            />
            <Filter
                open={openFilter}
                onClose={() => setOpenFilter(false)}
                setOpenFilter={setOpenFilter}
                setFilter={setFilter}
                setPage={setPage}
                columnOptions={categoryColumnOptions}
                filterField={categoryFilterFields}
            />
        </Paper>
    );
};
export default AdminCategory;