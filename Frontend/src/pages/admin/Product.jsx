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
import AddIcon from "@mui/icons-material/Add";
import FilterListIcon from "@mui/icons-material/FilterList";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PaginationActions from "../../common/Pagination";
import { useQuery } from "@apollo/client/react";
import { GETPRODUCTS } from "../../query/product";
import AddProductModal from "../products/AddProduct";
import EditProductModal from '../products/EditProduct'
import ViewProductModal from '../products/ViewProduct'
import DeleteProductModal from "../products/DeleteProduct";
import { BRAND_COLOR, productColumnOptions, productColumns, productFilterFields } from "../../constants/const";
import Filter from "../../filter/FilterModal";
import LoadingCompo from "../../common/LoadingCompo";

function statusColor(status) {
    if (status === "Active") return "success";
    if (status === "Out of stock") return "error";
    return "default";
}

const Product = () => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [anchorEl, setAnchorEl] = useState(null);
    const [activeRow, setActiveRow] = useState(null);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [productToEdit, setProductToEdit] = useState(null);
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [productToView, setProductToView] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [openFilter, setOpenFilter] = useState(false);
    const [filter, setFilter] = useState({});

    const { data: productData, loading: productLoading } = useQuery(GETPRODUCTS, {
        variables: { ...filter },
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
    const handleEditClick = () => {
        setProductToEdit(activeRow);
        handleMenuClose();
        setTimeout(() => setEditModalOpen(true), 0);
    };
    const handleViewClick = () => {
        setProductToView(activeRow);
        handleMenuClose();
        setTimeout(() => setViewModalOpen(true), 0);
    };
    const handleDeleteClick = () => {
        setProductToDelete(activeRow);
        handleMenuClose();
        setTimeout(() => setDeleteModalOpen(true), 0);
    };

    const brandOptions = [
        ...new Set(
            productData?.getProducts?.map(product => product.brand)
        ),
    ];
    
    const categoryOptions = [
        ...new Set(
            productData?.getProducts?.map(product => product?.category?.categoryName)
        ),
    ];
    
    const paginatedRows = productData?.getProducts?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

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
                    Product Management
                </Typography>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => setAddModalOpen(true)}
                        sx={{
                            backgroundColor: BRAND_COLOR,
                            textTransform: "none",
                            boxShadow: "none",
                            "&:hover": { backgroundColor: BRAND_COLOR, opacity: 0.9, boxShadow: "none" },
                        }}
                    >
                        Add Product
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
                <Table sx={{ backgroundColor: "#ffffff", width: "100%", minWidth: 1200, tableLayout: "fixed" }}>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: BRAND_COLOR }}>
                            {productColumns.map((col) => (
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
                        {productLoading && (
                            <TableRow>
                                <TableCell colSpan={productColumns.length} align="center" sx={{ py: 4 }}>
                                   <LoadingCompo/>
                                </TableCell>
                            </TableRow>
                        )}
                        {!productLoading && paginatedRows?.map((product) => (
                            <TableRow
                                key={product.id}
                                hover
                                sx={{ backgroundColor: "#ffffff", "&:last-child td": { borderBottom: "none" } }}
                            >
                                <TableCell align="center" sx={{ py: 1.5, borderColor: "#eef0f4" }}>
                                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                                        <Avatar
                                            variant="rounded"
                                            src={product?.productImage}
                                            sx={{
                                                width: 38,
                                                height: 38,
                                                fontSize: 12,
                                                backgroundColor: "#eef0f4",
                                                color: BRAND_COLOR,
                                                fontWeight: 600,
                                            }}
                                        >
                                        </Avatar>
                                    </Box>
                                </TableCell>
                                <TableCell align="center" sx={{ fontSize: 14.5, py: 1.5, borderColor: "#eef0f4" }}>
                                    <Link href="#" underline="hover" sx={{ color: BRAND_COLOR, fontWeight: 500 }}>
                                        {product.id}
                                    </Link>
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
                                    title={product.productName}
                                >
                                    {product.productName}
                                </TableCell>
                                <TableCell align="center" sx={{ fontSize: 14.5, py: 1.5, borderColor: "#eef0f4", color: "#1f2937" }}>
                                    {product.brand}
                                </TableCell>
                                <TableCell align="center" sx={{ fontSize: 14.5, py: 1.5, borderColor: "#eef0f4", color: "#1f2937" }}>
                                    {product?.category?.categoryName}
                                </TableCell>
                                <TableCell align="center" sx={{ fontSize: 14.5, py: 1.5, borderColor: "#eef0f4", color: "#1f2937" }}>
                                    {product.color}
                                </TableCell>
                                <TableCell align="center" sx={{ fontSize: 14.5, py: 1.5, borderColor: "#eef0f4", color: "#1f2937" }}>
                                    {product.size}
                                </TableCell>
                                <TableCell align="center" sx={{ fontSize: 14.5, py: 1.5, borderColor: "#eef0f4", color: "#1f2937" }}>
                                    {product.price}
                                </TableCell>
                                <TableCell align="center" sx={{ fontSize: 14.5, py: 1.5, borderColor: "#eef0f4", color: "#1f2937" }}>
                                    {product.stockQty}
                                </TableCell>
                                <TableCell align="center" sx={{ py: 1.25, borderColor: "#eef0f4" }}>
                                    <Chip
                                        label={product.status}
                                        color={statusColor(product.status)}
                                        size="small"
                                        variant="outlined"
                                        sx={{ fontWeight: 500, fontSize: 13.5, minWidth: 92 }}
                                    />
                                </TableCell>
                                <TableCell align="center" sx={{ py: 1.25, borderColor: "#eef0f4" }}>
                                    <IconButton size="small" onClick={(e) => handleMenuOpen(e, product)}>
                                        <MoreHorizIcon fontSize="small" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={handleEditClick}>Edit</MenuItem>
                <MenuItem onClick={handleViewClick}>View Details</MenuItem>
                <MenuItem onClick={handleDeleteClick} sx={{ color: "error.main" }}>
                    Delete
                </MenuItem>
            </Menu>
            <Box sx={{ display: "flex", justifyContent: { xs: "center", sm: "flex-end" }, alignItems: "center", mt: 1, flexWrap: "wrap" }}>
                <TablePagination
                    component="div"
                    count={productData?.getProducts?.length}
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
            <AddProductModal
                open={addModalOpen}
                handleClose={() => setAddModalOpen(false)}
            />
            <EditProductModal
                open={editModalOpen}
                handleClose={() => setEditModalOpen(false)}
                productToEdit={productToEdit}
            />
            <ViewProductModal
                open={viewModalOpen}
                handleClose={() => setViewModalOpen(false)}
                product={productToView}
            />
            <DeleteProductModal
                open={deleteModalOpen}
                handleClose={() => setDeleteModalOpen(false)}
                productToDelete={productToDelete}
            />
            <Filter
                open={openFilter}
                onClose={() => setOpenFilter(false)}
                setOpenFilter={setOpenFilter}
                setFilter={setFilter}
                setPage={setPage}
                columnOptions={productColumnOptions}
                filterField={productFilterFields}
                categoryOptions={categoryOptions}
                brandOptions={brandOptions}
            />
        </Paper>
    );
};
export default Product;