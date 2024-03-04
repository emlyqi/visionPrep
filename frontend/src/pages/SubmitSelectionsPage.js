import * as React from 'react';
import { Stack, Grid, Item } from '@mui/material';
import { Button } from '@mui/material';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { Link } from 'react-router-dom';

export default function SubmitSelectionsPage() {
    return(
      <Grid container flexGrow xs={12} minHeight='100vh' bgcolor='#34363D' justifyContent="center" alignItems="center">
        <Grid 
            item 
            container
            borderRadius='0.9375rem' 
            justifyContent='center' 
            alignContent='center' 
            backgroundColor='#26272B'
            rowSpacing='2rem'

            style={{top: '0', bottom: '0', left: '0', right: '0', position: 'absolute', width: 'auto', height: 'auto', marginTop: '4.5rem', marginBottom: '4.5rem', marginRight: '4.5rem', marginLeft: '4.5rem'}}
        >
          <Grid 
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
          </Grid>
        </Grid>
      </Grid>
    
    );
};