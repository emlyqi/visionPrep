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

        style={{top: '0', bottom: '0', left: '0', right: '0', position: 'absolute', width: 'auto', height: 'auto', marginTop: '15rem', marginBottom: '2rem', marginRight: '2rem', marginLeft: '2rem'}}
      >
        <Box
        width='40%'
        height="100%"
        display='flex'
        justifyContent='flex-start'
        alignItems='flex-start'
        flexDirection='column'
        >
          <p style={{color: "#D5EBFF", fontSize: "3rem", marginTop: "3rem", fontWeight: "bold"}}>Welcome to the best scheduling tool you'll ever use. </p>
          <p style={{color: "#FFFFFF", marginTop: "0rem"}}>Created by Emily Qi and Jamie Xiao 2023–24</p>
        </Box>
        <Box
        width='40%'
        height="100%"
        display='flex'
        justifyContent='flex-end'
        alignItems='flex-start'
        >
          <img 
            src={welcomePic} 
            alt="emily and jamie make a deal (baby version)" 
            width="auto"
            height="74%"
            margin="auto"
            
          />
        </Box>

    {/* </div> */}
      </Grid>
    </Grid>
  )
}

export default WelcomePage
