import { Box, Button, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import ArrowBack from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import './login.css';
import { FORGET } from "../../query/user";
import { useMutation } from "@apollo/client/react";
import { useState } from "react";
import { handleInputChange } from "../../common/handleInputChange";
import { onBlurHandler } from "../../common/handleOnBlur";
import { emailInputCheck } from "../../constants/const";
import { checkValidInput } from "../../common/validateInputs";
import { toast } from "react-toastify";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Forget = () => {
    const [forgetData] = useMutation(FORGET);
    const [user, setUser] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showVisible, setShowVisible] = useState({
        password: false,
        confirmPassword: false
    });

    const handleChange = (event) => {
        handleInputChange(event, user, setUser, error, setError);
    }
    const handleBlur = (event) => {
        onBlurHandler(event, user, setError);
    }
    const isFormValid =
        user?.email?.trim() !== "" &&
        emailInputCheck.test(user?.email) &&
        user?.password.length >= 8 &&
        user?.confirmPassword === user?.password;

    const handleResetPassword = async (event) => {
        event.preventDefault();
        try {
            const inputFields = ["email", "password", "confirmPassword"];
            const isValid = checkValidInput(inputFields, setError, user);
            if (!isValid) return;

            const response = await forgetData({
                variables: {
                    email: user.email,
                    password: user.password,
                    confirmPassword: user.confirmPassword
                }
            });
            if (response) {
                toast.success("Password has been updated successfully.");
                setUser({
                    email: '',
                    password: '',
                    confirmPassword: ''
                });
            }
        } catch (error) {
            console.log(error);
            toast.error("Reset password failed.");
        }
    }

    return (
        <>
            <Box className='forget-section'>
                <Box className='forget-box'>
                    <Box className='forget-box-1'>
                        <Box className='forget-form-box'>
                            <Typography className="forget-form-typo">Forget Password?</Typography>
                            <TextField
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={error.email}
                                helperText={error.email ? error.email : ''}
                                type="email"
                                label="Email"
                                variant="outlined"
                                color="success" />
                            <TextField
                                name="password"
                                value={user.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={error.password}
                                helperText={error.password ? error.password : ''}
                                type={showVisible.password ? 'text' : 'password'}
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton aria-label="" onClick={() => setShowVisible((pre) => ({ ...pre, password: !pre.password }))}>
                                                    {showVisible.password ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }
                                }}
                                label="New password"
                                variant="outlined"
                                color="success" />
                            <TextField
                                name="confirmPassword"
                                type={showVisible.confirmPassword ? 'text' : 'password'}
                                value={user.confirmPassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={error.confirmPassword}
                                helperText={error.confirmPassword ? error.confirmPassword : ''}
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton aria-label="" onClick={() => setShowVisible((pre) => ({ ...pre, confirmPassword: !pre.confirmPassword }))}>
                                                    {showVisible.confirmPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }
                                }}
                                label="Confirm New password"
                                variant="outlined"
                                color="success" />
                            <Button
                                variant="contained"
                                className="reset-button"
                                onClick={handleResetPassword}
                                disabled={!isFormValid}
                                sx={{ backgroundColor: isFormValid ? '#1842BB' : '#E0E0E0', color: 'white' }}
                            >Reset Password</Button>
                            <Link to='/signin'>
                                <Button variant="text" className="back-login">
                                    <ArrowBack />
                                    <Typography>Back to Log in</Typography>
                                </Button>
                            </Link>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}
export default Forget;