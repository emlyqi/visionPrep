import React, { useState, useContext, useMemo, useRef, } from "react";
import Calendar from 'react-calendar';
import { Box, Grid, Button, IconButton, Divider, Stack, FormControl, Select, MenuItem } from "@mui/material";
import { borderBottomColor, fontSize, styled } from "@mui/system";
import UploadContext from "../contexts/UploadContext";
import { AgGridReact } from 'ag-grid-react';
import { createRoot } from "react-dom/client";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "../App.css"
import RefreshIcon from '@mui/icons-material/Refresh';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { gridApi } from "ag-grid-community";

// import { ModuleRegistry } from "@ag-grid-community/core";
// ModuleRegistry.registerModules([ClientSideRowModelModule]);


//style for the selected MUI
const StyledSelect = styled(Select)(({theme}) => ({
    color: '#5790FF',
    fontSize: '1.7rem',
    '& .MuiSelect-icon': {
        color: '#5790FF',
        fontSize: '1.8rem',
    },
}));

export default function ViewCalendar() {
    const gridRef = useRef();

    const { daysOfRotationValue, startDayValue, startDateValue, endDateValue, staffArrayValue, cellValueValue, dayTypeValue, cellIndexValue, cellChangeDayValue } = useContext(UploadContext);
    const [, setDaysOfRotation] = daysOfRotationValue;
    const [, setStartDay] = startDayValue;
    const [, setStartDate] = startDateValue;
    const [, setEndDate] = endDateValue;
    const [, setStaffArray] = staffArrayValue;
    const [, setCellValue] = cellValueValue;
    const [, setDayType] = dayTypeValue;
    const [, setCellIndex] = cellIndexValue;
    const [, setCellChangeDay] = cellChangeDayValue;
    // const [, setcalendarMonth] = calendarMonthValue;
    
    const duties = ["Cafeteria 1", "Cafeteria 2", "Gym/Weight Room", "Bleachers", "Library", "Foyer", "Rover 1", "Rover 2", "Guidance"];
    const startTimes = ["10:52", "10:58", "10:55", "10:52", "10:58", "10:58", "10:52", "10:58", "10:58", "10:58"];
    const endTimes = ["11:29", "11:35", "11:32", "11:29", "11:35", "11:35", "11:29", "11:35", "11:35", "11:35"];
    const [selectedDay, setSelectedDay] = useState("Choose A Day")
    const [rowData, setRowData] = useState([]);
    const [dayTypes, setDayTypes] = useState(dayTypeValue[0]);

    var datesArray = [];
    var numDays = 0;
    var diffEndDates = 0;
    var diffStartDates = 0;
    var allStaffMembers = [];
    const commenceDate = new Date(startDateValue[0]);
    commenceDate.setDate(commenceDate.getDate()+1);
    const startingDate = new Date(startDateValue[0]);
    startingDate.setDate(commenceDate.getDate());
    const endingDate = new Date (endDateValue[0]);
    endingDate.setDate(endingDate.getDate()+1);
    const endingsDate = new Date (endDateValue[0]);
    endingsDate.setDate(endingsDate.getDate()+1);
    const dayWeekNum = commenceDate.getDay();
    const endDayWeekNum = endingDate.getDay();
    var tempStartingDay = startDayValue[0];
    var firstDay = 0;
    var first = true;
    var tempDOR = daysOfRotationValue[0];
    var teachDay = false;
    // var cellValue = "Choose A Day";

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

    while (commenceDate <= endingDate) {
        if (commenceDate.getDay()<=5 && commenceDate.getDay()>=1){
            if (commenceDate<startingDate) {
                datesArray.push((commenceDate.getMonth() + 1).toString() + "/" + (commenceDate.getDate()).toString() + "/" + (commenceDate.getFullYear()).toString() + " | N/A");
            }
            else if (commenceDate>endingsDate) {
                datesArray.push((commenceDate.getMonth() + 1).toString() + "/" + (commenceDate.getDate()).toString() + "/" + (commenceDate.getFullYear()).toString() + " | N/A");
            }
            else {
                datesArray.push((commenceDate.getMonth() + 1).toString() + "/" + (commenceDate.getDate()).toString() + "/" + (commenceDate.getFullYear()).toString() + " | Day " + tempStartingDay);
                if (first) {
                    firstDay = tempStartingDay;
                    first = false;
                }
                if (tempStartingDay<tempDOR) {
                    tempStartingDay++;
                } else {
                    tempStartingDay = 1;
                }
            }
        }
        commenceDate.setDate(commenceDate.getDate()+1);
    }

    const tempDatesArray = datesArray
    numDays = (datesArray.length)-diffEndDates-diffStartDates+1;

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

        var dutiesLength = duties.length - 3
        var orderedStaff = Array.from({length: numDays}, () => Array(8).fill(""));

        for (var i = 0; i < staffArrayValue[0].length; i++) {
            if (staffArrayValue[0][i].Gym === "x" && (staffArrayValue[0][i].Day1 === "x" || staffArrayValue[0][i].Day2 === "x" || staffArrayValue[0][i].Day3 === "x" || staffArrayValue[0][i].Day4 === "x")) {
                canGym.push(staffArrayValue[0][i].Staff);
            }
            else {
                staffArrayCopy.push(staffArrayValue[0][i].Staff);
            }
        }

        for (var i = 0; i < staffArrayValue[0].length; i++) {
            staffArrayValue[0][i].ShiftsAdded = 0;
        }

        /* ----------------------GYM STAFF PLACEMENT---------------------- */

        console.log(1);
        shuffle(canGym); 

        for (var i = 0; i < numDays; i++) {
            // no gym on mondays
            // if ((i-mon)%5 === 0) {
            //     orderedGym.push("");
            //     continue;
            // }
            var currDay = "Day" + dayNum;
    
            placedGymTrue = false;
            
            // repeats until program finds someone who is available on that day
            for (var j = 0; j < canGym.length; j++) { 
                console.log(2);
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
                        break; // if program finds someone
                    }
                }
            } 
    
            // if program doesn't find anyone
            if (placedGymTrue == false) {
                console.log(3);
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
    
            console.log(4);
            if (canGym.length != 0 && placedGym.length == canGym.length) {
                if (currDay == "Day" + tempDOR.toString()) {
                    break;
                }
            } else if (filledGym == true) {
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
    
        console.log(5);
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

        console.log(6);
        dayNum = startDayValue[0];
        var allPlaced = -1;

        shuffle(staffArrayCopy); 
        for (var i = 0; i < numDays; i++) {
            console.log(7);
            var currDay = "Day" + dayNum;
            placedStaffTrue = false;
            for (var k = 0; k < duties.length-1; k++) {
                if (k<duties.length-2-2) {
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
                                    if (i == numDays-1 && k == duties.length-1-2-2) {
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
                console.log(8);
                // if no one can supervise on that day, use someone that has already been placed for supervision 
                // but shuffle the list order so they aren't used as backup every time
                var staffArrayCopyCopy = staffArrayCopy;
                shuffle(staffArrayCopyCopy);
                placedStaffTrue2 = false;
                for (var k = 0; k < duties.length-1; k++) {
                    if (k<duties.length-4) {
                        for (var j = 0; j < staffArrayCopyCopy.length; j++) {
                            var tempIndex2 = staffArrayValue[0].findIndex(item => item.Staff === staffArrayCopyCopy[j]);
                            var varProperty2 = currDay;
                            // var indexDiff = Math.floor(tempIndex2/(orderedStaff.findLastIndex(arr => arr.includes(staffArrayCopyCopy[j]))));
                            // var indexDiff = orderedStaff.findLastIndex(arr => arr.includes(staffArrayCopyCopy[j]));
                            var staffPerson = staffArrayCopyCopy[j];
                            var indexOfLast = orderedStaff.findLastIndex(arr => arr.includes(staffPerson));
                            var indexDiff2 = Math.floor((i+diffStartDates)/5); //current day fraction
                            var indexDiff3 = Math.floor((indexOfLast+diffStartDates)/5); //last day with same teacher fraction
                            if (orderedStaff[i].includes(staffArrayCopyCopy[j]) == false && staffArrayValue[0][tempIndex2].ShiftsAdded < staffArrayValue[0][tempIndex2].ShiftsLeft) {
                                //indexOfLast === -1
                                if (indexDiff2-indexDiff3>1 || indexOfLast === -1) {
                                    if (staffArrayValue[0][tempIndex2][varProperty2] == "x") {
                                        // console.log("!!!!!!!!!! ", i)
                                        if (allPlaced===0){
                                            var multTwenty = 20;
                                            while (multTwenty<(i-1)) {
                                                multTwenty += 20;
                                            }
                                            allPlaced = 1;
                                        }
                                        if (allPlaced===1) {
                                            console.log(9);
                                            if (i>=multTwenty-1-(5-diffStartDates)) {
                                                // console.log("last row!!! ", i)
                                                var there = false
                                                for (var p=0; p<(5-diffStartDates); p++) {
                                                    for (var l=0; l<duties.length-1; l++) {
                                                        if (staffArrayCopy[j] === orderedStaff[p][l]){
                                                            there = true;
                                                            break;
                                                        }
                                                    }
                                                    if (there) {
                                                        break;
                                                    }
                                                }
                                                if (!there) {
                                                    staffArrayValue[0][tempIndex2].ShiftsAdded++;
                                                    orderedStaff[i][k] = staffArrayCopyCopy[j];
                                                    placedStaffTrue = true;
                                                    placedStaffTrue2 = true;
                                                    if (i === numDays-1 && k === duties.length-1-2-2) {
                                                        filledStaff = true;
                                                    }
                                                    break;
                                                }
                                            }
                                            else {
                                                if (placedStaff.includes(staffArrayCopy[j]) == false) {
                                                    placedStaff.push(staffArrayCopy[j]);
                                                }
                                                staffArrayValue[0][tempIndex2].ShiftsAdded++;
                                                orderedStaff[i][k] = staffArrayCopyCopy[j];
                                                placedStaffTrue = true;
                                                placedStaffTrue2 = true;
                                                if (i === numDays-1 && k === duties.length-1-2-2) {
                                                    filledStaff = true;
                                                }
                                                break;
                                            } 
                                        }
                                        else {
                                            if (placedStaff.includes(staffArrayCopy[j]) == false) {
                                                placedStaff.push(staffArrayCopy[j]);
                                            }
                                            staffArrayValue[0][tempIndex2].ShiftsAdded++;
                                            orderedStaff[i][k] = staffArrayCopyCopy[j];
                                            placedStaffTrue = true;
                                            placedStaffTrue2 = true;
                                            if (i === numDays-1 && k === duties.length-1-2-2) {
                                                filledStaff = true;
                                            }
                                            break;
                                        }
                                        
                                    }
                                }
                            }
                        }
                        // if (orderedStaff[i][k] == "") {
                        //     console.log("empty at day: " + currDay, i, k)
                        // }
                    }
                }
            }

            console.log(10);
            if (staffArrayCopy.length != 0 && placedStaff.length == staffArrayCopy.length) {
                allPlaced = 0;
                var startDayPrev = startDayValue[0];
                if (startDayPrev===1) {
                    startDayPrev = tempDOR;
                } else {
                    startDayPrev--;
                }
                // console.log("???????i: " + i + ", diffstart: " + diffStartDates + ", (i+5)%5: " + (i+1)%5)
                if (currDay == "Day" + startDayPrev.toString() && (i+diffStartDates+1)%5==diffStartDates) {
                    var stoppedAt = i;
                    break;
                }
            } else if (filledStaff == true) {
                var stoppedAt = i;
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

        // console.log("!!!!!!!!!!!!!!!DONE!!!!!!!!!!!")
        // console.log(orderedStaff, stoppedAt)

        console.log(11);
        if (filledStaff == false || i != numDays-1) {
            orderedStaff.splice(stoppedAt+1);
        }
        console.log(11.1)

        var numStaffRepetitions = Math.floor(numDays/orderedStaff.length);
        console.log(11.2, "staffrep:", numStaffRepetitions, "numdays:", numDays, "stafflengt:", orderedStaff.length)

        var tempStaffArray = orderedStaff;
        console.log(11.21)
        for (var i = 0; i < numStaffRepetitions-1; i++) {
            orderedStaff = orderedStaff.concat(tempStaffArray);
            console.log(11.22)
        }
        console.log(11.3)

        var staffStartIndex = 0; 
        for (var i = orderedStaff.length; i < numDays; i++) {
            orderedStaff.push(tempStaffArray[staffStartIndex]);
            staffStartIndex ++;
        }


        console.log(12);
        for (var h=0; h<diffStartDates; h++) {
            orderedStaff.unshift(['','','','','','','', ''])
        }

        for (var g=0; g<diffEndDates; g++) {
            orderedStaff.push(['','','','','','','', ''])
        }
    
        /* ----------------------SCHOOL/PA DAY/HOLIDAY---------------------- */
        
        datesArray = tempDatesArray;
        console.log(cellChangeDayValue);
        
        setCellChangeDay(cellChangeDayValue[0].sort((a, b) => a.Index - b.Index));
        console.log(cellChangeDayValue);

        // if (cellChangeDayValue[0][0].Index !== -1) {
        for (var i=0; i<cellChangeDayValue[0].length; i++) {
            if (cellChangeDayValue[0][i].Index !== -1) {
                console.log("-1 chnaged", cellChangeDayValue[0][i].DaySchoolType, cellChangeDayValue[0][i].Index); //dayschoolday
                var dateOnly = (datesArray[cellChangeDayValue[0][i].Index]).substring(0, (datesArray[cellChangeDayValue[0][i].Index]).length-5); //get the date part (AKA without "Day #")
                datesArray[cellChangeDayValue[0][i].Index] = dateOnly + cellChangeDayValue[0][i].DaySchoolType; //Add PA Day or Holiday afterwards

                //push the staff members to the next day
                orderedStaff.splice(cellChangeDayValue[0][i].Index, 0, ['','','','','','','', '']);
                orderedGym.splice(cellChangeDayValue[0][i].Index,0, "")
            }
        }
        var dayTemp = tempStartingDay;
        var dayOfTemp = "";
        // console.log(startDayTemp)
        console.log(tempDatesArray)
        for (var j=0; j<datesArray.length; j++) {
            dayOfTemp = (datesArray[j]).substring(datesArray[j].length-1, datesArray[j].length);
            if (dayOfTemp === "1" || dayOfTemp === "2" || dayOfTemp === "3" || dayOfTemp === "4") {
                datesArray[j] = (datesArray[j]).substring(0, datesArray[j].length-1) + dayTemp.toString();
                if (dayTemp < tempDOR) {
                    dayTemp ++;
                } else {
                    dayTemp = 1;
                }
            }

        }

        // }
        // else {
        //     datesArray[cellChangeDayValue[0][0].Index] = tempDatesArray[cellChangeDayValue[0][0].Index];
        // }

        /* ----------------------NO GYM MONDAY---------------------- */

        var mon = 0;
        if (diffStartDates === 0) {
            mon = 0;
        } else {
        var mon = 5-diffStartDates;
        }
        
        for (var i = 0; i < datesArray.length; i++) {
            // no gym on mondays
            if ((i-mon)%5 === 0) {
                orderedGym[i]="";
            }
        }
        
        /* ----------------------ADD ITEMS INTO CALENDAR---------------------- */

        console.log(13);
        while (currDate < datesArray.length) {
            newData.push({duty: "Duty", time: "Time", monday: datesArray[currDate], tuesday: datesArray[currDate+1], wednesday: datesArray[currDate+2], thursday: datesArray[currDate+3], friday: datesArray[currDate+4]});
            for (var i=0; i<duties.length; i++){
                if(i===2) {
                    newData.push({duty: duties[i], time: startTimes[i] + "–" + endTimes[i], monday: orderedGym[currDate], tuesday: orderedGym[currDate+1], wednesday: orderedGym[currDate+2], thursday: orderedGym[currDate+3], friday: orderedGym[currDate+4]});
                }
                else if (i<2) {
                    newData.push({duty: duties[i], time: startTimes[i] + "–" + endTimes[i], monday: orderedStaff[currDate][i], tuesday: orderedStaff[currDate+1][i], wednesday: orderedStaff[currDate+2][i], thursday: orderedStaff[currDate+3][i], friday: orderedStaff[currDate+4][i]});
                }
                else {
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

    /* ----------------------FUNCTIONS---------------------- */

    const cellFocused = (event) => {
        const focusedCell =  event.api.getFocusedCell();
        const row = event.api.getDisplayedRowAtIndex(focusedCell.rowIndex);
        const gridValue = event.api.getValue((event.api.getFocusedCell()).column, event.api.getDisplayedRowAtIndex(focusedCell.rowIndex));
        setCellValue(gridValue);
        // const gridIndex = event.api.getIndex(focusedCell.column, row);
        // console.log(focusedCell.rowIndex, focusedCell.column)
        const tempCellIndex = (focusedCell.rowIndex)/10*5+(focusedCell.column.instanceId)-2;
        console.log(tempCellIndex);
        setCellIndex(tempCellIndex);
        console.log(cellIndexValue);
        // console.log(focusedCell.column.instanceId)
        let lastFew = gridValue.substring(gridValue.length-6, gridValue.length);
        console.log(lastFew)
        if (lastFew === "PA Day") {
            setDayType("PA Day")
        }
        else if (lastFew === "oliday") {
            setDayType("Holiday")
        }
        else {
            setDayType("School")
        }
        setDayTypes(dayTypeValue[0]);
        console.log(row, setCellValue)

    };

    const dayTypeChange = (event) => {
        console.log("change " )
        setDayTypes(event.target.value);
        let dayT = event.target.value;
        // setDayType()
        // setCellChangeDay([{Index: cellIndexValue[0], DaySchoolType: dayT}]);
        // setCellChangeDay(1);
        for (var i=0; i<cellChangeDayValue[0].length; i++) {
            if (cellChangeDayValue[0][i].Index === cellIndexValue[0]) {

                console.log("indexCell:", cellIndexValue[0], "indexALR:", cellChangeDayValue[0][i].Index)
                console.log("same")
                let t = cellChangeDayValue[0];
                t.splice(i,1);
                console.log ("t:", t);
                setCellChangeDay(t);
                break;
            }
        }
        console.log("day:", dayT)
        if (dayT != 'School') {
            // if (cellChangeDayValue[0][0].Index === -1) {
            //     console.log("neg")
            //     setCellChangeDay([{Index: cellIndexValue[0], DaySchoolType: dayT}]);
            //     console.log(cellChangeDayValue);
            console.log("to pa")
            setCellChangeDay(oldArray => [...oldArray, {Index: cellIndexValue[0], DaySchoolType: dayT}]);
        }
        console.log(cellChangeDayValue)
    }

    /* ----------------------EXPORT---------------------- */

    const exportButton = () => {
        gridRef.current.api.exportDataAsCsv();
    };
    
    // const classes = useStyles();

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
                <IconButton
                    aria-label="download as CSV"
                    style={{color:"#5790FF"}}
                    onClick={exportButton}
                >
                 <FileDownloadOutlinedIcon />   
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
                    style={{height: "100%", width: "50rem", margin: 0, backgroundColor: "#ffffff", textAlign: "center", borderRadius: "0.8rem"}}
                    // position="absolute"
                >
                    <AgGridReact
                        rowHeight={18}
                        rowData={rowData}
                        columnDefs={colDefs}
                        defaultColDef={defaultColDef}
                        rowClass={rowClass}
                        onCellClicked={cellFocused}
                        getRowClass={getRowStyle}
                        // suppressExcelExport = 'true'
                        ref={gridRef}
                        //onCellClicked
                    />
                </div>
                <Box
                    width='31.736%'
                    backgroundColor='#26272B'
                    borderRadius='1rem'
                    // flexDirection= 'column'
                >
                    <p style={{color: "#C1D6FF", fontSize: "2rem", marginLeft: "2.5rem", marginTop:"4.3rem", marginBottom: "0rem", paddingBottom: "1rem"}}>{cellValueValue[0]}</p>
                    {/* <p style={{color: "#C1D6FF", fontSize: "2rem", marginLeft: "2.5rem", marginTop:"4.3rem", marginBottom: "0rem", paddingBottom: "0rem"}}>{selectedDay}</p> */}
                    {/* <p style={{fontSize: "2rem", marginLeft: "1.2rem", marginTop: "-1rem", paddingTop: "0rem", color: "#80828A"}}>________________________ </p> */}
                    {/* <DaySideBar cellValue={cellValueValue[0]} dayTypes={dayTypeValue[0]} cellIndex={cellIndexValue[0]}/> */}
                    <Divider sx={{background: "#55575E", borderBottomWidth: 2}}/>
                    <Stack direction="horizontal" marginTop='1rem'>
                        <p style={{color: "#80828A", marginLeft: "1.5rem", marginRight: '1rem', fontSize: "1.7rem", marginTop: "0.4rem"}}>Day Type:</p>
                        <FormControl variant="standard" >
                        <StyledSelect
                            id="day-type"
                            value={dayTypes}
                            onChange={dayTypeChange}
                            // className={classes.selected}
                            // // class={{
                            // // root: '#5790FF'
                            // // }}
                            // color="primary"
                            // // color="#5790FF"
                        >
                            <MenuItem value={"School"}>School</MenuItem>
                            <MenuItem value={"PA Day"}>PA Day</MenuItem>
                            <MenuItem value={"Holiday"}>Holiday</MenuItem>
                        </StyledSelect>
                        </FormControl>
                    </Stack>
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