/** 
VisionPrep
ICS4U-03
Emily Qi and Jamie Xiao
This file serves as the days of rotation button component used in the customization page.
History:
May 28, 2024: Last changes made
*/

/** IMPORT LIBRARIES */
import React, { useContext } from "react";
import { ToggleButton, ToggleButtonGroup, styled } from '@mui/material';
import UploadContext from "../contexts/UploadContext";

/** DAYS OF ROTATION FUNCTION */
// function uses elements from [14] https://mui.com/material-ui/react-toggle-button/ to add a toggle button
function DoRButts () {
    /** 
    serves as the days of rotation toggle component which prompts the user to choose how many days of rotation they want
    Returns:
        (component) : days of rotation toggle component
    */

    // VARIABLES
    const {daysOfRotationValue} = useContext(UploadContext);
    const [, setDaysOfRotation] = daysOfRotationValue;

    // styling for the toggle button
    const MuiToggleButton = styled(ToggleButton)({
        fontSize: '1.5625rem',
        color: "#5790FF",
        borderRadius: '3.125rem',
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        textTransform: 'none',
        letterSpacing: '0.0625rem',
        margin: '0.75rem',
        padding: '0.3rem 1.85rem',
        border: 0,
        backgroundColor: "#3D72D9",
        transition: '.3s',
        width: '6.3125rem',
        height: '3.83rem',
        '&:hover': { backgroundColor: '#8CB3FF', color: "4984F6" },
        "&.Mui-selected, &.Mui-selected:hover": {backgroundColor: '#C1D6FF', color: "#3D72D9"}

    })

    // when use presses one of the numbers in the toggle button
    const handleDOR = (event, newDOR) => {
        setDaysOfRotation(newDOR); // change the 'global' variable
    };

    // display the toggle button
    return (
        <ToggleButtonGroup 
            sx={{
                paddingLeft: '.5rem'
            }}
            value={daysOfRotationValue}
            exclusive
            onChange={handleDOR}
            aria-label="Days of Rotation"
        >
            <MuiToggleButton 
                value={2} 
                aria-label="2 Days of Rotation"
            >
                2
            </MuiToggleButton>
            <MuiToggleButton value={4} aria-label="4 Days of Rotation">
                4
            </MuiToggleButton>
        </ToggleButtonGroup>
    );
}

export default DoRButts;