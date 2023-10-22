import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Logo from '../components/Logo';
import authAxios from '../utils/authAxios';
import Cookies from 'js-cookie';
import { useNavigate, useLocation } from 'react-router-dom';

export default function ChangePassword() {
    const [error, setError] = React.useState('');
    const [email, setEmail] = React.useState('');
    const navigate = useNavigate();
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const token = params.get('token');
    const id = params.get('id');

    React.useEffect(()=>{

    },[]);
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const credential = {
            token,
            id,
            password: data.get('password'),
        };
        try {
            const result = await authAxios.put('/', credential);
            if(result){
                alert('Password Updated');
            }
            navigate('/');
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    return (

        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '30px 20px',
                boxShadow: '0 0 10px rgba(0,0,0,0.2)'
            }}
        >
            <Logo />
            <Typography component="h1" variant="h5">
                Change Your Password
            </Typography>
            {
                error && <Typography variant="subtitle1" color={'error'} sx={{ fontSize: 12 }}>{error}</Typography>
            }
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    value={email}
                    id="email"
                    label="Email Address"
                    name="email"
                    disabled
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
                    Change Password
                </Button>
                <Grid container>
                    <Grid item>
                        <Link href="#/" variant="body2">
                            {"Remember the Password? Login"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}