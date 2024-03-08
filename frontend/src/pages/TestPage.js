import React, { useState } from "react";
import { Grid } from "@mui/material"; 
import EligibleStaff from '../components/EligibleStaff';
import SelectDuties from '../components/SelectDuties';
import ViewCalendar from "../components/ViewCalendar";

function TestPage() {
    return ( 
        // <Grid container flexGrow xs={12} minHeight='100vh' bgcolor='#34363D' justifyContent="center" alignItems="center">
        //     <Grid 
        //         item 
        //         container
        //         marginTop='1rem' 
        //         borderRadius='0.9375rem' 
        //         justifyContent='center' 
        //         alignContent='center' 
        //         backgroundColor='#26272B'
        //         style={{width: "83rem", height: "42rem"}}
        //     >
        //         {/* <React.StrictMode> */}
        //             <SelectDuties />
        //         {/* </React.StrictMode> */}
        //     </Grid>
        // </Grid>

        <ViewCalendar />
    );
}

export default TestPage;