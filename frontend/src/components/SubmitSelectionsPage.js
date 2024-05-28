/** 
VisionPrep
ICS4U-03
Emily Qi and Jamie Xiao
This file serves to display  the submit button (in the future, the customizations chosen by the user will be displayed here and a return button ).
History:
May 28, 2024: Last changes made
*/

/** IMPORT LIBRARIES */
import * as React from 'react';
import { Stack, Grid, Item } from '@mui/material';
import { Button } from '@mui/material';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { Link } from 'react-router-dom';

/** SUBMIT FUNCTION */
export default function SubmitSelectionsPage() {
  /** 
  serves as the submit selections component which acts as a submission page
  Returns:
    (component) : submit selections component
  */
    
  // display the background
  return(
    <Grid container flexGrow xs={12} minHeight='100vh' bgcolor='#34363D' justifyContent="center" alignItems="center">
      <Grid 
        item 
        container
        borderRadius='0.9375rem' 
        alignContent='center' 
        alignItems='flex-start'
        backgroundColor='#26272B'
        justifyContent='space-evenly'

        style={{top: '0', bottom: '0', left: '0', right: '0', position: 'absolute', width: 'auto', height: 'auto', marginTop: '4rem', marginBottom: '4rem', marginRight: '4rem', marginLeft: '4rem'}}
      >
        {/* <Grid 
        container
          item 
          xs={12} 
          justifyContent='center' 
          alignContent='center' 
          alignItems='center'
        >
          
          <Button 
              variant = "contained" 
              sx={{
                  fontFamily: 'sans-serif',
                  color: '#010101',
                  fontSize: '1.875rem',
                  borderRadius: '100px',
                  paddingX: '4.1rem',
                  paddingY: '0.8rem',
                  backgroundColor: '#57DB64',
                  textTransform: 'none',
                  svg: {width: "5rem", height: "5rem", marginRight: "-2rem"}
            }}
          >
            Submit
          </Button>
        </Grid>
        <Grid
          container
          item 
          xs={12}
          justifyContent='center' 
          alignContent='center' 
          alignItems='center'
        >
          <Button 
              component={Link} to="/upload"
              variant = "contained" 
              startIcon = {<ArrowLeftIcon/>}
              sx={{
                  fontFamily: 'sans-serif',
                  color: '#010101',
                  fontSize: '1.875rem',
                  borderRadius: '100px',
                  paddingX: '3.3125rem',
                  paddingY: '0.01rem',
                  backgroundColor: '#5790FF',
                  textTransform: 'none',
                  svg: {width: "5rem", height: "5rem", marginLeft: "-2rem"}
            }}
          >
            Back
          </Button>
        </Grid> */}
      </Grid>
    </Grid>
    
  );
};