import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Logo from '../components/Logo';
import authAxios from '../utils/authAxios';
import { useNavigate } from 'react-router-dom';
import FormComponent from '../components/FormComponent';



export default function SignUp() {
    const [error, setError] = React.useState('');
    const navigate = useNavigate();
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const details = {
            name: data.get('name'),
            email: data.get('email'),
            password: data.get('password'),
        }
        try {
            const result = await authAxios.post('/register', details);
            if (result) {
                navigate('/');
            }
        } catch (error) {
            setError(error.response.data.message)
        }
    };

    return (
        <FormComponent>
            <Logo />
            <Typography component="h1" variant="h5">
                Sign up
            </Typography>
            {
                error && <Typography variant='subtitle' color={'error'}>{error}</Typography>
            }
            <Box component="form"  onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            name="name"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link href="#/" variant="body2">
                            Already have an account? Sign in
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </FormComponent>
    );
}