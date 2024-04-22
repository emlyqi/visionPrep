import React, { useState, useContext } from "react";
import { ToggleButton, ToggleButtonGroup, styled } from '@mui/material';
import UploadContext from "../contexts/UploadContext";

// hopefully the variables work!! did not try it out!!

function DoRButts () {
    const MuiToggleButton = styled(ToggleButton)({
        fontSize: '1.5625rem',
        color: "#3D72D9",
        borderRadius: '3.125rem',
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        textTransform: 'none',
        letterSpacing: '0.0625rem',
        margin: '0.75rem',
        padding: '0.3rem 1.85rem',
        border: 0,
        backgroundColor: "#C1D6FF",
        transition: '.3s',
        width: '6.3125rem',
        height: '3.83rem',
        '&:hover': { backgroundColor: '#8CB3FF', color: "4984F6" },
        "&.Mui-selected, &.Mui-selected:hover": {backgroundColor: '#3D72D9', color: "#5790FF"}

    })

    const {daysOfRotationValue} = useContext(UploadContext);
    const [, setDaysOfRotation] = daysOfRotationValue;

    // const [bgColor, setBgColor] = useState("#C1D6FF");
    // const [textColor, setTextColor] = useState("#3D72D9");
    // const [pressButt, setPressButt] = useState(false);

    const handleDOR = (event, newDOR) => {
        setDaysOfRotation(newDOR);
        console.log(daysOfRotationValue)
    };

    // const buttonClick = () => {
    //     if (pressButt) {
    //         setBgColor('#C1D6FF');
    //         setTextColor('#3D72D9');
    //         setPressButt(false);
    //         if (featureName === '2') setDaysOfRotation('4');
    //         else if (featureName === '4') setDaysOfRotation('2');
    //     } else {
    //         setBgColor('#3D72D9');
    //         setTextColor('#5790FF');
    //         setPressButt(true);
    //         if (featureName === '2') setDaysOfRotation('2');
    //         else if (featureName === '4') setDaysOfRotation('4');
    //     }
    //     console.log(daysOfRotationValue);
    // };



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

            {/* <ToggleButton
                sx={{
                    fontSize: '1.5625rem',
                    color: textColor,
                    borderRadius: '3.125rem',
                    fontFamily: 'sans-serif',
                    fontWeight: 'bold',
                    textTransform: 'none',
                    letterSpacing: '0.0625rem',
                    margin: '0.75rem',
                    padding: '0.3rem 1.85rem',
                    border: 0,
                    backgroundColor: bgColor,
                    transition: '.3s',
                    width: '6.3125rem',
                    height: '3.83rem',
                    '&:hover': { backgroundColor: '#8CB3FF', color: "4984F6" }
                }}
                value='content'
                aria-label='content'
                onClick={buttonClick}
            >
                {featureName}
            </ToggleButton> */}
        </ToggleButtonGroup>
    );
}

export default DoRButts;