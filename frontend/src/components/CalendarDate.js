/** 
VisionPrep
ICS4U-03
Emily Qi and Jamie Xiao
This file serves as the calendar component seen in the customization page which prompts the user to choose the start and end dates.
History:
May 28, 2024: Last changes made
*/

import React, { useContext } from "react";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import UploadContext from "../contexts/UploadContext";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function CalendarDate ({ startEnd }) {

    const { startDateValue, endDateValue } = useContext(UploadContext);
    const [, setStartDate ] = startDateValue;
    const [, setEndDate ] = endDateValue;

    const [ date, setDate ] = React.useState(dayjs());

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