import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../App';
import FormComponent from '../components/FormComponent';
import { Box, Button, IconButton, TextField, Typography } from '@mui/material';
import CheckboxList from '../components/List';
import authAxios from '../utils/authAxios';
import NavBarComponent from '../components/NavBarComponent';
import Spinner from '../components/Spinner';
import {toast} from 'react-toastify'


const Home = () => {
 // const { user } = useContext(UserContext);
  const [list, setList] = useState(null)
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh((prev) => !prev);
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    const addItem = async (item) => {
      try {
        const result = await authAxios.post('/todo', { title: item });
        if (result) {
          toast.success(result.data.message)
         // toast.success(result.data.message)
          //alert();
          setList((prev) => [...prev, result.data.result])
          handleRefresh();

        }
      } catch (error) {
        toast.error(error);
        console.log(error);
      }
    }
    const data = new FormData(e.currentTarget);
    const item = data.get('item');
    addItem(item);
  }



  useEffect(() => {
    const getAllItems = async () => {
      try {
        const result = await authAxios.get('/todo');
        setList([...result.data]);
      } catch (error) {
        console.log(error);
        toast.error('Error logged to the console');
      }
    }

    getAllItems();
  }, [refresh]);

  return (
    <>
      <NavBarComponent />
      <FormComponent>
        <Typography variant='h5' sx={{ fontWeight: 500 }} mb={1}>To Do List</Typography>
        <hr />
        <form action="" className='flex items-center justify-between mb-3 w-3/4' onSubmit={handleSubmit}>
          <TextField
            required
            label='task'
            name='item'
            size='small'
          />
          <Button type='submit' variant='contained' sx={{
            maxWidth: 'fit-content'
          }} >Add Task</Button>

        </form>

        {
        list ? <CheckboxList data={list} handleRefreshCb={handleRefresh} /> : <Spinner/>
        }

      </FormComponent>
    </>
  )
}

export default Home