/** 
VisionPrep
ICS4U-03
Emily Qi and Jamie Xiao
This file serves as the calendar component seen in the customization page which prompts the user to choose the start and end dates.
History:
May 28, 2024: Last changes made
*/

/** IMPORT LIBRARIES */
import React, { useContext } from "react";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import UploadContext from "../contexts/UploadContext";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

/** CALENDAR FUNCTION */
// this function uses elements from [12] https://mui.com/x/react-date-pickers/date-calendar/ to add a date calendar and [15] https://mui.com/material-ui/react-text-field/ to stylize the text field
function CalendarDate ({ startEnd }) {
    /** 
    serves as the calendar component which prompts the user to choose the start and end dates
    Args:
        startEnd (String) : show if it is the start date or end date the user is changing
    Returns:
        (component) : choose date component
    */

    // VARIABLES
    const { startDateValue, endDateValue } = useContext(UploadContext);
    const [, setStartDate ] = startDateValue;
    const [, setEndDate ] = endDateValue;
    const [ date, setDate ] = React.useState(dayjs());

    // when the user chooses a new date
    const changeDate = (newDate) => {
        setDate(newDate);
        let date = dayjs(newDate.$d).format('YYYY-MM-DD');

        // change the start date
        if (startEnd === "start" ) {
            setStartDate(date);
        }
        
        // change the end date
        else if (startEnd === "end" ) {
            setEndDate(date);
        }
    }

    return ( // displays the calendar component
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