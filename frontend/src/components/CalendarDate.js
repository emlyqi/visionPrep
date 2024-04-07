import React, { useState, useContext, useReducer } from "react";
import dayjs from 'dayjs';
import {DemoContainer} from '@mui/x-date-pickers/internals/demo';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import { PopperProps } from '@mui/material';
import UploadContext from "../contexts/UploadContext";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function CalendarDate ({startEnd}) {

    const { startDateValue, endDateValue } = useContext(UploadContext);
    const [, setStartDate] = startDateValue;
    const [, setEndDate] = endDateValue;

    const [date, setDate] = React.useState(dayjs('2024-04-17'));

    const changeDate = (newDate) => {
        setDate(newDate);
        let date = dayjs(newDate.$d).format('YYYY-MM-DD');
        console.log (date)
        if (startEnd === "start" ) {
            setStartDate(date);
            console.log(startDateValue)
        }
        
        else if (startEnd === "end" ) {
            setEndDate(date);
            console.log(endDateValue)
        }
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
                <DatePicker
                    // view={['year', 'month', 'day']}
                    // label={'"year", "month" and "day"'}
                    value={date}
                    onChange = {changeDate}
                    sx={{
                        '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {border: '2px solid #5790FF', borderRadius: '17px'},
                        '& .MuiOutlinedInput-notchedOutline': {border: '2px solid #5790FF'},
                        '&:hover .MuiOutlinedInput-notchedOutline': {border: '2px solid #5790FF'},
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {border: '2px solid #5790FF'},
                        "&:hover > fieldset": { borderColor: "#5790FF" },
                        input: {borderColor: "#5790FF", color: "#5790FF", fontSize: "1.875rem", marginLeft: "1rem", width: "24.9rem"},
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