import React from 'react';
import Navbar from '../components/Navbar';
import welcomePic from '../assets/coverpic.png';
import { Stack, Box, Button } from '@mui/material';

function WelcomePage() {
  
  return (
    <div style={{ backgroundColor: '#34363D', height: '100vh'}}>
      <Navbar></Navbar>
      <div>Welcome Page</div>
      <img 
        src={welcomePic} 
        alt="emily and jamie make a deal (baby version)" 
        width="auto"
        height="80%"
        margin="auto"
      />

    </div>
  )
}

export default WelcomePage
