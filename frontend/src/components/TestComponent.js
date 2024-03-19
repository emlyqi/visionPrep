import { useState, useContext } from "react";
import Calendar from 'react-calendar';
import { Box } from "@mui/material";
import UploadContext from "../contexts/UploadContext";

export default function ViewCalendar() {

    const { daysOfRotationValue, startDayValue, startDateValue, endDateValue, staffArray } =
    useContext(UploadContext);
    const [, setDaysOfRotation] = daysOfRotationValue;
    const [, setStartDay] = startDayValue;
    const [, setStartDate] = startDateValue;
    const [, setEndDate] = endDateValue;
    const [, setStaff] = staffArray;
    const duties = ["Cafeteria 1", "Cafeteria 2", "Gym/Weight Room", "Bleachers", "Library", "Foyer", "Rover 1", "Rover 2", "Guidance"];
    const startTimes = ["10:52", "10:58", "10:55", "10:52", "10:58", "10:58", "10:52", "10:58", "10:58", "10:58"];
    const endTimes = ["11:29", "11:35", "11:32", "11:29", "11:35", "11:35", "11:29", "11:35", "11:35", "11:35"];
    
    const [date, setDate] = useState(new Date());

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