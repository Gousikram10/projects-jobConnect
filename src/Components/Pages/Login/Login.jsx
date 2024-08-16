import React, { useState } from 'react';
import './Login.css';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handle = async(event) => {
        event.preventDefault();

        if (!validateEmail(email)) {
            setError('Invalid email format');
            return;
        }

        if (pass.length < 3) {
            setError('Password must be at least 3 characters long');
            return;
        }

        setError(''); // Clear any previous errors

        const response = await fetch(`http://localhost:8081/getemail/${email}/${pass}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        const responsebody = await response.text();

        if (responsebody) {
            alert(responsebody);
            if (responsebody === "Logged Successfully") {
                setEmail(email);
                console.log(email);
                navigate('/admin');
            }
        } else {
            alert("Login failed");
        }
    };

    return (
        <div className='login'>
            <div className='login-box'>
                <div className='input'>
                    <div className="login-icon">
                        <AccountCircleIcon sx={{ fontSize: '70px' }} />
                    </div>
                    <Box
                        className='login-input'
                        component="form"
                        sx={{ '& > :not(style)': { m: 1, width: '42ch' } }}
                        noValidate
                        autoComplete="off"
                        onSubmit={handle}
                    >
                        <TextField
                            id="outlined-basic"
                            label="Email"
                            variant="outlined"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            error={error && !validateEmail(email)}
                            helperText={error && !validateEmail(email) ? error : ''}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Password"
                            variant="outlined"
                            type="password"
                            onChange={(e) => setPass(e.target.value)}
                            required
                            error={error && pass.length < 6}
                            helperText={error && pass.length < 6 ? error : ''}
                        />
                        <FormGroup>
                            <FormControlLabel
                                sx={{ marginTop: '-10px' }}
                                control={<Checkbox defaultChecked />}
                                label="I Agree to the terms and Conditions"
                            />
                        </FormGroup>
                        <div className="login-button">
                            <Stack direction="row" spacing={2}>
                                <Button
                                    sx={{ fontSize: '16px', fontWeight: '500', width: '400px' }}
                                    variant="contained"
                                    type='submit'
                                >
                                    Login
                                </Button>
                            </Stack>
                        </div>
                    </Box>
                </div>
            </div>
        </div>
    );
};
