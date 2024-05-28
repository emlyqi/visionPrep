/** 
VisionPrep
ICS4U-03
Emily Qi and Jamie Xiao
This file serves as the next button component.
History:
May 28, 2024: Last changes made
*/

/** IMPORT LIBRARIES */
import * as React from 'react';
import { Button } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

/** NEXT BUTTON FUNCTION */
function NextButt() {
    /** 
    serves as the next button component which allows the user to go to the next page in the customization section
    Returns:
        (component) : next button component
    */

    // display the button
    return(
        <Button 
            variant = "contained" 
            endIcon = {<ArrowRightIcon/>}
            sx={{
                position: 'absolute',
                right: '5.3125rem',
                bottom: '4rem',
                fontFamily: 'sans-serif',
                color: '#010101',
                fontSize: '1.875rem',
                borderRadius: '100px',
                paddingX: '3.3125rem',
                paddingY: '0.01rem',
                backgroundColor: '#5790FF',
                textTransform: 'none',
                svg: {width: "5rem", height: "5rem", marginRight: "-2rem"}
            }}>
        Next
        </Button>
    );
};

export default NextButt;
