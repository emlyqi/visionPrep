import * as React from 'react';
import dayjs from 'dayjs';
import {DemoContainer} from '@mui/x-date-pickers/internals/demo';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import { Stack } from '@mui/material';
import TextField from '@mui/material';
import { TextFieldProps } from '@mui/material';
import { SxProps } from '@mui/material';
import { PopperProps } from '@mui/material';

function CalendarDate () {
    const [date, setdate] = React.useState(dayjs('2024-07-01'));

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
                <DatePicker
                    date={date}
                    onChange = {(newDate) => setdate(newDate)}
                    sx={{
                        '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {border: '2px solid #5790FF', borderRadius: '17px'},
                        '& .MuiOutlinedInput-notchedOutline': {border: '2px solid #5790FF'},
                        '&:hover .MuiOutlinedInput-notchedOutline': {border: '2px solid #5790FF'},
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {border: '2px solid #5790FF'},
                        "&:hover > fieldset": { borderColor: "#5790FF" },
                        input: {color: "#5790FF", fontSize: "1.875rem", marginLeft: "1rem", width: "24.9rem"},
                        svg: {color: "#5790FF", width: "3.125rem", height: "3.125rem", marginRight: "0.3rem"}
                    }}
                    PopperProps = {{
                        "& .MuiPaper-root": {
                            backgroundColor: "#212121"
                        }
                    }}
                />
            </DemoContainer>
        </LocalizationProvider>
    );
}

export default CalendarDate;