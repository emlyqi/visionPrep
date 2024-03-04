import React, { useState, useContext } from "react";
import { ToggleButton } from '@mui/material';
import UploadContext from "../contexts/UploadContext";

// color change when pressed isnt working!!!

function DoRButts ({ featureName }) {
    const {daysOfRotationValue, startDayValue, startDateValue, endDateValue} = useContext(UploadContext);
    const [setDaysOfRotation] = daysOfRotationValue;
    const [setStartDay] = startDayValue;
    const [setStartDate] = startDateValue;
    const [setEndDate] = endDateValue;

    // var bgColor = '#C1D6FF';
    // var textColor = '#3D72D9';
    // var pressButt = false;
    const [bgColor, setBgColor] = useState("#C1D6FF");
    const [textColor, setTextColor] = useState("#3D72D9");
    const [pressButt, setPressButt] = useState(false);

    const buttonClick = () => {
        if (pressButt) {
            setBgColor('#C1D6FF');
            setTextColor('#3D72D9');
            setPressButt(false);
        } else {
            setBgColor('#3D72D9');
            setTextColor('#5790FF');
            setPressButt(true);
        }
      };

    return (
        <ToggleButton
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
        </ToggleButton>
    );
}

export default DoRButts;