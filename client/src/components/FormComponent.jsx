import { Box } from '@mui/material'
import React from 'react'

const FormComponent = ({children}) => {
    return (
        <Box
            sx={{
                margin: '50px auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '30px 20px',
                boxShadow: '0 0 10px rgba(0,0,0,0.2)',
                borderRadius: '20px',
                maxWidth:'468px'
            }}
        >

            {children}
        </Box>
    )
}

export default FormComponent