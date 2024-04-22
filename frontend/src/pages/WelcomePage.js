import React from 'react';
import Navbar from '../components/Navbar';
import welcomePic from '../assets/coverpic.png';
import { Stack, Box, Button, Grid } from '@mui/material';

function WelcomePage() {
  
  return (
    <Grid container flexGrow xs={12} minHeight='100vh' bgcolor='#34363D' justifyContent="center" alignItems="center">
    {/* <div style={{ backgroundColor: '#34363D', height: '100vh'}}> */}
      <Navbar></Navbar>
      <Grid 
        item 
        container 
        alignContent='center' 
        alignItems='flex-start'
        justifyContent='space-evenly'

        style={{top: '0', bottom: '0', left: '0', right: '0', position: 'absolute', width: 'auto', height: 'auto', marginTop: '4rem', marginBottom: '4rem', marginRight: '4rem', marginLeft: '4rem'}}
      >
      <div>Welcome Page</div>
      <img 
        src={welcomePic} 
        alt="emily and jamie make a deal (baby version)" 
        width="auto"
        height="80%"
        margin="auto"
      />

    {/* </div> */}
      </Grid>
    </Grid>
  )
}

export default WelcomePage
