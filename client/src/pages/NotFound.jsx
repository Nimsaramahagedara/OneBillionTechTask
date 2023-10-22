import { Box, Button, Container, Typography,  } from '@mui/material'
import React from 'react'
import notFoundImg from '../assets/notfound.svg'
import { useNavigate } from 'react-router-dom'


const NotFound = () => {
    const navigate = useNavigate();
  return (
    <Container >
        <Box maxWidth={'50%'} margin={'20px auto'} textAlign={'center'}>
            <img src={notFoundImg} alt="notfound" className='w-full h-full object-contain' />
            <br/>
            <Typography variant='h5'>Ooops...! Page You Are Looking for Cannot be Found</Typography>
            <br/>
            <Button variant='contained' onClick={()=> navigate('/')}>Go back</Button>
        </Box>
    </Container>
  )
}

export default NotFound