import React, { useEffect, useState } from 'react'
import FormComponent from '../components/FormComponent'
import authAxios from '../utils/authAxios';
import { Avatar, Box, Button, TextField, Typography } from '@mui/material';
import NavBarComponent from '../components/NavBarComponent';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';


const Profile = () => {
    const [user, setUser] = useState('');
    const navigate = useNavigate()

    useEffect(() => {
        const getUserDetails = async () => {
            const result = await authAxios.get('/user');
            setUser(result.data);
        }

        getUserDetails();
    }, [])
    return (
        <>
        <NavBarComponent />
        <FormComponent>
            <Typography variant='h6'>User Profile</Typography>
            <Avatar>

            </Avatar>
            {
           user ?<Box sx={{
            display:'flex',
            flexDirection:'column',
            gap:'20px',
            margin:'20px auto'
           }}>
                <TextField label='User ID'  value={user._id} disabled> </TextField>
                <TextField label='User Name'  value={user.name} disabled> </TextField>
                <TextField label='User Email'  value={user.email} disabled> </TextField>
                <TextField label='Registered Date'  value={user.createdAt} disabled> </TextField>
                </Box> : <Spinner/>
            }
            <Button variant='contained' onClick={()=> navigate('/home')}>Go Back</Button>
        </FormComponent>
        </>
    )
}

export default Profile