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

                style={{top: '0', bottom: '0', left: '0', right: '0', position: 'absolute', width: 'auto', height: 'auto', marginTop: '4.5rem', marginBottom: '4.5rem', marginRight: '4.5rem', marginLeft: '4.5rem'}}
            >
                <React.StrictMode>
                    <UploadCSV />
                </React.StrictMode>
            </Grid>
        </Grid>
    );
}

export default UploadPage;