import React, { useState } from 'react'
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import authAxios from '../utils/authAxios';

const ToDoItem = ({ value, cb }) => {
    const [checked, setChecked] = useState(value.status);
    const labelId = `checkbox-list-label-${value._id}`;

    const handleDelete = async (value)=>{
        try {
            const result =await authAxios.delete(`/todo/${value._id}`);
            if(result){
                alert('Item Deleted');
                cb();
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    const handleToggle = async(value) => {
        try {
            setChecked((prev)=> !prev);
            const result = await authAxios.put(`todo/status/${value._id}`,{status: !value.status})
            if(result){
                alert('Updated');
            }
        } catch (error) {
            console.log(error);
        }
        console.log(value);
        
    };

    return (
        <ListItem
            key={value._id}
            secondaryAction={
                <IconButton edge="end" aria-label="comments" onClick={()=>handleDelete(value)}>
                    <DeleteIcon />
                </IconButton>
            }
            disablePadding
        >
            <ListItemButton role={undefined} onClick={()=>handleToggle(value)} dense>
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={checked}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                    />
                </ListItemIcon>
                <ListItemText id={labelId} primary={value.title} />
            </ListItemButton>
        </ListItem>
    )
}

export default ToDoItem