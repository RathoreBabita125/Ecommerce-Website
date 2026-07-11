import { Box, Button, IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from 'react-router-dom'
import './login.css';
import { SIGNIN } from "../../query/user";
import { useMutation } from "@apollo/client/react";
import { handleInputChange } from "../../common/handleInputChange";
import { useContext, useState } from "react";
import { onBlurHandler } from "../../common/handleOnBlur";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { emailInputCheck } from "../../constants/const";
import { checkValidInput } from "../../common/validateInputs";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";

const Signin = () => {
    const [signup] = useMutation(SIGNIN);
    const [user, setUser] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState({
        email: '',
        password: ''
    });
    const [showVisible, setShowVisible] = useState(false);
    const navigate = useNavigate();
    const { authUser } = useContext(AuthContext);

    const handleChange = (event) => {
        handleInputChange(event, user, setUser, error, setError);
    }
    const handleBlur = (event) => {
        onBlurHandler(event, user, setError);
    }
    const checkFormValid =
        user?.email?.trim() !== "" &&
        emailInputCheck.test(user?.email) &&
        user?.password.length >= 8

    const loginButtonHandler = async (event) => {
        event.preventDefault();
        try {
            const inputFields = ["email", "password"];
            const isValid = checkValidInput(inputFields, setError, user);
            if (!isValid) {
                toast.error("Username or Password does not exist.");
                return;
            }
            const {data} = await signup({
                variables: {
                    email: user.email,
                    password: user.password
                }
            })
            const userData = data.signin.user;
            if (userData.role === 'Admin' ) {
                navigate('/admin/dashboard', { replace: true });
            }
            else if(userData.role === 'Customer'){
                navigate('/', { replace: true });
            }
            toast.success("You have successfully signed in.");
            setUser({
                email: '',
                password: ''
            });
            
        } catch (error) {
            console.log(error);
            toast.error("Invalid Credentials");
        }
    }
    return (
        <>
            <Box className="login-section">
                <Box className='login-box'>
                    <Box className='login-box-1'>
                        <Typography variant="h3" sx={{ fontWeight: 'bold' }}>Sign in</Typography>
                        <Box className='login-form-box'>
                            <TextField
                                type="email"
                                name="email"
                                error={error.email}
                                helperText={error?.email ? error.email : ''}
                                value={user.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                label="Email"
                                variant="outlined"
                                color="primary" />
                            <TextField
                                name="password"
                                type={showVisible.password ? 'text' : 'password'}
                                error={error.password}
                                helperText={error?.password ? error.password : ''}
                                value={user.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                label="Password"
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
                            <Stack direction={'row'} sx={{ justifyContent: 'space-between', marginTop: 2, textAlign: 'center' }}>
                                <Link to='/forget'><Typography sx={{ cursor: 'pointer', color: '#053348' }}>Forgot password?</Typography></Link>
                            </Stack>
                            <Button
                                variant="contained"
                                className="login-button"
                                onClick={loginButtonHandler}
                                disabled={!checkFormValid}
                                sx={{ backgroundColor: checkFormValid ? '#1842BB' : '#E0E0E0', color: 'white' }}
                            >Sign in</Button>
                            <Stack direction={'row'} spacing={1}>
                                <Typography variant="body1" sx={{ color: 'gray' }}>Don't have an Account? </Typography>
                                <Link to="/signup"><Typography sx={{ color: '#1842BB', cursor: 'pointer' }}><strong>Sign up</strong></Typography></Link>
                            </Stack>
                        </Box>
                    </Box>

                    <Box className='login-box-2'>
                    </Box>
                </Box>
            </Box>
        </>
    )
}
export default Signin;