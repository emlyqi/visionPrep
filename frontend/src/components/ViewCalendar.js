import React, { useState, useContext, useMemo } from "react";
import Calendar from 'react-calendar';
import { Box, Grid, Button, IconButton } from "@mui/material";
import UploadContext from "../contexts/UploadContext";
import { AgGridReact } from 'ag-grid-react';
import { createRoot } from "react-dom/client";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "../App.css"
import RefreshIcon from '@mui/icons-material/Refresh';
// import { ModuleRegistry } from "@ag-grid-community/core";
// ModuleRegistry.registerModules([ClientSideRowModelModule]);

export default function ViewCalendar() {

    const { daysOfRotationValue, startDayValue, startDateValue, endDateValue, staffArrayValue } = useContext(UploadContext);
    const [, setDaysOfRotation] = daysOfRotationValue;
    const [, setStartDay] = startDayValue;
    const [, setStartDate] = startDateValue;
    const [, setEndDate] = endDateValue;
    const [, setStaffArray] = staffArrayValue;
    console.log(staffArrayValue)
    // const [, setcalendarMonth] = calendarMonthValue;
    
    const duties = ["Cafeteria 1", "Cafeteria 2", "Gym/Weight Room", "Bleachers", "Library", "Foyer", "Rover 1", "Rover 2", "Guidance"];
    const startTimes = ["10:52", "10:58", "10:55", "10:52", "10:58", "10:58", "10:52", "10:58", "10:58", "10:58"];
    const endTimes = ["11:29", "11:35", "11:32", "11:29", "11:35", "11:35", "11:29", "11:35", "11:35", "11:35"];
    const [selectedDay, setSelectedDay] = useState("Choose A Day")
    const [rowData, setRowData] = useState([]);


    var datesArray = [];
    var numDays = 0;
    var diffEndDates = 0;
    var diffStartDates = 0;
    var allStaffMembers = [];
    const commenceDate = new Date(startDateValue[0]);
    commenceDate.setDate(commenceDate.getDate()+1);
    const startingDate = new Date(startDateValue[0]);
    startingDate.setDate(commenceDate.getDate());
    console.log(startingDate);
    const endingDate = new Date (endDateValue[0]);
    endingDate.setDate(endingDate.getDate()+1);
    const endingsDate = new Date (endDateValue[0]);
    endingsDate.setDate(endingsDate.getDate()+1);
    const dayWeekNum = commenceDate.getDay();
    const endDayWeekNum = endingDate.getDay();
    var tempStartingDay = startDayValue[0];
    console.log(tempStartingDay)
    var tempDOR = daysOfRotationValue[0];

    for (var i=0; i<staffArrayValue[0].length; i++) {
        allStaffMembers.push(staffArrayValue[0][i].Staff);
    }

    /* ----------------------GET DATES---------------------- */

    if (dayWeekNum < 1) {
        commenceDate.setDate(commenceDate.getDate()+1);
    }
    else if (dayWeekNum > 1 && dayWeekNum !== 6) {
        diffStartDates = dayWeekNum - 1;
        commenceDate.setDate(commenceDate.getDate()-diffStartDates);
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
    else if (endDayWeekNum === 6) {
        endingDate.setDate(endingDate.getDate()-1);
    }
    else {
        diffEndDates = 6 - endDayWeekNum;
        endingDate.setDate(endingDate.getDate()+diffEndDates);
    }

    // console.log (endingDate)

    // datesArray.push((commenceDate.getMonth() + 1).toString() + "/" + (commenceDate.getDate()).toString() + "/" + (commenceDate.getFullYear()).toString() + " | Day");
    
    // console.log(datesArray);

    // var plus = endingDate.getDate()+1



    while (commenceDate <= endingDate) {
        if (commenceDate.getDay()<=5 && commenceDate.getDay()>=1){
            if (commenceDate<startingDate) {
                console.log("less")
                datesArray.push((commenceDate.getMonth() + 1).toString() + "/" + (commenceDate.getDate()).toString() + "/" + (commenceDate.getFullYear()).toString() + " | N/A");
            }
            else if (commenceDate>endingsDate) {
                datesArray.push((commenceDate.getMonth() + 1).toString() + "/" + (commenceDate.getDate()).toString() + "/" + (commenceDate.getFullYear()).toString() + " | N/A");
            }
            else {
                datesArray.push((commenceDate.getMonth() + 1).toString() + "/" + (commenceDate.getDate()).toString() + "/" + (commenceDate.getFullYear()).toString() + " | Day " + tempStartingDay);
                if (tempStartingDay<tempDOR) {
                    tempStartingDay++;
                } else {
                    tempStartingDay = 1;
                }
            }
        }
        commenceDate.setDate(commenceDate.getDate()+1);
    }

    console.log(datesArray)

    numDays = (datesArray.length)-diffEndDates-diffStartDates;

    const loadCal = () => {

        /* ----------------------INITIALIZE VARIABLES---------------------- */

        var currDate = 0;
        var dayNum = startDayValue[0];
        var staffArrayCopy = [];
        // gym teacher placement
        var orderedGym = [];
        var placedGym = [];
        var placedGymTrue = false;
        var placedGymTrue2 = false;
        var canGym = [];
        var filledGym = false;
        //non-gym teacher placement
        var placedStaff = [];
        var placedStaffTrue = false;
        var placedStaffTrue2 = false;
        var filledStaff = false;

        const newData = [];

        // console.log("date: " + commenceDate + " weday:" + dayWeekNum)

        var orderedStaff = Array.from({length: numDays}, () => Array(8).fill(""));

        for (var i = 0; i < staffArrayValue[0].length; i++) {
            if (staffArrayValue[0][i].Gym === "x" && (staffArrayValue[0][i].Day1 === "x" || staffArrayValue[0][i].Day2 === "x" || staffArrayValue[0][i].Day3 === "x" || staffArrayValue[0][i].Day4 === "x")) {
                canGym.push(staffArrayValue[0][i].Staff);
            }
            else {
                staffArrayCopy.push(staffArrayValue[0][i].Staff);
            }
        }

        /* ----------------------GYM STAFF PLACEMENT---------------------- */

        shuffle(canGym); 
        for (var i = 0; i < numDays; i++) {
            var currDay = "Day" + dayNum;
    
            placedGymTrue = false;
            for (var j = 0; j < canGym.length; j++) { 
                if ((placedGym.includes(canGym[j]) == false) || (canGym.length != 0 && placedGym.length == canGym.length)) {
                    var tempIndex = staffArrayValue[0].findIndex(item => item.Staff === canGym[j]);
                    var varProperty = currDay;
                    if (staffArrayValue[0][tempIndex][varProperty] == "x" && placedGym.includes(canGym[j]) == false && staffArrayValue[0][tempIndex].ShiftsAdded < staffArrayValue[0][tempIndex].ShiftsLeft) {
                        placedGym.push(canGym[j]);
                        staffArrayValue[0][tempIndex].ShiftsAdded++;
                        orderedGym.push(canGym[j]);
                        placedGymTrue = true;
                        if (orderedGym.length == numDays) {
                            filledGym = true;
                        }
                        break;
                    }
                }
            } 
    
            if (placedGymTrue == false) {
                // if no one can supervise on that day, use someone that has already been placed for supervision 
                // but shuffle the list order so they aren't used as backup every time
                var canGymCopy = canGym;
                shuffle(canGymCopy);
                placedGymTrue2 = false;
                for (var j = 0; j < canGymCopy.length; j++) {
                    var tempIndex2 = staffArrayValue[0].findIndex(item => item.Staff === canGymCopy[j]);
                    var varProperty2 = currDay;
                    if (staffArrayValue[0][tempIndex2][varProperty2] == "x" && staffArrayValue[0][tempIndex2].ShiftsAdded < staffArrayValue[0][tempIndex2].ShiftsLeft) {
                        if (placedGym.includes(canGymCopy[j]) == false) {
                            placedGym.push(canGymCopy[j]);
                        }
                        staffArrayValue[0][tempIndex2].ShiftsAdded++;
                        orderedGym.push(canGymCopy[j]);
                        placedGymTrue = true;
                        placedGymTrue2 = true;
                        if (orderedGym.length == numDays) {
                            filledGym = true;
                        }
                        break;
                    }
                }
            }
    
            if (canGym.length != 0 && placedGym.length == canGym.length) {
                if (currDay == "Day" + tempDOR.toString()) {
                    dayNum = 1;
                    break;
                }
            } else if (filledGym == true) {
                dayNum = 1; 
                break;
            }
    
            if (placedGymTrue == false) {
                orderedGym.push("");
            }
    
            if (dayNum < tempDOR) {
                dayNum ++;
            } else {
                dayNum = 1;
            }
    
        }
    
        var numGymRepetitions = Math.floor(numDays/orderedGym.length);
    
        var tempGymArray = orderedGym;
        for (var i = 0; i < numGymRepetitions-1; i++) {
            orderedGym = orderedGym.concat(tempGymArray);
        }
    
        var gymStartIndex = 0; 
        for (var i = orderedGym.length; i < numDays; i++) {
            orderedGym.push(tempGymArray[gymStartIndex]);
            gymStartIndex ++;
        }
    
        console.log("gym arrays", canGym, placedGym, orderedGym);

        for (var z=0; z<diffStartDates; z++) {
            orderedGym.unshift("");
        }
    
        //non-gym teacher placement
        // var orderedStaff = Array.from({length: numDays}, () => Array(7).fill(""));
        // var placedStaff = [];
        // var placedStaffTrue = false;
        // var placedStaffTrue2 = false;
        // var filledStaff = false;

        /* ----------------------OTHER STAFF PLACEMENT---------------------- */

        // var orderedStaff = Array.from({length: numDays}, () => Array(7).fill(""));
        // var placedStaff = [];
        // var placedStaffTrue = false;
        // var placedStaffTrue2 = false;
        // var filledStaff = false;

    shuffle(staffArrayCopy); 
    for (var i = 0; i < numDays; i++) {
        var currDay = "Day" + dayNum;
        placedStaffTrue = false;
        for (var k = 0; k < 9-1; k++) {
            if (k!=duties.length-2) {
                for (var j = 0; j < staffArrayCopy.length; j++) {
                    if ((placedStaff.includes(staffArrayCopy[j]) == false && orderedStaff[i].includes(staffArrayCopy[j] == false)) || (staffArrayCopy.length != 0 && placedStaff.length == staffArrayCopy.length && orderedStaff[i].includes(staffArrayCopy[j] == false))) {
                        var tempIndex = staffArrayValue[0].findIndex(item => item.Staff === staffArrayCopy[j]);
                        var varProperty = currDay;
                        if (staffArrayValue[0][tempIndex].ShiftsAdded < staffArrayValue[0][tempIndex].ShiftsLeft) {
                            if (staffArrayValue[0][tempIndex][varProperty] == "x") {
                                placedStaff.push(staffArrayCopy[j]);
                                staffArrayValue[0][tempIndex].ShiftsAdded++;
                                orderedStaff[i][k] = staffArrayCopy[j];
                                placedStaffTrue = true;
                                // console.log("nop: " + duties.length)
                                if (i == numDays-1 && k == duties.length-1-2) {
                                    filledStaff = true;
                                }
                                break;
                            }
                        }
                    }
                } 
            }
        }

        if (placedStaffTrue == false) {
            // if no one can supervise on that day, use someone that has already been placed for supervision 
            // but shuffle the list order so they aren't used as backup every time
            var staffArrayCopyCopy = staffArrayCopy;
            shuffle(staffArrayCopyCopy);
            placedStaffTrue2 = false;
            for (var k = 0; k < duties.length-1; k++) {
                if (k!==9-2) {
                    for (var j = 0; j < staffArrayCopyCopy.length; j++) {
                        var tempIndex2 = staffArrayValue[0].findIndex(item => item.Staff === staffArrayCopyCopy[j]);
                        var varProperty2 = currDay;
                        if (orderedStaff[i].includes(staffArrayCopyCopy[j]) == false && staffArrayValue[0][tempIndex2].ShiftsAdded < staffArrayValue[0][tempIndex2].ShiftsLeft) {
                            if (staffArrayValue[0][tempIndex2][varProperty2] == "x") {
                                if (placedStaff.includes(staffArrayCopy[j]) == false) {
                                    placedStaff.push(staffArrayCopyCopy[j]);
                                }
                                staffArrayValue[0][tempIndex2].ShiftsAdded++;
                                orderedStaff[i][k] = staffArrayCopyCopy[j];
                                placedStaffTrue = true;
                                placedStaffTrue2 = true;
                                // console.log("yep: " + duties.length)
                                if (i === numDays-1 && k === duties.length-1-2) {
                                    filledStaff = true;
                                }
                                break;
                            }
                        }
                    }
                }
            }
        }

        if (staffArrayCopy.length != 0 && placedStaff.length == staffArrayCopy.length) {
            if (currDay == "Day" + tempDOR.toString()) {
                var stoppedAt = i;
                dayNum = 1;
                break;
            }
        } else if (filledStaff == true) {
            var stoppedAt = i;
            dayNum = 1;
            break;
        }

        // if (placedStaffTrue == false) {
        //     orderedStaff[i].push("");
        // }

        if (dayNum < tempDOR) {
            dayNum ++;
        } else {
            dayNum = 1;
        }
    }

    if (filledStaff == false || i != numDays-1) {
        orderedStaff.splice(stoppedAt+1);
    }

    var numStaffRepetitions = Math.floor(numDays/orderedStaff.length);

    var tempStaffArray = orderedStaff;
    for (var i = 0; i < numStaffRepetitions-1; i++) {
        orderedStaff = orderedStaff.concat(tempStaffArray);
    }

    var staffStartIndex = 0; 
    for (var i = orderedStaff.length; i < numDays; i++) {
        orderedStaff.push(tempStaffArray[staffStartIndex]);
        staffStartIndex ++;
    }

    console.log("staff arrays", staffArrayCopy, placedStaff, orderedStaff);

    for (var h=0; h<diffStartDates; h++) {
        orderedStaff.unshift(['','','','','','','', ''])
    }

    for (var g=0; g<diffEndDates; g++) {
        orderedStaff.push(['','','','','','','', ''])
    }

    console.log("staffarr: ", orderedStaff)

    for (var i = 0; i < staffArrayValue[0].length; i++) {
        staffArrayValue[0][i].ShiftsAdded = 0;
    }

        
        /* ----------------------ADD ITEMS INTO CALENDAR---------------------- */

        // console.log(datesArray)
        // console.log(datesArray);
        while (currDate < datesArray.length) {
            newData.push({duty: "Duty", time: "Time", monday: datesArray[currDate], tuesday: datesArray[currDate+1], wednesday: datesArray[currDate+2], thursday: datesArray[currDate+3], friday: datesArray[currDate+4]});
            for (var i=0; i<duties.length; i++){
                console.log(">:(((((" + orderedStaff[0].length + ' and i=' + i + ' and currday=' + currDate)
                if(i===2) {
                    newData.push({duty: duties[i], time: startTimes[i] + "–" + endTimes[i], monday: orderedGym[currDate], tuesday: orderedGym[currDate+1], wednesday: orderedGym[currDate+2], thursday: orderedGym[currDate+3], friday: orderedGym[currDate+4]});
                }
                else if (i<2) {
                    console.log("?????" +orderedStaff[currDate][i])
                    console.log("?????1" +orderedStaff[currDate+1][i])
                    console.log("?????2" +orderedStaff[currDate+2][i])
                    console.log("?????3" +orderedStaff[currDate+3][i])
                    console.log("?????4" +orderedStaff[currDate+4][i])
                    newData.push({duty: duties[i], time: startTimes[i] + "–" + endTimes[i], monday: orderedStaff[currDate][i], tuesday: orderedStaff[currDate+1][i], wednesday: orderedStaff[currDate+2][i], thursday: orderedStaff[currDate+3][i], friday: orderedStaff[currDate+4][i]});
                }
                else {
                    console.log("!!!!!!!!")
                    newData.push({duty: duties[i], time: startTimes[i] + "–" + endTimes[i], monday: orderedStaff[currDate][i-1], tuesday: orderedStaff[currDate+1][i-1], wednesday: orderedStaff[currDate+2][i-1], thursday: orderedStaff[currDate+3][i-1], friday: orderedStaff[currDate+4][i-1]});
                }
            }
            currDate += 5;

            setRowData([...newData]);
        }
    }
    
    /* ----------------------COLUMN INITIALIZATION---------------------- */
    
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
        // {field: 'monday', width: 120, cellEditor: "agSelectCellEditor", cellEditorParams: {values: allStaffMembers, valueListMaxHeight: 140, valueListMaxWidth: 120, valueListBackgroundColor: '#ffffff'}},
        // {field: 'tuesday', width: 120, cellEditor: "agSelectCellEditor", cellEditorParams: {values: allStaffMembers}},
        // {field: 'wednesday', width: 120, cellEditor: "agSelectCellEditor", cellEditorParams: {values: allStaffMembers}},
        // {field: 'thursday', width: 120, cellEditor: "agSelectCellEditor", cellEditorParams: {values: allStaffMembers}},
        // {field: 'friday', width: 120, cellEditor: "agSelectCellEditor", cellEditorParams: {values: allStaffMembers}}
        {field: 'monday', width: 120},
        {field: 'tuesday', width: 120},
        {field: 'wednesday', width: 120},
        {field: 'thursday', width: 120},
        {field: 'friday', width: 120}
    
    ]);

    const defaultColDef = useMemo(() => {
        return {
            editable: true,
        }
    }, []);

    //row styling
    const rowClass = 'ag-theme-quartz';
    const getRowStyle = params => {
        if (params.node.rowIndex % (duties.length + 1) === 0) {
            // return { background: '#455A85' };
            return 'ag-subtitle';
        }
    }

    const cellFocused = (evt) => {
        const focusedCell =  evt.api.getFocusedCell();
        const row = evt.api.getDisplayedRowAtIndex(focusedCell.rowIndex)
        const cellValue = evt.api.getValue(focusedCell.column, row)
        console.log("xxx cell was value", cellValue);
    };

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
                        defaultColDef={defaultColDef}
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

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i+1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}