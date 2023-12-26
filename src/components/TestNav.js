import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import React from 'react'

function TestNav() {
  return (
    <div>
        <List>
            <ListItem disablePadding>
                <ListItemButton component={Link} to="/">
                    <ListItemText primary="Login" />
                </ListItemButton>
            </ListItem>
        </List>
    </div>
  )
}

export default TestNav

