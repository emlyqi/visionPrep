/** 
VisionPrep
ICS4U-03
Emily Qi and Jamie Xiao
This file serves to display the customization page.
History:
May 28, 2024: Last changes made
*/

/** IMPORT LIBRARIES */
import React, { useContext, useState } from 'react';
import { Stack, Box, Grid, FormControl, MenuItem } from '@mui/material';
import DoRButts from "./DoRButts";
import Select from '@mui/material/Select';
import CalendarDate from './CalendarDate';
import UploadContext from '../contexts/UploadContext';

/** CUSTOMIZATION FUNCTION */
function SelectDays () {
  /** 
  serves as the customization component which prompts the user to customize the characteristics of the calendar
  Returns:
    (component) : selectDays component
  */

  // VARIABLES
  const {startDayValue} = useContext(UploadContext);
  const [, setStartDay] = startDayValue;
  const [startDayz, setStartDayz] = useState(1);

  // when a number is chosen, change the variables
  const handleChange = (event) => {
    setStartDayz(event.target.value); //the value is an integer between 1-4 @ startDayValue[0]
    setStartDay(event.target.value); //the value is an integer between 1-4 @ startDayValue[0]
  }

  // display the customization page
  return(
    <Box
      width='100%'
      height="100%"
      display='flex'
      alignItems='flex-start'
    >
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
        <Box
        width='31.875rem'
        height="100%"
        display='flex'
        justifyContent='flex-start'
        alignItems='flex-start'
        flexDirection='column'
        >
          <Box
            bgcolor='#5790FF'
            borderRadius='100rem'
            width='100%'
            height='5.625rem'
            verticalAlign='center'
            marginTop='4.25rem'
            display='flex'
            justifyContent='left'
            alignContent='left'
          >

            {/* days of rotation component */}
            <Stack direction='horizontal'>
              <p
                style={{
                  letterSpacing: '0.0625rem',
                  fontFamily: 'sans-serif',
                  verticalAlign: 'center',
                  fontSize: '1.5rem',
                  color: '#010101',
                  display: 'inline-block',
                  paddingTop: '.5rem',
                  paddingLeft: '2.5625rem',
                  whiteSpace: 'nowrap'
                }}
              >
                Days of Rotation
              </p>
              <Box
                width='100%'
                display='flex'
                paddingLeft='1.5625rem'
                justifyContent='right'
                alignItems='center'
              >
                  <DoRButts />
              </Box>
            </Stack>
          </Box>
          
          {/* start date component */}
          <p 
          style={{
            fontFamily: 'sans-serif',
            color: '#5790FF',
            fontSize: '1.875rem',
            marginBottom: '0rem'
          }}
          >Start Date</p>
          <CalendarDate startEnd='start'/>
        </Box>

        <Box
          width='31.875rem'
          height="100%"
          display='flex'
          justifyContent='flex-start'
          alignItems='flex-start'
          flexDirection='column'
        >
          <Box
            bgcolor='#5790FF'
            borderRadius='100rem'
            width='100%'
            height='5.625rem'
            verticalAlign='center'
            marginTop='4.25rem'
            display='flex'
            justifyContent='left'
            alignContent='left'
          >

            {/* start day component */}
            <Stack direction='horizontal'>
              <p
                style={{
                  letterSpacing: '0.0625rem',
                  fontFamily: 'sans-serif',
                  verticalAlign: 'center',
                  fontSize: '1.5rem',
                  color: '#010101',
                  display: 'inline',
                  justifyContent: 'left',
                  paddingLeft: '2.5625rem',
                  paddingTop: '.5rem',
                  whiteSpace: 'nowrap'
                }}
              >
                Start Day
              </p>

              <Box
                width='100%'
                display='flex'
                paddingLeft='1.5625rem'
              >
                {/* select starting day of rotation value which uses elements from [13] Material UI, https://mui.com/material-ui/react-select/ */}
                <FormControl sx={{m:1, minWidth: "9.375rem", Height: "3.83rem", paddingLeft: '10.2rem', paddingTop: '0.15rem'}}>
                  <Select
                    value={startDayz}
                    onChange={handleChange}
                    id="selectStartDay"
                    sx={{
                      boxShadow: 'none', backgroundColor: '#C1D6FF', borderRadius: '100px', textAlign: 'center', fontSize: '1.5625rem', fontWeight: 'bold', fontFamily: 'sans-serif',  color: '#3D72D9',
                      svg: {color: "#3D72D9", width: "3rem", height: "3rem", marginTop: "-0.7rem", marginRight: "0.4rem"},
                      '.MuiOutlinedInput-notchedOutline': {border:0}
                    }}
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Stack>
          </Box>

          {/* end date component */}
          <p 
          style={{
            fontFamily: 'sans-serif',
            color: '#5790FF',
            fontSize: '1.875rem',
            marginBottom: '0rem'
          }}
          >End Date</p>
          <CalendarDate startEnd='end'/>
        </Box>
      </Grid>
    </Box>
  );
}

export default SelectDays;