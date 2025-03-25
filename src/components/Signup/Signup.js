import React, { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './Signup.scss';
import signupImage from '../../assets/googleOne.png'
import { errorToast } from '../../utils/Toast';
import { signinApiCall } from '../../utils/API';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Signup() {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmError, setConfirmError] = useState("");

    const nameRegex = /^[A-Za-z\s]{2,50}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/;

    const handleSignup = () => {
        setFirstNameError('');
        setLastNameError('');
        setEmailError('');
        setPasswordError('');
        setConfirmError('');

        if (!firstName) {
            setFirstNameError("First Name is Required");
            errorToast("First Name is Required");
            return;
        }
        else if (!nameRegex.test(firstName)) {
            setFirstNameError("First Name can only contain Alphabets");
            errorToast("First Name can only contain Alphabets");
            return;
        }

        if (!lastName) {
            setLastNameError("Last Name is Required");
            errorToast("Last Name is Required");
            return;
        }
        else if (!nameRegex.test(lastName)) {
            setLastNameError("Last Name can only contain Alphabets");
            errorToast("Last Name can only contain Alphabets");
            return;
        }

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
        else if (!passwordRegex.test(password)) {
            setPasswordError("Password must contain an Uppercase alphabet, a number and a symbol");
            errorToast("Password must contain an Uppercase alphabet, a number and a symbol");
            return;
        }

        if (!confirm) {
            setConfirmError("Confirmed Password is Required");
            errorToast("Confirmed Password is Required");
            return;
        }
        else if (!passwordRegex.test(confirm)) {
            setConfirmError("Confirmed Password must contain an Uppercase alphabet, a number and a symbol");
            errorToast("Confirmed Password must contain an Uppercase alphabet, a number and a symbol");
            return;
        }

        if (password !== confirm) {
            setConfirmError("Passwords does not Match");
            return;
        }

        signinApiCall({ firstName, lastName, email, password, service: "advance" })
            .then((response) => {
                navigate('/');

                if (response.status !== 200) {
                    throw new Error(response?.data?.message);
                }
            })
            .catch((error) => {
                console.error("An Error Occurred While Signing In: ", error);
            });
    }

    return (
        <div className="signup-body-container">
            <div className="signup-form-container">
                <div className="signup-form-container-center">
                    <div className="signup-form-left-container">
                        <div className="signup-left-text">
                            <p className='signup-title yellow'>Fundoo Notes</p>
                            <p className='signup-title'>Create your Fundoo Account</p>
                        </div>
                        <div className="signup-left-input-fields">
                            <div className='signup-left-name-field'>
                                <TextField id="outlined-basic" label="First Name*" variant="outlined" className='input-field' onChange={(e) => setFirstName(e.target.value)} error={!!firstNameError}
                                    helperText={firstNameError} />
                                <TextField id="outlined-basic" label="Last Name*" variant="outlined" className='input-field' onChange={(e) => setLastName(e.target.value)} error={!!lastNameError}
                                    helperText={lastNameError} />
                            </div>
                            <div className='signup-left-username-field'>
                                <TextField id="outlined-basic" label="Email*" variant="outlined" className='input-field' onChange={(e) => setEmail(e.target.value)} error={!!emailError}
                                    helperText={emailError} />
                                <p className='input-field-descriptors'>You can use letters, numbers & periods</p>
                            </div>
                            <div className='signup-left-password-field'>
                                <div className='password-field-input'>
                                    <TextField id="outlined-basic" label="Password*" variant="outlined" className='input-field' type="password" onChange={(e) => setPassword(e.target.value)} error={!!passwordError}
                                        helperText={passwordError} />
                                    <TextField id="outlined-basic" label="Confirm*" variant="outlined" className='input-field' type="password" onChange={(e) => setConfirm(e.target.value)} error={!!confirmError}
                                        helperText={confirmError} />
                                </div>
                                <p className='input-field-descriptors'>Use 8 or more characters wit a mix of letters, numbers & symbols</p>
                            </div>
                        </div>
                        <div className="signup-left-buttons">
                            <NavLink to={'/'}><Button variant="text" className='login-button' onClick={() => navigate('/')}>Sign In Instead</Button></NavLink>
                            <Button variant="contained" className='login-button' onClick={() => handleSignup()}>Register</Button>
                        </div>
                    </div>
                    <div className="signup-form-right-container">
                        <div className='signup-form-right-center'>
                            <div className='signup-right-image'>
                                <img src={signupImage} alt='Image not Found'></img>
                            </div>
                            <div className='signup-right-text'>One Account. All of Fundoo Working for You.</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='signup-extra'>
                <select className='dropdown'>
                    <option value="en">English (United States)</option>
                    <option value="hi">Hindi</option>
                    <option value="fr">French</option>
                    <option value="es">Spanish</option>
                    <option value="de">German</option>
                </select>
                <div className='signup-extra-div'>
                    <p>Help</p>
                    <p>Privacy</p>
                    <p>Terms</p>
                </div>
            </div>
        </div>
    )
}