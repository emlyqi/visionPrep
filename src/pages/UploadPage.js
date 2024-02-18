import React, { useState } from "react";
import { Grid } from "@mui/material"; 
import UploadCSV from "../components/Upload"
import SelectDays from "../components/SelectDays";
import { Button } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';


function UploadPage() {

    const [active, setActive] = useState("uploadCSVPage");

    const buttonClick = () => {
        if (active === "uploadCSVPage") {
            setActive("selectDayPage");
        } else if (active === "selectDayPage") {
            setActive("uploadCSVPage");
        }
    }

    return (  
        <Grid container flexGrow xs={12} minHeight='100vh' bgcolor='#34363D' justifyContent="center" alignItems="center">
            <Grid 
                item 
                container
                borderRadius='0.9375rem' 
                justifyContent='center' 
                alignContent='center' 
                backgroundColor='#26272B'

                style={{top: '0', bottom: '0', left: '0', right: '0', position: 'absolute', width: 'auto', height: 'auto', marginTop: '4.5rem', marginBottom: '4.5rem', marginRight: '4.5rem', marginLeft: '4.5rem'}}
            >

                <Grid container style={{top: '0', bottom: '0', left: '0', right: '0', position: 'absolute', width: 'auto', height: 'auto', marginTop: '0rem', marginBottom: '0rem', marginRight: '0rem', marginLeft: '0rem'}}>
                    {active === "uploadCSVPage" && <React.StrictMode><UploadCSV /></React.StrictMode>}
                    {active === "selectDayPage" && <SelectDays/>}
                </Grid>
                <Button 
                    variant = "contained" 
                    endIcon = {<ArrowRightIcon/>}
                    onClick = {buttonClick}
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
                
            </Grid>
        </Grid>
    );
}

export default UploadPage;