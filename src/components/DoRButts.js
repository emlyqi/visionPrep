import React, { useState, useContext } from "react";
import { Stack, Box, ToggleButton } from '@mui/material';

// color change when pressed isnt working!!!

function DoRButts ({ featureName }) {

    var bgColor = '#C1D6FF';
    var textColor = '#3D72D9';
    var pressButt = false;

    const buttonClick = () => {
        if (pressButt) {
            bgColor = '#C1D6FF';
            textColor = '#3D72D9';
            pressButt = false;
        } else {
            bgColor = '#3D72D9';
            textColor = '#5790FF';
            // alert("bg color: " + bgColor + "\ntextcolor: "+ textColor)
            pressButt = true;
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