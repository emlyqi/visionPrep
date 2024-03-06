import { useState } from "react";
import Calendar from 'react-calendar';
import { Box } from "@mui/material";

export default function ViewCalendar() {
    const [date, setDate] = useState(new date());

    return (
        <Box>
            <Box>
                <Calendar onChange={setDate} value={date} />
            </Box>
            <p>
                <span>Selected Date:</span> {' '}
                {date.toDateString()}
            </p>
        </Box>
    )
}