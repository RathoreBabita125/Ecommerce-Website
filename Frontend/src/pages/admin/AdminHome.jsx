import { Box, Grid, Toolbar, Typography } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import CardComponent from "../../common/Card";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import CategoryIcon from "@mui/icons-material/Category";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const AdminHome = () => {
    const { authUser } = useContext(AuthContext);
    return (
        <>
            <Box component="main" sx={{ flexGrow: 1, p: 3, }}>
                <Toolbar />
                <Typography variant="h4" sx={{ mt: 2 }}>
                    Welcome {authUser.firstName}
                </Typography>
                <Grid container spacing={3} sx={{marginTop:5}}>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <CardComponent
                            title="Total Users"
                            count={120}
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
                            count={65}
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
                            count={15}
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
                            count={8}
                            bgColor="#F3E5F5"
                            icon={
                                <LocalOfferIcon
                                    sx={{ color: "#8E24AA", fontSize: 32 }}
                                />
                            }
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <CardComponent
                            title="Total Orders"
                            count={250}
                            bgColor="#E0F2F1"
                            icon={
                                <ShoppingCartIcon
                                    sx={{ color: "#00897B", fontSize: 32 }}
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