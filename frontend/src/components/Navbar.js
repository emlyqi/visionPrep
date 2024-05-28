/** 
VisionPrep
ICS4U-03
Emily Qi and Jamie Xiao
This file serves as the navigation bar component to navigate through the pages.
History:
May 28, 2024: Last changes made
*/

/** IMPORT LIBRARIES */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import blueLogo from '../assets/visionprep logo blue.png';
import whiteLogo from '../assets/visionprep logo white.png';

/** NAVIGATION BAR FUNCTION */
function Navbar() {
  /** 
  serves as the navigation bar component which prompts helps the user navigate through the pages
  Returns:
    (component) : navigation bar component
  */

  // light mode-dark mode toggle which uses elements from [8] https://replit.com/@EMILYQI1/Night-Mode-Colour-Changing#script.js and [9] https://mui.com/material-ui/react-switch/
  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: '6.1875rem',
    height: '4rem',
    padding: 13,
    '& .MuiSwitch-switchBase': {
      marginTop: 4,
      marginLeft: 20,
      padding: 0,
      transform: 'translateX(-19px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(23px)',
        '& .MuiSwitch-thumb:before': {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="2.2rem" width="2.2rem" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            '#fff',
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#3A4056' : '#3A4056',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: theme.palette.mode === 'dark' ? '#5790FF' : '#5790FF',
      width: '3.5rem',
      height: '3.5rem',
      '&::before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="2.2rem" width="2.2rem" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: theme.palette.mode === 'dark' ? '#3A4056' : '#3A4056',
      borderRadius: '1.875rem',
    },
  }));

  // change logo on hover
  const [over, setOver] = useState(false);

  // display the navigation bar
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar style={{ background: '#26272B', height: '8.8125rem' }} component="nav">
        <Toolbar>
          <div
            // to change logo on hover
            onMouseOver={() => setOver(true)}
            onMouseOut={() => setOver(false)}
          >
            {/* logo/home button */}
            <a href="/">
              <img
                src={over ? whiteLogo : blueLogo} 
                alt="'visionPrep Logo" 
                style={{
                  width:'auto',
                  height:'3rem',
                }}
              />
            </a>
          </div>

          {/* organize the spacing on the navigation bar */}
          <Typography
            variant="h6"
            component="div"
            color="#5790FF"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
          </Typography>

          {/* about nav */}
          <List>
              <ListItem>
                  <ListItemButton component={Link} to="/about" style={{width: '8rem', height: '4.3125rem' }} 
                      sx={{
                          color: '#D5EBFF',                               
                          transition: '.4s',
                          ":hover": {
                              cursor: "pointer",
                              color: '#5790FF'
                              },
                          textAlign: 'center', 
                          fontFamily: 'Roboto'
                          }}>
                      <ListItemText primaryTypographyProps={{fontSize: '2rem'}} primary="About" />
                  </ListItemButton>
              </ListItem>
          </List>

          {/* start nav */}
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <List>
                  <ListItem disablePadding>
                      <ListItemButton component={Link} to="/upload" style={{borderRadius: '2.375rem', margin:'1.94rem', width: '12.875rem', height: '4.3125rem' }} 
                          sx={{
                              backgroundColor: '#5790FF',                                
                              transition: '.4s',
                              ":hover": {
                                  backgroundColor: '#D5EBFF',
                                  cursor: "pointer",
                                  color: '#5790FF',

                                  },
                              textAlign: 'center', 
                              color: '#010101',
                              fontFamily: 'Roboto'
                            }}>
                          <ListItemText primaryTypographyProps={{fontSize: '2rem'}} primary="Start!" />
                      </ListItemButton>
                  </ListItem>
              </List>
          </Box>
          
              <FormControlLabel
                  control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked />}
              />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar
