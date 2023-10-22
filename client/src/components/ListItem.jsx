import React, { useState } from 'react'
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import authAxios from '../utils/authAxios';
import EditIcon from '@mui/icons-material/Edit';
import { Badge, Box, TextField, Typography } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import date from 'date-and-time';
import {toast} from 'react-toastify';

const ToDoItem = ({ value, cb }) => {
    const [checked, setChecked] = useState(value.status);
    const [edit, setEdit] = useState(false);
    const [itemContent, setItemContent] = useState(value.title)
    const labelId = `checkbox-list-label-${value._id}`;
    const currentDate = new Date();
    const itemDate =new Date(value.createdAt);
    const isSameDay = date.isSameDay(currentDate,itemDate) ? 'Today' : ''

    const handleDelete = async (value) => {
        try {
            const result = await authAxios.delete(`/todo/${value._id}`);
            if (result) {
                toast.warning(result.data.message)
                cb();
            }

        } catch (error) {
            toast.error('Error logged to the console');
            console.log(error);
        }
    }
    const toggleEdit =async ()=>{
        if(edit){
           await handleUpdate();
        }
        setEdit((prev)=> !prev);
    }

    const handleToggle = async (value) => {
        
        try {
            setChecked((prev) => !prev);
            const result = await authAxios.put(`todo/status/${value._id}`, { status: !value.status })
            if (result) {
                toast.success('Updated!');
            }
        } catch (error) {
            toast.error('Error logged to the console');
            console.log(error);
        }
    };

    const handleUpdate = async()=>{
        try {
            const result = await authAxios.put(`/todo/${value._id}`,{title:itemContent})
            if(result){
                cb();
                toast.success(result.data.message)
            }
        } catch (error) {
            toast.error('Error logged to the console');
            console.log(error);
        }
    }

    return (
        <Badge badgeContent={isSameDay ? 'Today' : null} color="success">
        <ListItem
            key={value._id}
            secondaryAction={
                <>
                    <IconButton onClick={toggleEdit}>
                        {
                            edit ? <DoneIcon/> :<EditIcon />
                        }
                        
                    </IconButton>
                    <IconButton edge="end"  onClick={() => handleDelete(value)}>
                        <DeleteIcon />
                    </IconButton>
                </>
            }
        
        >
            <ListItemButton role={undefined} onClick={() => handleToggle(value)} sx={{maxWidth:'5%'}} dense>
                <ListItemIcon  >
                    <Checkbox
                        edge="start"
                        checked={checked}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                    />
                </ListItemIcon>
            </ListItemButton>
            {
                edit ? (
                    <TextField onChange={(e) => setItemContent(e.target.value)} value={itemContent} fullWidth></TextField>
                ) : (
                    <Box>
                    <ListItemText id={labelId} primary={value.title}/>
                    <Typography variant='caption'  mt={0}>{itemDate.toUTCString()}</Typography>
                    </Box>
                    )
            }
        </ListItem>
        </Badge>
    )
}

export default ToDoItem