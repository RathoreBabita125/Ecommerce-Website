import { Box, Button, Chip, Paper, Radio, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import { useQuery } from "@apollo/client/react";
import LoadingCompo from "../../common/LoadingCompo";
import { GETADDRESS } from "../../query/address";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteAddress from "../address/DeleteAdress";

const Address = ({selectedId, setSelectedId}) => {

    const { data: addressData, loading: addressLoading } = useQuery(GETADDRESS);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const navigate = useNavigate();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    if (addressLoading) return <LoadingCompo />

    console.log("addressData ", addressData);

    const labelIcon = (label) => {
        if (label === "Home") return <HomeOutlinedIcon fontSize="small" />;
        if (label === "Work") return <WorkOutlineOutlinedIcon fontSize="small" />;
        return <LocationOnOutlinedIcon fontSize="small" />;
    };

    return (
        <>
            <Box sx={{ flex: 2, width: "100%" }}>
                <Paper sx={{ p: 2.5 }}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                        <Typography fontWeight={700} sx={{ fontSize: 16 }}>
                            Delivery Address
                        </Typography>

                        <Button
                            size="small"
                            startIcon={<AddIcon />}
                            sx={{ textTransform: "none", color: "#1842BB", fontWeight: 600 }}
                            onClick={() => navigate('/address')}
                        >
                            Add new address
                        </Button>

                    </Stack>
                    <Stack spacing={1.5}>
                        {addressData?.getAddress?.map((address) => {
                            const isChecked = selectedId === address.id;
                            return (
                                <Box
                                    key={address.id}
                                    onClick={() => setSelectedId(address.id)}
                                    sx={{
                                        borderRadius: 1.5,
                                        p: 1.75,
                                        transition: "border-color 0.15s, background-color 0.15s",
                                        "&:hover": { borderColor: "#1842BB" },
                                    }}
                                >
                                    <Stack direction="row" spacing={1.5} alignItems="flex-start">
                                        <Radio
                                            checked={isChecked}
                                            size="small"
                                            sx={{ p: 0, mt: 0.2, color: "#1842BB", "&.Mui-checked": { color: "#1842BB" } }}
                                        />
                                        <Box sx={{ flex: 1 }}>
                                            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
                                                <Chip
                                                    size="small"
                                                    icon={labelIcon(address.type)}
                                                    label={address.type}
                                                    sx={{
                                                        height: 22,
                                                        fontSize: 12,
                                                        fontWeight: 600,
                                                        bgcolor: "#eef1fb",
                                                        color: "#1842BB",
                                                        "& .MuiChip-icon": { color: "#1842BB", fontSize: 14 },
                                                    }}
                                                />
                                                <Typography sx={{ fontWeight: 700, fontSize: 14 }}>{address.address_line1}</Typography>
                                            </Stack>
                                            <Typography sx={{ fontWeight: 700, fontSize: 14 }}>{address.landmark}</Typography>
                                            <Typography sx={{ fontSize: 13.5, color: "#555", lineHeight: 1.5 }}>
                                                {address.city}, {address.state} - {address.pincode}
                                            </Typography>
                                            <Typography sx={{ fontSize: 13, color: "#888", mt: 0.5 }}>
                                                Phone: {address.phone}
                                            </Typography>
                                        </Box>
                                        <Box>
                                            <DeleteIcon
                                                fontSize="small"
                                                sx={{ color: "#1842BB", cursor: "pointer" }}
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    setSelectedAddressId(address.id);
                                                    setDeleteDialogOpen(true);
                                                }}
                                            />
                                        </Box>
                                    </Stack>
                                </Box>
                            );
                        })}
                    </Stack>
                </Paper>
                <DeleteAddress
                    open={deleteDialogOpen}
                    onClose={() => setDeleteDialogOpen(false)}
                    selectedAddressId={selectedAddressId}
                />
            </Box>
        </>
    )
}
export default Address;