import Button from '@mui/material/Button';
import { Box, FormControl, IconButton, InputAdornment, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import './login.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { emailInputCheck } from '../../constants/const';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { SIGNUP } from '../../query/user';
import { useMutation } from "@apollo/client/react";
import { toast } from 'react-toastify'
import { handleInputChange } from '../../common/handleInputChange';
import { onBlurHandler } from '../../common/handleOnBlur';
import { checkValidInput } from '../../common/validateInputs';

const Signup = () => {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: ''
    });
    const [error, setError] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: ''
    })
    const [showVisible, setShowVisible] = useState(false);
    const [signupData] = useMutation(SIGNUP)

    const handleChange=(event)=>{
        handleInputChange(event, user, setUser, error, setError)
    }

    const handleOnBlur=(event)=>{
        onBlurHandler(event,user, setError)
    }

    const checkFormValid = user?.firstName?.trim() !== "" &&
        user?.lastName?.trim() !== ""
        user?.email?.trim() !== "" &&
        emailInputCheck.test(user?.email) &&
        user?.password.length >= 8 &&
        user?.confirmPassword === user?.password &&
        user?.role !== ""

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const inputFields = ["firstName", "lastName", "email", "password", "confirmPassword", "role"];
            const valid = checkValidInput(inputFields, setError, user);
            if (!valid) {
                return;
            }
            const response =
                await signupData({
                    variables: {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        password: user.password,
                        confirmPassword: user.confirmPassword,
                        role: user.role,
                    },
                }
                );
            if (response) {
                toast.success("You have successfully signed up.");
                setUser({
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    role: ''
                });
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message);
        }
    }
    return (
        <>
            <Box className='register-section'>
                <Box className='register-parent'>
                    <Box className='register-left-section'>
                        <Box className='register-left'></Box>
                    </Box>
                    <Box className='register-right-section'>
                        <FormControl sx={{ marginTop: 2, padding: 7 }}>
                            <Typography variant="h4" color="intial" sx={{ fontWeight: 'bold', mb: 2 }}>Sign up </Typography>
                            <Stack className='register-form' direction={'column'} spacing={1}>
                                <TextField
                                    id='firstName'
                                    error={error.firstName}
                                    helperText={error.firstName ? error.firstName : ''}
                                    type="text"
                                    onBlur={handleOnBlur}
                                    name="firstName"
                                    value={user.firstName}
                                    onChange={handleChange}
                                    label="First Name"
                                    variant="outlined"
                                    required
                                    color="primary" />
                                <TextField
                                    id='lastName'
                                    error={error.lastName}
                                    helperText={error.lastName ? error.lastName : ''}
                                    type="text"
                                    onBlur={handleOnBlur}
                                    name="lastName"
                                    value={user.lastName}
                                    onChange={handleChange}
                                    label="Last Name"
                                    variant="outlined"
                                    required
                                    color="primary" />
                                <TextField
                                    id="email"
                                    error={error.email}
                                    helperText={error.email ? error.email : ''}
                                    type="email"
                                    onBlur={handleOnBlur}
                                    name="email"
                                    value={user.email}
                                    onChange={handleChange}
                                    label="Email"
                                    variant="outlined"
                                    required
                                    color="primary" />
                                <TextField
                                    id="password"
                                    error={error.password}
                                    helperText={error.password ? error.password : ''}
                                    type={showVisible.password ? 'text' : 'password'}
                                    onBlur={handleOnBlur}
                                    name="password"
                                    value={user.password}
                                    onChange={handleChange}
                                    label="Password"
                                    required
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
                                    variant="outlined"
                                    color="primary" />
                                <TextField
                                    id="confirm-password"
                                    error={error.confirmPassword}
                                    helperText={error.confirmPassword ? error.confirmPassword : ''}
                                    type={showVisible.confirmPassword ? 'text' : 'password'}
                                    onBlur={handleOnBlur}
                                    name="confirmPassword"
                                    value={user.confirmPassword}
                                    onChange={handleChange}
                                    label="Confirm Password"
                                    required
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
                                    variant="outlined"
                                    color="primary"
                                />
                                <FormControl>
                                    <Select
                                        sx={{ mt: 1 }}
                                        variant="outlined"
                                        name="role"
                                        value={user.role}
                                        onChange={handleChange}
                                        required
                                        onBlur={handleOnBlur}
                                        displayEmpty
                                        error={error.role}
                                        label="Select Role *"
                                        color="primary"
                                    >
                                        <MenuItem value="" disabled >Select Role *</MenuItem>
                                        <MenuItem value="Admin">Admin</MenuItem>
                                        <MenuItem value="Customer">Customer</MenuItem>
                                    </Select>
                                </FormControl>
                                <Button
                                    className="register-signup-button"
                                    variant="contained"
                                    onClick={handleFormSubmit}
                                    sx={{ backgroundColor: checkFormValid ? '#1842BB' : '#E0E0E0', color: 'white' }}
                                    disabled={!checkFormValid}
                                >
                                    Sign Up
                                </Button>
                                <Stack direction={'row'} spacing={1}>
                                    <Typography variant="body1" sx={{ color: 'gray' }}>Already have an Account? </Typography>
                                    <Link to="/signin"><Typography sx={{ color: '#1842BB', cursor: 'pointer' }}><strong>Sign in</strong></Typography></Link>
                                </Stack>
                            </Stack>
                        </FormControl>
                    </Box>
                </Box>
            </Box>
        </>
    )
}
export default Signup;