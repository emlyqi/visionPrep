import React, { useContext, useState } from 'react';
import { Stack, Box, Grid, FormControl, MenuItem } from '@mui/material';
import DoRButts from "./DoRButts";
import Select from '@mui/material/Select';
import CalendarDate from './CalendarDate';
import UploadContext from '../contexts/UploadContext';

function SelectDays () {
  const {startDayValue} = useContext(UploadContext);
  const [, setStartDay] = startDayValue;
  const [startDayz, setStartDayz] = useState('');

  const handleChange = (event) => {
    setStartDayz(event.target.value);
    setStartDay(startDayz);
  }

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
              <Stack direction='horizontal'>
                <p
                  style={{
                    letterSpacing: '0.0625rem',
                    fontFamily: 'sans-serif',
                    verticalAlign: 'center',
                    fontSize: '1.2rem',
                    color: '#010101',
                    display: 'inline-block',
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
            <p 
            style={{
              fontFamily: 'sans-serif',
              color: '#5790FF',
              fontSize: '1.875rem',
              marginBottom: '0rem'
            }}
            >Start Date</p>
            <CalendarDate/>
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
              <Stack direction='horizontal'>
                <p
                  style={{
                    letterSpacing: '0.0625rem',
                    fontFamily: 'sans-serif',
                    verticalAlign: 'center',
                    fontSize: '1.2rem',
                    color: '#010101',
                    display: 'inline',
                    justifyContent: 'left',
                    paddingLeft: '2.5625rem',
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
                  <FormControl sx={{m:1, minWidth: "9.375rem", Height: "3.83rem"}}>
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
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={4}>4</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Stack>
            </Box>
            <p 
            style={{
              fontFamily: 'sans-serif',
              color: '#5790FF',
              fontSize: '1.875rem',
              marginBottom: '0rem'
            }}
            >End Date</p>
            <CalendarDate/>
          </Box>
        </Grid>
      </Box>
    );
}

export default SelectDays;