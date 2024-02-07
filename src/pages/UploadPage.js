import React from "react";
import { Grid } from "@mui/material"; 
import UploadCSV from "../components/Upload"


function UploadPage() {
    return (  
        <Grid container flexGrow xs={12} minHeight='100vh' bgcolor='#34363D' justifyContent="center" alignItems="center">
            <Grid 
                item 
                container
                marginTop='1rem' 
                borderRadius='0.9375rem' 
                justifyContent='center' 
                alignContent='center' 
                backgroundColor='#26272B'
                style={{width: "83rem", height: "42rem"}}
            >
                <React.StrictMode>
                    <UploadCSV />
                </React.StrictMode>
            </Grid>
        </Grid>
    );
}

export default UploadPage;