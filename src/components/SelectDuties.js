import * as React from 'react';
import { Stack, Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { SingleInputTimeRangeField } from '@mui/x-date-pickers/SingleInputTimeRangeField';

function SelectDuties () {
  const [value, onChange] = useState(["00:00:00","00:00:00"]);
  return(
    <div>
      <TimeRangePicker onChange={onChange} value={value} />

    <Box
      width='100%'
      height='100%'
      display='flex'
      justifyContent='space-evenly'
      alignItems='flex-start'
    >
      <Box 
        width='40%'
        justifyContent='flex-start'
        alignItems='flex-start'
        flexDirection='column'
        marginTop='4.25rem'
      >
        <p
          style={{
            letterSpacing: '0.0625rem',
            fontFamily: 'sans-serif',
            verticalAlign: 'center',
            fontSize: '1.875rem',
            color: '#5790FF',
            display: 'inline-block',
            whiteSpace: 'nowrap',
            fontWeight: 'bold'             
          }}>Duty</p>
        <TextField
          label='Duty #'
          sx={{
            display: 'grid',
            color: '#5790FF'
          }}
        />
      </Box>
      <Box
        width='40%'
        justifyContent='flex-start'
        alignItems='flex-start'
        flexDirection='column'
        marginTop='4.25rem'
      >
        <p
          style={{
            letterSpacing: '0.0625rem',
            fontFamily: 'sans-serif',
            verticalAlign: 'center',
            fontSize: '1.875rem',
            color: '#5790FF',
            display: 'inline-block',
            whiteSpace: 'nowrap',
            fontWeight: 'bold'         
          }}>Time</p>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <SingleInputTimeRangeField label="From - To"/>
        </LocalizationProvider>
      </Box>
    </Box>
    </div>
      
  );
}

export default SelectDuties;