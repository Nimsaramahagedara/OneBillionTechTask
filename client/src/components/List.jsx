import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ToDoItem from './ListItem';


export default function CheckboxList({ data, handleRefreshCb }) {

    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {data ? (data.map((value) => {
                // const labelId = value._id;

                return (
                   <ToDoItem value={value} key={value._id} cb={handleRefreshCb} />
                );
            })) : (
                <>
                
                </>
            )
            }
        </List>
    );
}
