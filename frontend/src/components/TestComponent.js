import { useState, useContext } from "react";
import { Box } from "@mui/material";
import UploadContext from "../contexts/UploadContext";

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
    var d1 = [];
    var d2 = [];
    var d3 = [];
    var d4 = [];

    for (var i = 0; i < staffArrayValue[0].length; i++) {
        if (staffArrayValue[0][i].Gym == "x" && (staffArrayValue[0][i].Day1 == "x" || staffArrayValue[0][i].Day2 == "x" || staffArrayValue[0][i].Day3 == "x" || staffArrayValue[0][i].Day4 == "x")) {
            canGym.push(staffArrayValue[0][i].Staff);
        }
        else if (staffArrayValue[0][i].Day1 == "x") {
            d1.push(staffArrayValue[0][i].Staff);
        }
        else if (staffArrayValue[0][i].Day2 == "x") {
            d2.push(staffArrayValue[0][i].Staff);
        }
        else if (staffArrayValue[0][i].Day3 == "x") {
            d3.push(staffArrayValue[0][i].Staff);
        }
        else if (staffArrayValue[0][i].Day4 == "x") {
            d4.push(staffArrayValue[0][i].Staff);
        }
    }

    var orderedStaff = [];
    var placedStaff = [];

    // gym teacher placement
    // see things to add doc
    var orderedGym = [];
    var placedGym = [];
    const numDays = 30;
    var dayNum = 1;
    var placedGymTrue = false;
    var placedGymTrue2 = false;

    shuffle(canGym); 

    for (var i = 0; i < numDays; i++) {
        var currDay = "Day" + dayNum;
        placedGymTrue = false;
        for (var j = 0; j < canGym.length; j++) { 
            if ((placedGym.includes(canGym[j]) == false) || (canGym.length != 0 && placedGym.length == canGym.length)) {
                var tempIndex = staffArrayValue[0].findIndex(item => item.Staff === canGym[j]);
                var varProperty = currDay;
                if (staffArrayValue[0][tempIndex][varProperty] == "x" && placedGym.includes(canGym[j]) == false) {
                    placedGym.push(canGym[j]);
                    orderedGym.push(canGym[j]);
                    placedGymTrue = true;
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
                if (staffArrayValue[0][tempIndex2][varProperty2] == "x") {
                    if (placedGym.includes(canGymCopy[j]) == false) {
                        placedGym.push(canGymCopy[j]);
                    }
                    orderedGym.push(canGymCopy[j]);
                    placedGymTrue = true;
                    placedGymTrue2 = true;
                    break;
                }
            }
        }

        if (canGym.length != 0 && placedGym.length == canGym.length) {
            if (currDay == "Day4") {
                break;
            }
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

    var tempGymArray = orderedGym
    for (var i = 0; i < numGymRepetitions-1; i++) {
        orderedGym = orderedGym.concat(tempGymArray);
    }

    var gymStartIndex = 0; 
    for (var i = orderedGym.length; i < numDays; i++) {
        orderedGym.push(tempGymArray[gymStartIndex]);
        gymStartIndex ++;
    }

    console.log("gym array", canGym, placedGym, orderedGym);

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