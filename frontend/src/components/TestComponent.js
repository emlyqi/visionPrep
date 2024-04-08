import { useState, useContext } from "react";
import { Box } from "@mui/material";
import UploadContext from "../contexts/UploadContext";
import { findAllByDisplayValue } from "@testing-library/react";

export default function ViewCalendar() {

    const { daysOfRotationValue, startDayValue, startDateValue, endDateValue, staffArrayValue
     } = useContext(UploadContext);
    const [, setDaysOfRotation] = daysOfRotationValue;
    const [, setStartDay] = startDayValue;
    const [, setStartDate] = startDateValue;
    const [, setEndDate] = endDateValue;
    const [, setStaffArray] = staffArrayValue;
    const duties = ["Cafeteria 1", "Cafeteria 2", "Gym/Weight Room", "Bleachers", "Library", "Foyer", "Rover 1", "Rover 2", "Guidance"];
    const startTimes = ["10:52", "10:58", "10:55", "10:52", "10:58", "10:58", "10:52", "10:58", "10:58", "10:58"];
    const endTimes = ["11:29", "11:35", "11:32", "11:29", "11:35", "11:35", "11:29", "11:35", "11:35", "11:35"];
    
    const [date, setDate] = useState(new Date());

    var canGym = [];
    var staffArrayCopy = [];

    for (var i = 0; i < staffArrayValue[0].length; i++) {
        if (staffArrayValue[0][i].Gym == "x" && (staffArrayValue[0][i].Day1 == "x" || staffArrayValue[0][i].Day2 == "x" || staffArrayValue[0][i].Day3 == "x" || staffArrayValue[0][i].Day4 == "x")) {
            canGym.push(staffArrayValue[0][i].Staff);
        }
        else {
            staffArrayCopy.push(staffArrayValue[0][i].Staff);
        }
    }

    const numDays = 30;
    var dayNum = 1;

    // gym teacher placement 
    var orderedGym = [];
    var placedGym = [];
    var placedGymTrue = false;
    var placedGymTrue2 = false;
    var filledGym = false;

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
            if (currDay == "Day4") {
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

        if (dayNum < 4) {
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

    //non-gym teacher placement
    var orderedStaff = Array.from({length: numDays}, () => Array(7).fill(""));
    var placedStaff = [];
    var placedStaffTrue = false;
    var placedStaffTrue2 = false;
    var filledStaff = false;

    shuffle(staffArrayCopy); 
    for (var i = 0; i < numDays; i++) {
        var currDay = "Day" + dayNum;
        placedStaffTrue = false;
        for (var k = 0; k < 7; k++) {
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
                            if (i == numDays-1 && k == 7-1) {
                                filledStaff = true;
                            }
                            break;
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
            for (var k = 0; k < 7; k++) {
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
                            if (i == numDays-1 && k == 7-1) {
                                filledStaff = true;
                            }
                            break;
                        }
                    }
                }
            }
        }

        if (staffArrayCopy.length != 0 && placedStaff.length == staffArrayCopy.length) {
            if (currDay == "Day4") {
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

        if (dayNum < 4) {
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

    for (var i = 0; i < staffArrayValue[0].length; i++) {
        staffArrayValue[0][i].ShiftsAdded = 0;
    }

    return (
        <Box>
        </Box>
    )
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i+1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}