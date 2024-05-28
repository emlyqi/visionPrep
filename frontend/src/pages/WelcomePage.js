/** 
VisionPrep
ICS4U-03
Emily Qi and Jamie Xiao
This file serves to display the welcome page and its components.
History:
May 28, 2024: Last changes made
*/

/** IMPORT LIBRARIES */
import React from 'react';
import Navbar from '../components/Navbar';
import welcomePic from '../assets/coverpic.png';
import { Box, Grid } from '@mui/material';

/** WELCOME PAGE FUNCTION */
function WelcomePage() {
  /** 
  presents a welcome page
  Returns:
      (component) : welcome page
  */
  
  // displays the welcome page
  return (
    <Grid container flexGrow xs={12} minHeight='100vh' bgcolor='#34363D' justifyContent="center" alignItems="center">
      <Navbar></Navbar>
      <Grid 
        item 
        container 
        alignContent='center' 
        alignItems='flex-start'
        justifyContent='space-evenly'

        style={{top: '0', bottom: '0', left: '0', right: '0', position: 'absolute', width: 'auto', height: 'auto', marginTop: '15rem', marginBottom: '2rem', marginRight: '2rem', marginLeft: '2rem'}}
      >
        {/* text */}
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
      </Grid>
    </Grid>
  )
}

export default WelcomePage
