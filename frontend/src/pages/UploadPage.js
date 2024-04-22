import React, { useState } from "react";
import dayjs from 'dayjs';
import { Grid } from "@mui/material"; 
import UploadCSV from "../components/Upload"
import SelectDays from "../components/SelectDays";
import { Button } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useNavigate } from "react-router-dom";
import UploadContext from "../contexts/UploadContext";
import SubmitSelectionsPage from "../components/SubmitSelectionsPage";
import ViewCalendar from "../components/ViewCalendar";

function UploadPage() {

    const [date, setDate] = React.useState(dayjs());
    const today = dayjs(date.$d).format('YYYY-MM-DD');

    const [daysOfRotation, setDaysOfRotation] = useState(2);
    const [startDay, setStartDay] = useState(1);
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(today);
    // const [calendarMonth, setcalendarMonth] = useState(1);
    const [staffArray, setStaffArray] = useState([{Staff: "C. Edwards", Load: "1", ShiftsLeft: "40", Day1: "x", Day2: "x", Day3: "", Day4: "x", Gym: ""}]);
    const [cellValue, setCellValue] = useState("Choose A Day");
    const [dayType, setDayType] = useState("School");
    const [cellIndex, setCellIndex] = useState(-1);
    const [cellChangeDay, setCellChangeDay] = useState([{Index: -1, DaySchoolType: "School"}]);
    
    const [active, setActive] = useState("uploadCSVPage");
    const [rightPos, setRightPos] = useState("7.3125rem");
    const [bottomPos, setBottomPos] = useState("7rem");
    const [word, setWord] = useState("Next");
    const [colour, setColour] = useState("#5790FF");
    const [calendarTrue, setCalendarTrue] = useState(false);
    // const [displaying, setDisplaying] = useState("block");

    let navigate = useNavigate();

    const buttonClick = () => {
        if (active === "uploadCSVPage") {
            setActive("selectDayPage");
        } else if (active === "selectDayPage") {
            setActive("submitPage");
            setRightPos("41%");
            setBottomPos("45%");
            setWord("Submit");
            setColour("#57DB64");
        } else if (active === "submitPage") {
        setActive("calendarPage");
        setRightPos("36.625rem");
        setBottomPos("23.375rem");
        setWord("");
        setColour("#57DB64");
        setCalendarTrue(true);
        } 
    }

    return (  
        <UploadContext.Provider
            value={{
                daysOfRotationValue: [daysOfRotation, setDaysOfRotation],
                startDayValue: [startDay, setStartDay],
                startDateValue: [startDate, setStartDate],
                endDateValue: [endDate, setEndDate],
                staffArrayValue: [staffArray, setStaffArray],
                cellValueValue: [cellValue, setCellValue],
                dayTypeValue: [dayType, setDayType],
                cellIndexValue: [cellIndex, setCellIndex],
                cellChangeDayValue: [cellChangeDay, setCellChangeDay]
            }}
        >

            <Grid container flexGrow xs={12} minHeight='100vh' bgcolor='#34363D' justifyContent="center" alignItems="center">
                {/* <Grid 
                    item 
                    container
                    borderRadius='0.9375rem' 
                    justifyContent='center' 
                    alignContent='center' 
                    backgroundColor='#26272B'

                    style={{top: '0', bottom: '0', left: '0', right: '0', position: 'absolute', width: 'auto', height: 'auto', marginTop: '4.5rem', marginBottom: '4.5rem', marginRight: '4.5rem', marginLeft: '4.5rem'}}
                > */}

                    <Grid container style={{top: '0', bottom: '0', left: '0', right: '0', position: 'absolute', width: 'auto', height: 'auto', marginTop: '0rem', marginBottom: '0rem', marginRight: '0rem', marginLeft: '0rem'}}>
                        {active === "uploadCSVPage" && <React.StrictMode><UploadCSV /></React.StrictMode>}
                        {active === "selectDayPage" && <SelectDays/>}
                        {active === "submitPage" && <SubmitSelectionsPage/>}
                        {active === "calendarPage" && <ViewCalendar/>}
                        {/* {active === "viewCalendarPage"} */}
                    </Grid>
                    <Button 
                        variant = "contained" 
                        endIcon = {<ArrowRightIcon/>}
                        onClick = {buttonClick}
                        sx={{
                            position: 'absolute',
                            right: rightPos,
                            bottom: bottomPos,
                            fontFamily: 'sans-serif',
                            color: '#010101',
                            fontSize: '1.875rem',
                            borderRadius: '100px',
                            paddingX: '3.3125rem',
                            paddingY: '0.01rem',
                            backgroundColor: colour,
                            textTransform: 'none',
                            svg: {width: "5rem", height: "5rem", marginRight: "-2rem"},
                            display: calendarTrue? 'none':null
                    }}>
                        {word}
                    </Button>
                    
                {/* </Grid> */}
                {/* <TestComponent /> */}
            </Grid>
        </UploadContext.Provider>
    );
}

export default UploadPage;