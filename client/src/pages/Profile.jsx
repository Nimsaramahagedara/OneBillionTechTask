import React, { useEffect, useState } from 'react'
import FormComponent from '../components/FormComponent'
import authAxios from '../utils/authAxios';

const Profile = () => {
    const [user, setUser] =useState('');

    useEffect(()=>{
        const getUserDetails = async()=>{
            const result =await authAxios.get('/user');
            setUser(result.data);
        }

        getUserDetails();
    },[])
  return (
    <FormComponent>
        {
            user? (JSON.stringify(user)): <p>loading ....</p>
        }
    </FormComponent>
  )
}

export default Profile