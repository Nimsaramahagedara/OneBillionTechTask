import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ToDoItem from './ListItem';
import { Box, IconButton, Typography } from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import FilterListIcon from '@mui/icons-material/FilterList';

export default function CheckboxList({ data, handleRefreshCb }) {
    const [itemData, setSortedData] = useState(data);
    const [isSorted, setSorted] = useState(false);

    const handleSort = () => {
        const sortedArray = [...data];

        if (!isSorted) {
            //Sort Accending
            sortedArray.sort((a, b) => {
                if (a.createdAt < b.createdAt) return 1;
                if (a.createdAt > b.createdAt) return -1;
                return 0;
            });

        } else {
            //Sort Decending
            sortedArray.sort((a, b) => {
                if (a.createdAt < b.createdAt) return -1;
                if (a.createdAt > b.createdAt) return 1;
                return 0;
            });
        }
        setSortedData(sortedArray);
        setSorted((prev) => !prev)
    }

    return (
        <>
            <Box className='flex items-center'>
                <Typography variant='subtitle1'>SortBy Date :</Typography>
                <IconButton onClick={handleSort}>
                    {
                        isSorted ? <FilterListIcon /> : <SortIcon />
                    }

                </IconButton>
            </Box>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {itemData.map((value) => {
                    // const labelId = value._id;

                    return (
                        <ToDoItem value={value} key={value._id} cb={handleRefreshCb} />
                    );
                })}
            </List>
        </>

    );
}
