import { Box, Button, MenuItem, Stack, Typography, TextField } from "@mui/material";
import { toast } from "react-toastify";
import { validateAddress } from "../../validators/validateAddress";
import { useContext, useState } from "react";
import { useMutation } from "@apollo/client/react";
import { AuthContext } from "../../context/AuthContext";
import { CREATEADDRESS, GETADDRESS } from "../../query/address";
import { useNavigate } from 'react-router-dom';

const AddAdddress = () => {

    const [createAddress] = useMutation(CREATEADDRESS, {
        refetchQueries:[GETADDRESS]
    });
    
    const emptyAddress = {
        phone: "",
        address_line1: "",
        address_line2: "",
        landmark: "",
        city: "",
        state: "",
        pincode: "",
        country: "",
        type: ""
    };

    const addressTypes = ["Home", "Work", "Other"];
    
    const { authUser } = useContext(AuthContext);
    const [address, setAddress] = useState(emptyAddress);
    const [errors, setErrors] = useState(emptyAddress);
    const navigate = useNavigate();

    const handleFieldChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setAddress((pre) => ({ ...pre, [name]: value }));
    }

    console.log("authUser: ", authUser)

    const handleSaveAddress = async () => {
        try {
            const isValid = validateAddress(address, setErrors);
            if (!isValid) return;
            const response = await createAddress({
                variables: {
                    user: authUser.id,
                    phone: address.phone,
                    address_line1: address.address_line1,
                    address_line2: address.address_line2,
                    landmark: address.landmark,
                    city: address.city,
                    state: address.state,
                    pincode: address.pincode,
                    country: address.country,
                    type: address.type
                }
            });
            if (response) {
                toast.success(`A new address has been added successfully.`);
                setAddress(emptyAddress);
                navigate('/checkout');
            }
        } catch (error) {
            toast.error(`Add new address failed: ${error.message}`);
        }
    }

    return (
        <>
            <Box sx={{ display: "flex", justifyContent: 'center', alignItems: 'center' }}>
                <Stack spacing={2} sx={{ padding: 20, width: '40vw' }}>
                    <Typography variant="h5" sx={{ fontWeight: 600, color: '#1842BB' }}>Provide your address information </Typography>
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2} >
                        <TextField
                            label="Phone number"
                            fullWidth
                            name="phone"
                            value={address.phone}
                            onChange={handleFieldChange}
                            error={!!errors.phone}
                            helperText={errors.phone}
                            size="small"
                            required
                        />
                        <TextField
                            select
                            label="Address type"
                            fullWidth
                            name="type"
                            value={address.type}
                            onChange={handleFieldChange}
                            error={!!errors.type}
                            helperText={errors.type}
                            size="small"
                            required
                        >
                            {addressTypes.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Stack>

                    <TextField
                        label="House no., building, street (Address line 1)"
                        fullWidth
                        multiline
                        minRows={2}
                        name="address_line1"
                        value={address.address_line1}
                        onChange={handleFieldChange}
                        error={!!errors.address_line1}
                        helperText={errors.address_line1}
                        size="small"
                        required
                    />

                    <TextField
                        label="Area, colony, sector (Address line 2)"
                        fullWidth
                        multiline
                        minRows={2}
                        name="address_line2"
                        value={address.address_line2}
                        onChange={handleFieldChange}
                        error={!!errors.address_line2}
                        helperText={errors.address_line2}
                        size="small"
                    />

                    <TextField
                        label="Landmark"
                        fullWidth
                        name="landmark"
                        value={address.landmark}
                        onChange={handleFieldChange}
                        error={!!errors.landmark}
                        helperText={errors.landmark}
                        size="small"
                    />

                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                        <TextField
                            label="City"
                            fullWidth
                            name="city"
                            value={address.city}
                            onChange={handleFieldChange}
                            error={!!errors.city}
                            helperText={errors.city}
                            size="small"
                            required
                        />
                        <TextField
                            label="State"
                            fullWidth
                            name="state"
                            value={address.state}
                            onChange={handleFieldChange}
                            error={!!errors.state}
                            helperText={errors.state}
                            size="small"
                            required
                        />
                        <TextField
                            label="Pincode"
                            fullWidth
                            name="pincode"
                            value={address.pincode}
                            onChange={handleFieldChange}
                            error={!!errors.pincode}
                            helperText={errors.pincode}
                            size="small"
                            required
                        />
                    </Stack>

                    <TextField
                        label="Country"
                        fullWidth
                        name="country"
                        value={address.country}
                        onChange={handleFieldChange}
                        error={!!errors.country}
                        helperText={errors.country}
                        size="small"
                        required
                    />

                    <Stack direction="row" spacing={2} sx={{ pt: 1 }}>
                        <Button
                            variant="contained"
                            onClick={handleSaveAddress}
                            sx={{
                                bgcolor: "#1842BB", fontWeight: 700, textTransform: "none", px: 3,
                                "&:hover": { bgcolor: "#496edc" },
                            }}
                        >
                            Save address
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={()=>navigate('/checkout')}
                            sx={{ color: "#1842BB", textTransform: "none", fontWeight: 600 }}

                        >
                            Cancel
                        </Button>

                    </Stack>
                </Stack>
            </Box>
        </>
    )
}
export default AddAdddress;




