import React, { useState } from 'react'
import './Login.scss';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { loginApiCall } from '../../utils/API';
import { errorToast } from '../../utils/Toast';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleLogin = () => {
        setEmailError("");
        setPasswordError("");

        if (!email) {
            setEmailError("Email is Required");
            errorToast("Email is Required");
            return;
        }

        if (!emailRegex.test(email)) {
            setEmailError("Email is not Valid");
            errorToast("Email is not Valid");
            return;
        }

        if (!password) {
            setPasswordError("Password is Required");
            errorToast("Password is Required");
            return;
        }

        loginApiCall({ email, password })
            .then((response) => {
                console.log("Response: ", response);
                localStorage.setItem("token", response.data.id);
                navigate('/dashboard/notes');
                console.log(response);

                if (response.status !== 200) {
                    throw new Error(response?.data?.message);
                } 
            })
            .catch((error) => {
                console.log("An Error Occurred While Logging In: ", error);
            });
    };

    return (
        <div className='login-body-container'>
            <div className='login-form-container'>
                <div className='login-form-container-center'>
                    <div className='login-form-text'>
                        <p className='login-title yellow'>Fundoo Notes</p>
                        <p className='login-title'>Sign In</p>
                        <p>Use Your Fundoo Account</p>
                    </div>
                    <div className='login-form-input-fields'>
                        <div className='login-text-fields'>
                            <TextField id="outlined-basic" label="Email or Phone*" variant="outlined" className='input-field' onChange={(e) => setEmail(e.target.value)} error={!!emailError}
                                helperText={emailError} />
                            <TextField id="outlined-basic" label="Password*" variant="outlined" className='input-field second' type="password" onChange={(e) => setPassword(e.target.value)} error={!!passwordError}
                                helperText={passwordError} />
                        </div>
                        <p className='forgot'>Forgot Password</p>
                    </div>
                    <div className='login-form-buttons'>
                        <NavLink to={'/signup'}><Button variant="text" className='login-button'>Create Account</Button></NavLink>
                        <Button variant="contained" className='login-button' onClick={() => handleLogin()}>Login</Button>
                    </div>
                </div>
            </div>
            <div className='login-extra'>
                <select className='dropdown'>
                    <option value="en">English (United States)</option>
                    <option value="hi">Hindi</option>
                    <option value="fr">French</option>
                    <option value="es">Spanish</option>
                    <option value="de">German</option>
                </select>
                <div className='login-extra-div'>
                    <p>Help</p>
                    <p>Privacy</p>
                    <p>Terms</p>
                </div>
            </div>
        </div>
    )
}
