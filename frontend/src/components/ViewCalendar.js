/** 
VisionPrep
ICS4U-03
Emily Qi and Jamie Xiao
This file serves to display the supervision calendar and the editing functions.
History:
May 28, 2024: Last changes made
*/

/** IMPORT LIBRARIES */
import React, { useState, useContext, useMemo, useRef, } from "react";
import { Box, IconButton, Divider, Stack, FormControl, Select, MenuItem } from "@mui/material";
import { styled } from "@mui/system";
import UploadContext from "../contexts/UploadContext";
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "../App.css"
import RefreshIcon from '@mui/icons-material/Refresh';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';


//style for the selected MUI
const StyledSelect = styled(Select)(({theme}) => ({
    color: '#5790FF',
    fontSize: '1.7rem',
    '& .MuiSelect-icon': {
        color: '#5790FF',
        fontSize: '1.8rem',
    },
}));

/** CALENDAR FUNCTION */
// this function uses code from [10] https://ag-grid.com/react-data-grid/row-styles/ to make the AG Grid
export default function ViewCalendar() {
    /** 
    serves as the calendar component which shows the calendar (and allows for edits)
    Returns:
        (component) : ViewCalendar component
    */

    // VARIABLES

    // 'global' variables
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
    
    // basic constants
    const duties = ["Cafeteria 1", "Cafeteria 2", "Gym/Weight Room", "Bleachers", "Library", "Foyer", "Rover 1", "Rover 2", "Guidance"];
    const startTimes = ["10:52", "10:58", "10:55", "10:52", "10:58", "10:58", "10:52", "10:58", "10:58", "10:58"];
    const endTimes = ["11:29", "11:35", "11:32", "11:29", "11:35", "11:35", "11:29", "11:35", "11:35", "11:35"];
    const [rowData, setRowData] = useState([]);
    const [dayTypes, setDayTypes] = useState(dayTypeValue[0]);
    const gridRef = useRef();

    // basic variables
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

    // add all the staff members into a 1D array
    for (var i=0; i<staffArrayValue[0].length; i++) {
        allStaffMembers.push(staffArrayValue[0][i].Staff);
    }

    /* ----------------------GET DATES---------------------- */

    // if the start date is a Sunday
    if (dayWeekNum < 1) {
        commenceDate.setDate(commenceDate.getDate()+1); // set the start date to the next day (Monday)
    }
    // if the start date is a week day
    else if (dayWeekNum > 1 && dayWeekNum !== 6) {
        diffStartDates = dayWeekNum - 1; // find the difference in the start date and the previous Monday
        commenceDate.setDate(commenceDate.getDate()-diffStartDates); // change the start date to the previous Monday
    }
    // if the start date is a Saturday
    else if (dayWeekNum === 6) {
        commenceDate.setDate(commenceDate.getDate()+2); // set the start date the second next day (Monday)
    }

    // if the end date is a Sunday
    if (endDayWeekNum < 1) {
        endingDate.setDate(endingDate.getDate()-2); // set it to the previous Friday
    }
    // if the end date is a Saturday
    else if (endDayWeekNum === 6) {
        endingDate.setDate(endingDate.getDate()-1); // set it to the previous Friday
    }
    // if the end date is a week day
    else {
        diffEndDates = 6 - endDayWeekNum; // find the difference in the end date and the following Friday
        endingDate.setDate(endingDate.getDate()+diffEndDates); // change the end date to the following Friday
    }

    // looping through all the days from the edited start date to the edited end date
    while (commenceDate <= endingDate) {
        // if the current date of the loop is a week day
        if (commenceDate.getDay()<=5 && commenceDate.getDay()>=1){
            // if it's a date before the inputted start date, add the date to the datesArray without a day of rotation number
            if (commenceDate<startingDate) {
                datesArray.push((commenceDate.getMonth() + 1).toString() + "/" + (commenceDate.getDate()).toString() + "/" + (commenceDate.getFullYear()).toString() + " | N/A");
            }
            // if it's a date after the inputted end date, add the date to the datesArray without a day of rotation number
            else if (commenceDate>endingsDate) {
                datesArray.push((commenceDate.getMonth() + 1).toString() + "/" + (commenceDate.getDate()).toString() + "/" + (commenceDate.getFullYear()).toString() + " | N/A");
            }
            // if it's a date inside the user's desired range, add the date to the datesArray with a day of rotation number
            else {
                datesArray.push((commenceDate.getMonth() + 1).toString() + "/" + (commenceDate.getDate()).toString() + "/" + (commenceDate.getFullYear()).toString() + " | Day " + tempStartingDay);
                // if it's the first day
                if (first) {
                    firstDay = tempStartingDay;
                    first = false;
                }

                // change the day of rotation by 1
                if (tempStartingDay<tempDOR) {
                    tempStartingDay++;
                } else {
                    tempStartingDay = 1;
                }
            }
        }
        commenceDate.setDate(commenceDate.getDate()+1); // change to next date
    }

    const tempDatesArray = datesArray // temporary dates array (will be edited)
    numDays = (datesArray.length)-diffEndDates-diffStartDates+1; // total number of days between the specified period

    // load the calendar and it's properties
    const loadCal = () => {

        /* ----------------------INITIALIZE VARIABLES---------------------- */

        // general variables
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

        const newData = []; // row data

        var orderedStaff = Array.from({length: numDays}, () => Array(8).fill("")); // ordered array for the staff member placements (not including gym staff)

        // fill array with the gym staff members
        for (var i = 0; i < staffArrayValue[0].length; i++) {
            if (staffArrayValue[0][i].Gym === "x" && (staffArrayValue[0][i].Day1 === "x" || staffArrayValue[0][i].Day2 === "x" || staffArrayValue[0][i].Day3 === "x" || staffArrayValue[0][i].Day4 === "x")) {
                canGym.push(staffArrayValue[0][i].Staff);
            }
            else {
                staffArrayCopy.push(staffArrayValue[0][i].Staff);
            }
        }

        // make the shifts added for each staff member 0
        for (var i = 0; i < staffArrayValue[0].length; i++) {
            staffArrayValue[0][i].ShiftsAdded = 0;
        }

        /* ----------------------GYM STAFF PLACEMENT---------------------- */

        // this section uses elements from [3] https://stackoverflow.com/questions/48538162/how-to-check-if-a-two-dimensional-array-includes-a-string to check if a particular staff member is able to supervise
        // this section uses elements from [5] https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex to find the index of a particular staff member

        shuffle(canGym); // shuffle the gym staff array

        // loop through the days in the selected period
        for (var i = 0; i < numDays; i++) {

            var currDay = "Day" + dayNum; // current day of rotation
    
            placedGymTrue = false;
            
            // repeats until program finds someone who is available on that day
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
                        break; // if program finds someone
                    }
                }
            } 
    
            // if program doesn't find anyone
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
    
            // if everyone has been placed
            if (canGym.length != 0 && placedGym.length == canGym.length) {
                if (currDay == "Day" + tempDOR.toString()) {
                    break;
                }
            } else if (filledGym == true) {
                break;
            }
    
            // if no one can fill the spot
            if (placedGymTrue == false) {
                orderedGym.push("");
            }
    
            // increase the day of rotation
            if (dayNum < tempDOR) {
                dayNum ++;
            } else {
                dayNum = 1;
            }
    
        }
    
        var numGymRepetitions = Math.floor(numDays/orderedGym.length); // how many times to repeat this pattern
    
        // repeat the pattern which uses elements from [2] https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat
        var tempGymArray = orderedGym;
        for (var i = 0; i < numGymRepetitions-1; i++) {
            orderedGym = orderedGym.concat(tempGymArray);
        }
    
        // add the pattern into orderedGym array
        var gymStartIndex = 0; 
        for (var i = orderedGym.length; i < numDays; i++) {
            orderedGym.push(tempGymArray[gymStartIndex]);
            gymStartIndex ++;
        }

        // add empty elements if the day is before the starting date
        for (var z=0; z<diffStartDates; z++) {
            orderedGym.unshift("");
        }

        /* ----------------------OTHER STAFF PLACEMENT---------------------- */

        // this section uses elements from [3] https://stackoverflow.com/questions/48538162/how-to-check-if-a-two-dimensional-array-includes-a-string to check if a particular staff member is able to supervise
        // this section uses elements from [5] https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex to find the index of a particular staff member
        
        dayNum = startDayValue[0]; // day of rotation
        var allPlaced = -1; // if all teachers have been placed

        shuffle(staffArrayCopy); // shuffle the staff array

        // loop through the days in the selected period
        for (var i = 0; i < numDays; i++) {

            var currDay = "Day" + dayNum; // current day of rotation

            placedStaffTrue = false;

            // repeats until program finds someone who is available on that day
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
                                    break; // if program finds someone
                                }
                            }
                        }
                    } 
                }
            }

            // if program doesn't find anyone
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

                            // variables used to make sure the same teacher is scheduled at least 2 weeks after their previous duty
                            var staffPerson = staffArrayCopyCopy[j];
                            var indexOfLast = orderedStaff.findLastIndex(arr => arr.includes(staffPerson));
                            var indexDiff2 = Math.floor((i+diffStartDates)/5); //current day fraction
                            var indexDiff3 = Math.floor((indexOfLast+diffStartDates)/5); //last day with same teacher fraction
                            
                            if (orderedStaff[i].includes(staffArrayCopyCopy[j]) == false && staffArrayValue[0][tempIndex2].ShiftsAdded < staffArrayValue[0][tempIndex2].ShiftsLeft) {
                                //indexOfLast === -1
                                if (indexDiff2-indexDiff3>1 || indexOfLast === -1) {
                                    if (staffArrayValue[0][tempIndex2][varProperty2] == "x") {
                                        
                                        // if all the teachers were placed
                                        if (allPlaced===0){
                                            // the length of a loop (a multiple of twenty to be same day of week and day of rotation)
                                            var multTwenty = 20;
                                            while (multTwenty<(i-1)) {
                                                multTwenty += 20;
                                            }
                                            allPlaced = 1;
                                        }

                                        // all teachers are placed at least 2 weeks after their previous duty
                                        if (allPlaced===1) {
                                            if (i>=multTwenty-1-(5-diffStartDates)) {
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
                    }
                }
            }

            // if everyone has been placed
            if (staffArrayCopy.length != 0 && placedStaff.length == staffArrayCopy.length) {
                allPlaced = 0;
                var startDayPrev = startDayValue[0];
                if (startDayPrev===1) {
                    startDayPrev = tempDOR;
                } else {
                    startDayPrev--;
                }
                if (currDay == "Day" + startDayPrev.toString() && (i+diffStartDates+1)%5==diffStartDates) {
                    var stoppedAt = i;
                    break;
                }
            } else if (filledStaff == true) {
                var stoppedAt = i;
                break;
            }

            // increase the day of rotation
            if (dayNum < tempDOR) {
                dayNum ++;
            } else {
                dayNum = 1;
            }
        }

        if (filledStaff == false || i != numDays-1) {
            orderedStaff.splice(stoppedAt+1);
        }

        var numStaffRepetitions = Math.floor(numDays/orderedStaff.length); // how many times to repeat this pattern

        // repeat the pattern which uses elements from [2] https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat
        var tempStaffArray = orderedStaff;
        for (var i = 0; i < numStaffRepetitions-1; i++) {
            orderedStaff = orderedStaff.concat(tempStaffArray);
        }

        // add the pattern into orderedStaff array
        var staffStartIndex = 0; 
        for (var i = orderedStaff.length; i < numDays; i++) {
            orderedStaff.push(tempStaffArray[staffStartIndex]);
            staffStartIndex ++;
        }

        // add empty elements if the day is before the starting date
        for (var h=0; h<diffStartDates; h++) {
            orderedStaff.unshift(['','','','','','','', ''])
        }

        // add empty elements if the day is after the ending date
        for (var g=0; g<diffEndDates; g++) {
            orderedStaff.push(['','','','','','','', ''])
        }
    
        /* ----------------------SCHOOL/PA DAY/HOLIDAY---------------------- */
        
        datesArray = tempDatesArray;
        
        // sort all the day changes by their index from lowest to highest
        setCellChangeDay(cellChangeDayValue[0].sort((a, b) => a.Index - b.Index));

        // loop through the changes
        for (var i=0; i<cellChangeDayValue[0].length; i++) {
            // if it's not a school day change
            if (cellChangeDayValue[0][i].Index !== -1) {
                var dateOnly = (datesArray[cellChangeDayValue[0][i].Index]).substring(0, (datesArray[cellChangeDayValue[0][i].Index]).length-5); //get the date part (AKA without "Day #")
                datesArray[cellChangeDayValue[0][i].Index] = dateOnly + cellChangeDayValue[0][i].DaySchoolType; //Add PA Day or Holiday afterwards

                //push the staff members to the next day
                orderedStaff.splice(cellChangeDayValue[0][i].Index, 0, ['','','','','','','', '']);
                orderedGym.splice(cellChangeDayValue[0][i].Index,0, "")
            }
        }

        var dayTemp = startDayValue[0];
        var dayOfTemp = "";
        
        // loop through all the dates
        for (var j=0; j<datesArray.length; j++) {
            dayOfTemp = (datesArray[j]).substring(datesArray[j].length-1, datesArray[j].length); // get the day of rotation/last character
            
            // if it's not a holiday or PA day, reorganized the days of rotation for all the dates
            if (dayOfTemp === "1" || dayOfTemp === "2" || dayOfTemp === "3" || dayOfTemp === "4") {
                datesArray[j] = (datesArray[j]).substring(0, datesArray[j].length-1) + dayTemp.toString();
                console.log(datesArray[j])
                if (dayTemp < tempDOR) {
                    dayTemp ++;
                } else {
                    dayTemp = 1;
                }
            }

        }

        /* ----------------------NO GYM MONDAY---------------------- */

        // loop through all the dates
        for (var i = 0; i < datesArray.length; i++) {
            // no gym on mondays
            if (i%5 === 0) {
                orderedGym[i]="";
            }
        }
        
        /* ----------------------ADD ITEMS INTO CALENDAR---------------------- */

        // add the rows to the calender
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
    
    // create the columns
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

    // make the cells editable
    const defaultColDef = useMemo(() => {
        return {
            editable: true,
        }
    }, []);

    //row styling
    const rowClass = 'ag-theme-quartz';
    const getRowStyle = params => {
        if (params.node.rowIndex % (duties.length + 1) === 0) {
            return 'ag-subtitle';
        }
    }

    /* ----------------------ACTIONS---------------------- */

    // if a cell is clicked on
    const cellFocused = (event) => {
        const focusedCell =  event.api.getFocusedCell(); // retrieve the cell
        const row = event.api.getDisplayedRowAtIndex(focusedCell.rowIndex); // get the row index
        const gridValue = event.api.getValue((event.api.getFocusedCell()).column, event.api.getDisplayedRowAtIndex(focusedCell.rowIndex)); // get the value of the cell
        setCellValue(gridValue); // set the 'global' variable to the cell value
        
        const tempCellIndex = (focusedCell.rowIndex)/10*5+(focusedCell.column.instanceId)-2; // find the cell index
        setCellIndex(tempCellIndex);

        let lastFew = gridValue.substring(gridValue.length-6, gridValue.length); // get the last 6 characters of the cell
        
        // if the day is a PA day, change the day type
        if (lastFew === "PA Day") {
            setDayType("PA Day")
        }
        // if the day is a holiday, change the day type
        else if (lastFew === "oliday") {
            setDayType("Holiday")
        }
        // if the day is a school day, change the day type
        else {
            setDayType("School")
        }
        setDayTypes(dayTypeValue[0]);

    };

    // if the day type of a date is changed
    const dayTypeChange = (event) => {
        setDayTypes(event.target.value); // set the day type to the new chosen day type
        let dayT = event.target.value;

        // loop through the changed day types
        for (var i=0; i<cellChangeDayValue[0].length; i++) {
            // if the same date was changed previously, take the previous one out
            if (cellChangeDayValue[0][i].Index === cellIndexValue[0]) {
                let t = cellChangeDayValue[0];
                t.splice(i,1);
                setCellChangeDay(t);
                break;
            }
        }

        // if the new day type is not school day, add this to the changed day types array
        if (dayT != 'School') {
            setCellChangeDay(oldArray => [...oldArray, {Index: cellIndexValue[0], DaySchoolType: dayT}]);
        }
    }

    /* ----------------------EXPORT---------------------- */

    // export the calendar as a .csv file
    const exportButton = () => {
        gridRef.current.api.exportDataAsCsv();
    };

    // display the calendar
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
                flexDirection='row'
                paddingTop='0rem'

            >
                <div
                    style={{height: "100%", width: "50rem", margin: 0, backgroundColor: "#ffffff", textAlign: "center", borderRadius: "0.8rem"}}
                >
                    <AgGridReact
                        rowHeight={18}
                        rowData={rowData}
                        columnDefs={colDefs}
                        defaultColDef={defaultColDef}
                        rowClass={rowClass}
                        onCellClicked={cellFocused}
                        getRowClass={getRowStyle}
                        ref={gridRef}
                    />
                </div>
                <Box
                    width='31.736%'
                    backgroundColor='#26272B'
                    borderRadius='1rem'
                >
                    <p style={{color: "#C1D6FF", fontSize: "2rem", marginLeft: "2.5rem", marginTop:"4.3rem", marginBottom: "0rem", paddingBottom: "1rem"}}>{cellValueValue[0]}</p>
                    <Divider sx={{background: "#55575E", borderBottomWidth: 2}}/>
                    <Stack direction="horizontal" marginTop='1rem'>
                        <p style={{color: "#80828A", marginLeft: "1.5rem", marginRight: '1rem', fontSize: "1.7rem", marginTop: "0.4rem"}}>Day Type:</p>
                        <FormControl variant="standard" >
                        <StyledSelect
                            id="day-type"
                            value={dayTypes}
                            onChange={dayTypeChange}
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

// this function comes from https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj#:~:text=The%20first%20and%20simplest%20way to randomize the arrays
function shuffle(array) {
    /** 
    shuffles the given array
    Args:
        array (1D array) : random array
    */

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i+1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}