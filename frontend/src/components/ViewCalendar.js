import React, { useState, useContext } from "react";
import Calendar from 'react-calendar';
import { Box, Grid, Button, IconButton } from "@mui/material";
import UploadContext from "../contexts/UploadContext";
import { AgGridReact } from 'ag-grid-react';
import { createRoot } from "react-dom/client";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "../App.css"
import RefreshIcon from '@mui/icons-material/Refresh';

export default function ViewCalendar() {

    const { daysOfRotationValue, startDayValue, startDateValue, endDateValue, calendarMonthValue } = useContext(UploadContext);
    const [, setDaysOfRotation] = daysOfRotationValue;
    const [, setStartDay] = startDayValue;
    const [, setStartDate] = startDateValue;
    const [, setEndDate] = endDateValue;
    const [, setcalendarMonth] = calendarMonthValue;
    const duties = ["Cafeteria 1", "Cafeteria 2", "Gym/Weight Room", "Bleachers", "Library", "Foyer", "Rover 1", "Rover 2", "Guidance"];
    const [selectedDay, setSelectedDay] = useState("Choose A Day")

    const [rowData, setRowData] = useState([]);

    const loadCal = () => {

        var datesArray = [];
        const commenceDate = new Date(startDateValue[0]);
        commenceDate.setDate(commenceDate.getDate()+1);
        // console.log(startDateValue[0]);
        const endingDate = new Date (endDateValue[0]);
        endingDate.setDate(endingDate.getDate()+1);
        const dayWeekNum = commenceDate.getDay();
        const endDayWeekNum = endingDate.getDay();

        // console.log("date: " + commenceDate + " weday:" + dayWeekNum)

        if (dayWeekNum < 1) {
            commenceDate.setDate(commenceDate.getDate()+1);
        }
        else if (dayWeekNum > 1 && dayWeekNum !== 6) {
            var differenceDate = dayWeekNum - 1;
            commenceDate.setDate(commenceDate.getDate()-differenceDate);
        }
        else if (dayWeekNum === 6) {
            commenceDate.setDate(commenceDate.getDate()+2);
        }

        // console.log("date: " + commenceDate)

        // console.log(endingDate)
        // console.log(endDayWeekNum)
        if (endDayWeekNum < 1) {
            endingDate.setDate(endingDate.getDate()-2);
        }
        else if (endDayWeekNum > 1) {
            var differenceDates = 5 - endDayWeekNum;
            endingDate.setDate(endingDate.getDate()+differenceDates);
        }

        // console.log (endingDate)
    
        datesArray.push((commenceDate.getMonth() + 1).toString() + "/" + (commenceDate.getDate()).toString() + " | Day");
        
        // console.log(datesArray);
    
        while (commenceDate < endingDate) {
            commenceDate.setDate(commenceDate.getDate()+1);
            if (commenceDate.getDay()<=5 && commenceDate.getDay()>=1){
                datesArray.push((commenceDate.getMonth() + 1).toString() + "/" + (commenceDate.getDate()).toString() + " | Day");
            }
        }
        // console.log(datesArray)
        // console.log(datesArray);
        const newData = [];
        const duties = ["Cafeteria 1", "Cafeteria 2", "Gym/Weight Room", "Bleachers", "Library", "Foyer", "Rover 1", "Rover 2", "Guidance"];
        const startTimes = ["10:52", "10:58", "10:55", "10:52", "10:58", "10:58", "10:52", "10:58", "10:58", "10:58"];
        const endTimes = ["11:29", "11:35", "11:32", "11:29", "11:35", "11:35", "11:29", "11:35", "11:35", "11:35"];
        var currDate = 0;
        while (currDate < datesArray.length) {
            newData.push({duty: "Duty", time: "Time", monday: datesArray[currDate], tuesday: datesArray[currDate+1], wednesday: datesArray[currDate+2], thursday: datesArray[currDate+3], friday: datesArray[currDate+4]});
            currDate += 5;
            for (var i=0; i<duties.length; i++){
                newData.push({duty: duties[i], time: startTimes[i] + "–" + endTimes[i], monday: "Edwards", tuesday: "Edwards", wednesday: "Edwards", thursday: "Edwards", friday: "Edwards"});
            }

            setRowData([...newData]);
        }
    }
    
    const [colDefs, setColDefs] = useState([
        {field: 'duty', headerName: '', pinned: 'left', width: 90,
            cellStyle: params => {
                if (params.node.rowIndex % (duties.length + 1) === 0) {
                    return {color: '#ffffff', backgroundColor: '#455A85'};
                }
                else {
                    return {color: '#ffffff', backgroundColor: '#6D98EB'}; 
                }
            }
        },
        {field: 'time', headerName: '', pinned: 'left', width: 90,
            cellStyle: params => {
                if (params.node.rowIndex % (duties.length + 1) === 0) {
                    return {color: '#ffffff', backgroundColor: '#455A85'};
                }
                else {
                    return {color: '#ffffff', backgroundColor: '#6D98EB'}; 
                }
            }
        },
        {field: 'monday', width: 120},
        {field: 'tuesday', width: 120},
        {field: 'wednesday', width: 120},
        {field: 'thursday', width: 120},
        {field: 'friday', width: 120}
    
    ]);

    const rowClass = 'ag-theme-quartz';
    const getRowStyle = params => {
        if (params.node.rowIndex % (duties.length + 1) === 0) {
            // return { background: '#455A85' };
            return 'ag-subtitle';
        }
    }

    return (
        <Box
          width='100%'
          height="100%"
          display='flex'
          justifyContent='center'
          flexDirection= 'column'
        >
            
            <Box
              bgcolor='#26272B'
              borderRadius='100rem'
              width='96.88%'
              height='3rem'
              verticalAlign='center'
              marginTop='1.4%'
              marginLeft='1.4%'
              display='flex'
              justifyContent='left'
              alignContent='left'
            //   paddingTop='0rem'

            >
                <IconButton 
                    aria-label="load calendar"
                    style={{color:"#5790FF"}}
                    onClick = {loadCal}
            >
                <RefreshIcon />
            </IconButton>

            </Box>
            
            <Box
                width='97.2%'
                height='100%'
                verticalAlign='center'
                marginTop='1.3%'
                marginBottom='1.3%'
                display='flex'
                marginLeft='1.4%'
                marginRight='1.4%'
                justifyContent='space-between'
            //   alignContent='left'
                flexDirection='row'
                paddingTop='0rem'

            >
                <div
                    style={{height: "100%", width: "48.8rem", margin: 0, backgroundColor: "#ffffff", textAlign: "center"}}
                    // position="absolute"
                >
                    <AgGridReact
                        rowHeight={18}
                        rowData={rowData}
                        columnDefs={colDefs}
                        rowClass={rowClass}
                        getRowClass={getRowStyle}
                    />
                </div>
                <Box
                    width='31.736%'
                    backgroundColor='#26272B'
                    borderRadius='1rem'
                >
                    <p style={{color: "#C1D6FF", fontSize: "2rem", marginLeft: "2.5rem", marginTop:"4.3rem", marginBottom: "0rem", paddingBottom: "0rem"}}>{selectedDay}</p>
                    <p style={{fontSize: "2rem", marginLeft: "1.2rem", marginTop: "-1rem", paddingTop: "0rem", color: "#80828A"}}>________________________ </p>

                </Box>
            </Box>
        
        </Box>
    )
}