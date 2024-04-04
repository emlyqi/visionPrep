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
    var orderedGym = [];
    var orderedStaff = [];
    var placedStaff = [];

    for (var i = 0; i < staffArrayValue[0].length; i++) {
        if (staffArrayValue[0][i].Gym == "x") {
            canGym.push(staffArrayValue[0][i].Staff);
        }
        else if (staffArrayValue[0][i].Day1 == "x") {
            d1.push(staffArrayValue[0][i].Staff);
        }
        else if (staffArrayValue[0][i].Day2 == "x") {
            d2.push(staffArrayValue[0][i].Staff);
        }
        else if (staffArrayValue[0][i].Day2 == "x") {
            d3.push(staffArrayValue[0][i].Staff);
        }
        else if (staffArrayValue[0][i].Day2 == "x") {
            d4.push(staffArrayValue[0][i].Staff);
        }
    }

    // gym teacher placement
    // see things to add doc
    var placedGym = [];
    const numDays = 12;
    var dayNum = 1;
    var placedGymTrue = false;

    for (var i = 0; i < numDays; i++) {
        var currDay = "Day" + dayNum;
        placedGymTrue = false;
        for (var j = 0; j < canGym.length; j++) { 
            if (placedGym.includes(canGym[j]) == false) {
                var tempIndex = staffArrayValue[0].findIndex(item => item.Staff === canGym[j]);
                var varProperty = currDay;
                if (tempIndex != -1) {
                    if (staffArrayValue[0][tempIndex][varProperty] == "x" && placedGym.includes(canGym[j]) == false) {
                        placedGym.push(canGym[j]);
                        orderedGym.push(canGym[j]);
                        placedGymTrue = true;
                    }
                }
            }

            if (placedGymTrue == true) {
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

    console.log("gym ones", orderedGym, placedGym);

    return (
        <Box>
            <Box>
            </Box>
            <p>
                <span>Selected Date:</span> {' '}
                {date.toDateString()}
            </p>
        </Box>
    )
}