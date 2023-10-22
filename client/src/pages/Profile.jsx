import React, { useEffect, useState } from 'react'
import FormComponent from '../components/FormComponent'
import authAxios from '../utils/authAxios';
import { Avatar, Typography } from '@mui/material';
import NavBarComponent from '../components/NavBarComponent';

const Profile = () => {
    const [user, setUser] = useState('');

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
            <Typography variant='h5'>User Profile</Typography>
            <Avatar>

            </Avatar>
            {
           user ?<>
                <Typography>{user._id}</Typography>
                <Typography>{user.name}</Typography>
                <Typography>{user.email}</Typography>
                <Typography>{user.createdAt}</Typography>
                </> : <p>loading ....</p>
            }
        </FormComponent>
        </>
    )
}

export default Profile