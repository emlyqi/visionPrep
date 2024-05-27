/** 
VisionPrep
ICS4U-03
Emily Qi and Jamie Xiao
This file serves as the days of rotation button component used in the customization page.
History:
May 28, 2024: Last changes made
*/

import React, { useContext } from "react";
import { ToggleButton, ToggleButtonGroup, styled } from '@mui/material';
import UploadContext from "../contexts/UploadContext";

// hopefully the variables work!! did not try it out!!

function DoRButts () {
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

    const {daysOfRotationValue} = useContext(UploadContext);
    const [, setDaysOfRotation] = daysOfRotationValue;

    const handleDOR = (event, newDOR) => {
        setDaysOfRotation(newDOR);
        console.log(daysOfRotationValue)
    };

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