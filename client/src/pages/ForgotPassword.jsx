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
import { useNavigate } from 'react-router-dom';
import FormComponent from '../components/FormComponent';

export default function ForgotPassword() {
    const [error, setError] = React.useState('');
    const navigate = useNavigate();

    const handleSubmit =async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email');
        try {
            const result=await authAxios.post('/reset',{email});
            console.log(result);
            setError(result.data.message);
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    return (

        <FormComponent>
            <Logo/>
            <Typography component="h1" variant="h5">
                Forgot Password
            </Typography>
            {
                error && <Typography variant="subtitle1" color={'error'} sx={{fontSize:12}}>{error}</Typography>
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
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Send Email
                </Button>
                <Grid container>
                    <Grid item>
                        <Link href="#/" variant="body2">
                            {"Go to? Login"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
            </FormComponent>
    );
}