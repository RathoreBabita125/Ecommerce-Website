import { Box, Grid, Toolbar, Typography } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import CardComponent from "../../common/Card";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import CategoryIcon from "@mui/icons-material/Category";
import { useQuery } from "@apollo/client/react";
import { GETUSERS } from "../../query/user";
import { GETCATEGORIES } from "../../query/category";
import { GETPRODUCTS } from "../../query/product";
import LoadingCompo from "../../common/LoadingCompo";
import DiscountIcon from "@mui/icons-material/LocalOffer";
import { GETCOUPONS } from "../../query/coupon";

const AdminHome = () => {
    const { authUser } = useContext(AuthContext);
    const { data: userData, loading: userLoading } = useQuery(GETUSERS);
    const { data: categoryData, loading: categoryLoading } = useQuery(GETCATEGORIES);
    const { data: productData, loading: productLoading } = useQuery(GETPRODUCTS);
    const { data: couponData, loading: couponLoading } = useQuery(GETCOUPONS);

    if (userLoading || categoryLoading || productLoading || couponLoading) return <LoadingCompo />

    const totalUsers = userData?.getUsers?.length;
    const totalCategories = categoryData?.getCategories?.length;
    const totalProducts = productData?.getProducts?.length;
    const totalCoupons = couponData?.getCoupons?.length;

    return (
        <>
            <Box component="main" sx={{ flexGrow: 1, p: 3, }}>
                <Toolbar />
                <Typography variant="h4" sx={{ mt: 2 }}>
                    Welcome {authUser.firstName}
                </Typography>
                <Grid container spacing={3} sx={{ marginTop: 5 }}>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <CardComponent
                            title="Total Users"
                            count={totalUsers}
                            bgColor="#E3F2FD"
                            icon={
                                <PeopleAltIcon
                                    sx={{ color: "#1976d2", fontSize: 32 }}
                                />
                            }
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <CardComponent
                            title="Total Products"
                            count={totalProducts}
                            bgColor="#FFF3E0"
                            icon={
                                <Inventory2Icon
                                    sx={{ color: "#EF6C00", fontSize: 32 }}
                                />
                            }
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <CardComponent
                            title="Total Categories"
                            count={totalCategories}
                            bgColor="#E8F5E9"
                            icon={
                                <CategoryIcon
                                    sx={{ color: "#2E7D32", fontSize: 32 }}
                                />
                            }
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <CardComponent
                            title="Total Coupons"
                            count={totalCoupons}
                            bgColor="#E8F5E9"
                            icon={
                                <DiscountIcon
                                    sx={{ color: "#db21bf", fontSize: 32 }}
                                />
                            }
                        />
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
export default AdminHome;