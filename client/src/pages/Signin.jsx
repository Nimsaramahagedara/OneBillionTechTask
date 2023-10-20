import React, { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Logo from '../components/Logo';
import authAxios from '../utils/authAxios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import FormComponent from '../components/FormComponent';
import { UserContext } from '../App';

export default function SignIn() {
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { user, handleChangeUser } = useContext(UserContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const credential = {
            email: data.get('email'),
            password: data.get('password'),
        };
        try {
            const result = await authAxios.post('/login', credential);
            Cookies.set('token', result.data.token);
            const { name } = result.data.user
            console.log(name);
            handleChangeUser(name);

            navigate('/home');
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    return (

        <FormComponent>
            <Logo />
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            {
                error && <Typography variant="subtitle1" color={'error'} sx={{ fontSize: 12 }}>{error}</Typography>
            }
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign In
                </Button>
                <Grid container>
                    <Grid item xs>
                        <Link href="#/reset" variant="body2">
                            Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href="#/register" variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </FormComponent>
    );
}