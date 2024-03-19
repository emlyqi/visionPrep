// import { useState, useContext } from "react";
// import Calendar from 'react-calendar';
// import { Box } from "@mui/material";
// import UploadContext from "../contexts/UploadContext";

// export default function ViewCalendar() {

//     const { daysOfRotationValue, startDayValue, startDateValue, endDateValue } =
//     useContext(UploadContext);
//     const [, setDaysOfRotation] = daysOfRotationValue;
//     const [, setStartDay] = startDayValue;
//     const [, setStartDate] = startDateValue;
//     const [, setEndDate] = endDateValue;

//     const [date, setDate] = useState(new Date());

//     return (
//         <Box>
//             <Box>
//                 <Calendar onChange={setDate} value={date} />
//             </Box>
//             <p>
//                 <span>Selected Date:</span> {' '}
//                 {date.toDateString()}
//             </p>
//         </Box>
//     )
// }