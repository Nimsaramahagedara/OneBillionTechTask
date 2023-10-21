import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../App';
import FormComponent from '../components/FormComponent';
import { Button, TextField, Typography } from '@mui/material';
import CheckboxList from '../components/List';
import authAxios from '../utils/authAxios';
import NavBarComponent from '../components/NavBarComponent';

const Home = () => {
  const { user } = useContext(UserContext);
  const [list, setList] = useState();
  const [refresh, setRefresh] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const addItem = async (item) => {
      try {
        const result = await authAxios.post('/todo', { title: item });
        if (result) {
          alert(result.data.message);
          setList((prev) => [...prev, result.data.result])
        }
      } catch (error) {
        console.log(error);
      }
    }
    const data = new FormData(e.currentTarget);
    const item = data.get('item');
    addItem(item);
  }
  const handleRefresh = () => {
    setRefresh((prev) => !prev);
  }

  useEffect(() => {
    const getAllItems = async () => {
      try {
        const result = await authAxios.get('/todo');
        setList(result.data);
      } catch (error) {
        alert(error.data.message)
      }


    }

    getAllItems();
  }, [refresh]);

  return (
    <>
      <NavBarComponent />
      <FormComponent>
        <Typography variant='h5'>To Do List</Typography>
        <hr />
        <form action="" className='flex items-center justify-between' onSubmit={handleSubmit}>
          <TextField
            required
            label="item"
            name='item'
            size='small'
          />
          <Button type='submit' variant='contained' sx={{
            maxWidth: 'fit-content'
          }} >Add To List</Button>
        </form>
        <CheckboxList data={list} handleRefreshCb={handleRefresh} />
      </FormComponent>
    </>
  )
}

export default Home