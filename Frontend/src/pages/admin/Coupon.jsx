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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PaginationActions from "../../common/Pagination";
import { useQuery } from "@apollo/client/react";
import { BRAND_COLOR, couponColumns, productColumns } from "../../constants/const";
import LoadingCompo from "../../common/LoadingCompo";
import AddCouponModal from "../coupon/AddCoupon";
import { GETCOUPONS } from "../../query/coupon";
import DeleteCoupon from "../coupon/DeleteCoupon";

const Coupon = () => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [addCouponlOpen, setAddCouponOpen] = useState(false);
    const [deleteCouponOpen, setDeleteCouponOpen] = useState(false);
    const [selectedCoupon, setSelectedCoupon]=useState(null);

    const { data: couponData, loading: couponLoading } = useQuery(GETCOUPONS);

    console.log("couponData: ", couponData);

    if(couponLoading) return <LoadingCompo/>
    
    const paginatedRows = couponData?.getCoupons?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

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
                        onClick={() => setAddCouponOpen(true)}
                        sx={{
                            backgroundColor: BRAND_COLOR,
                            textTransform: "none",
                            boxShadow: "none",
                            "&:hover": { backgroundColor: BRAND_COLOR, opacity: 0.9, boxShadow: "none" },
                        }}
                    >
                        Add Coupon
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
                            {couponColumns.map((col) => (
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
                        {couponLoading && (
                            <TableRow>
                                <TableCell colSpan={productColumns.length} align="center" sx={{ py: 4 }}>
                                    <LoadingCompo />
                                </TableCell>
                            </TableRow>
                        )}


                        {paginatedRows?.map((coupon) => (
                            <TableRow
                                key={coupon.id}
                                hover
                                sx={{ backgroundColor: "#ffffff", "&:last-child td": { borderBottom: "none" } }}
                            >
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
                                    title={coupon.couponCode}
                                >
                                    {coupon.couponCode}
                                </TableCell>
                                <TableCell align="center" sx={{ fontSize: 14.5, py: 1.5, borderColor: "#eef0f4", color: "#1f2937" }}>
                                    {coupon.discount}
                                </TableCell>
                                <TableCell align="center" sx={{ fontSize: 14.5, py: 1.5, borderColor: "#eef0f4", color: "#1f2937" }}>
                                    {coupon?.minOrderValue}
                                </TableCell>
                                <TableCell align="center" sx={{ fontSize: 14.5, py: 1.5, borderColor: "#eef0f4", color: "#1f2937" }}>
                                    {coupon.expiryDate
                                        ? new Date(coupon.expiryDate).toLocaleString("en-IN", {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            hour12: true
                                        })
                                        : '-'}
                                </TableCell>
                                <TableCell align="center" sx={{ fontSize: 14.5, py: 1.5, borderColor: "#eef0f4", color: "#1f2937" }}>
                                    {coupon?.user?.firstName ? coupon?.user?.firstName : '-'}
                                </TableCell>
                                <TableCell align="center" sx={{ fontSize: 14.5, py: 1.5, borderColor: "#eef0f4", color: "#1f2937" }}>
                                    {coupon?.user?.email ? coupon?.user?.email : '-'}
                                </TableCell>
                                <TableCell align="center" sx={{ py: 1.25, borderColor: "#eef0f4" }}>
                                    <Chip
                                        label={coupon.isActive===true ? "Active" : "Inactive"}
                                        color='success'
                                        size="small"
                                        variant="outlined"
                                        sx={{ fontWeight: 500, fontSize: 13.5, minWidth: 92 }}
                                    />
                                </TableCell>
                                 <TableCell align="center" sx={{ fontSize: 14.5, py: 1.5, borderColor: "#eef0f4", color: "#1f2937" }}>
                                   <Button 
                                        variant="outlined" 
                                        sx={{color:BRAND_COLOR}}
                                        onClick={()=>{
                                            setDeleteCouponOpen(true);
                                            setSelectedCoupon(coupon);
                                        }}
                                    >
                                        Delete
                                   </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ display: "flex", justifyContent: { xs: "center", sm: "flex-end" }, alignItems: "center", mt: 1, flexWrap: "wrap" }}>
                <TablePagination
                    component="div"
                    count={couponData?.getCoupons?.length}
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
            <AddCouponModal
                open={addCouponlOpen}
                onClose={() => setAddCouponOpen(false)}
            />
            <DeleteCoupon
                open={deleteCouponOpen}
                onClose={() => setDeleteCouponOpen(false)}
                selectedCoupon={selectedCoupon}
            /> 
        </Paper>
    );
};
export default Coupon;