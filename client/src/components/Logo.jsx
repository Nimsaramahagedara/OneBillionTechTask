import { Box } from '@mui/material'
import React from 'react'
import logo from '../assets/logo.webp'
const Logo = () => {
  return (
    <Box sx={{maxWidth:'100px'}}>
        <img src={logo} alt="logo" className='w-full h-full object-contain'/>
    </Box>
  )
}

export default Logo