import { CircularProgress } from '@mui/material'
import React from 'react'

const Spinner = () => {
  return (
    <div className='absolute top-2/4 left-2/4 transform translate-x-[-50%] z-10' >
        <CircularProgress />
    </div>
  )
}

export default Spinner