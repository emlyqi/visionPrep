/** 
VisionPrep
ICS4U-03
Emily Qi and Jamie Xiao
This file serves to gather the data from the uploaded .csv file.
History:
May 28, 2024: Last changes made
*/

/** IMPORT LIBRARIES */
import React, { useContext, useState } from 'react'
import Button from '@mui/material/Button';
import csvInstr from '../assets/csvInstructionsFormat.png';
import Papa from "papaparse";
import { Grid } from '@mui/material';
import UploadContext from "../contexts/UploadContext";
import FileUploadIcon from '@mui/icons-material/FileUpload';

/** UPLOAD .CSV FILE FUNCTION */
// this function uses code from [7] https://medium.com/how-to-react/how-to-parse-or-read-csv-files-in-reactjs-81e8ee4870b0 to parse the data in the .csv file
function UploadCSV() {
  /** 
  component which prompts the user to upload a .csv file
  Returns:
    (component) : UploadCSV component
  */

  // VARIABLES
  const [file, setFile] = useState();
  const [array, setArray] = useState([]);
  const {staffArrayValue} = useContext(UploadContext);
  const [, setStaffArray] = staffArrayValue;
  const [uploadColour, setUploadColour] = useState("#5790FF"); // change the colour when a .csv file is uploaded

  // when a .csv file is uploaded
  const handleOnChange = (e) => {
    setUploadColour("#57DB64"); // change the colour
    
    // take the information from the .csv file
    setFile(e.target.files[0]);
    Papa.parse(e.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function(results) {
        setStaffArray(results.data);
      },
    });
  };

  // display the .csv file upload page
  return (
    <Grid container flexGrow xs={12} minHeight='100vh' bgcolor='#34363D' justifyContent="center" alignItems="center">
      <Grid 
        item 
        container
        borderRadius='0.9375rem' 
        alignContent='center' 
        alignItems='flex-start'
        backgroundColor='#26272B'
        justifyContent='space-evenly'

        style={{top: '0', bottom: '0', left: '0', right: '0', position: 'absolute', width: 'auto', height: 'auto', marginTop: '4rem', marginBottom: '4rem', marginRight: '4rem', marginLeft: '4rem'}}
      >
        <Grid 
          item 
          container
          borderRadius='0.9375rem' 
          alignContent='center' 
          alignItems='flex-start'
          backgroundColor='#212121'
          justifyContent='space-evenly'

          style={{top: '0', bottom: '0', left: '0', right: '0', position: 'absolute', width: 'auto', height: 'auto', marginTop: '4rem', marginBottom: '4rem', marginRight: '4rem', marginLeft: '4rem', padding: '0rem'}}
        >
          {/* .csv file upload */}
          <div style={{ textAlign:"center"}}>
            <label htmlFor="csvFileInput">
              <input style={{ display: "none" }}
                type = "file"
                accept = ".csv"
                id = "csvFileInput"
                onChange = {handleOnChange}
              />
              <Button
                variant = "contained"
                startIcon = {<FileUploadIcon />}
                component = "span"
                sx={{
                  position: 'absolute',
                  left: '40%',
                  top: '3.3rem',
                  fontFamily: 'sans-serif',
                  color: '#010101',
                  fontSize: '1.875rem',
                  borderRadius: '100px',
                  paddingX: '3.3125rem',
                  paddingY: '0.01rem',
                  backgroundColor: uploadColour,
                  textTransform: 'none',
                  height: "4.5rem",
                  svg: {width: "3rem", height: "3rem", marginLeft: "-0.5rem", marginRight: "0.5rem"}
                }}
              >
                Upload CSV
              </Button>
            </label>
            <br />
          </div>

          {/* image with the format/instructions */}
          <img 
            src={csvInstr} 
            alt="CSV Format Instructions" 
            style={{
              width:"70%"
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default UploadCSV;