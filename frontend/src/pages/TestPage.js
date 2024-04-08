import React, { useState } from "react";
import { Grid } from "@mui/material"; 
import UploadCSV from "../components/Upload"
import SelectDays from "../components/SelectDays";
import { Button } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useNavigate } from "react-router-dom";
import UploadContext from "../contexts/UploadContext";
import SubmitSelectionsPage from "../components/SubmitSelectionsPage";
import TestComponent from "../components/TestComponent";

function UploadPage() {
    const [daysOfRotation, setDaysOfRotation] = useState("2");
    const [startDay, setStartDay] = useState("1");
    const [startDate, setStartDate] = useState("01/01/2021");
    const [endDate, setEndDate] = useState("12/31/2021");
    const [staffArray, setStaffArray] = useState([{Staff: "C. Edwards", Load: "1", ShiftsLeft: "40", ShiftsAdded: "0", Day1: "x", Day2: "x", Day3: "", Day4: "x", Gym: ""}]);

    const [active, setActive] = useState("uploadCSVPage");
    const [rightPos, setRightPos] = useState("7.3125rem");
    const [bottomPos, setBottomPos] = useState("7rem");
    const [word, setWord] = useState("Next");
    const [colour, setColour] = useState("#5790FF");

    let navigate = useNavigate();

    const buttonClick = () => {
        if (active === "uploadCSVPage") {
            setActive("selectDayPage");
        } else if (active === "selectDayPage") {
            setActive("submitPage");
            setRightPos("36.625rem");
            setBottomPos("23.375rem");
            setWord("Submit");
            setColour("#57DB64");
        } 
        // else if (active === "submitPage") {

        // }
    }

    return (  
        <UploadContext.Provider
            value={{
                daysOfRotationValue: [daysOfRotation, setDaysOfRotation],
                startDayValue: [startDay, setStartDay],
                startDateValue: [startDate, setStartDate],
                endDateValue: [endDate, setEndDate],
                staffArrayValue: [staffArray, setStaffArray]
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
                            svg: {width: "5rem", height: "5rem", marginRight: "-2rem"}
                    }}>
                        {word}
                    </Button>
                    
                {/* </Grid> */}
                <TestComponent />
            </Grid>
        </UploadContext.Provider>
    );
}

export default UploadPage;