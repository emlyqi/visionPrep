import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import csvInstructions from '../assets/csvInstructions.png';
import csvInstr from '../assets/csvInstr.png';
import Papa from "papaparse";
import { Grid } from '@mui/material';
import UploadContext from "../contexts/UploadContext";
import FileUploadIcon from '@mui/icons-material/FileUpload';

function UploadCSV() {
  const [file, setFile] = useState();
  const [array, setArray] = useState([]);

  const fileReader = new FileReader();

  const {staffArrayValue} = useContext(UploadContext);
  const [, setStaffArray] = staffArrayValue;

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
    Papa.parse(e.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function(results) {
        setStaffArray(results.data);
      },
    });
  };

  // const csvFileToArray = string => {
  //   const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
  //   const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

  //   const array = csvRows.map(i => {
  //     const values = i.split(",");
  //     const obj = csvHeader.reduce((object, header, index) => {
  //       object[header] = values[index];
  //       return object;
  //     }, {});
  //     return obj;
  //   });

  //   setArray(array);
  // };

  // const handleOnSubmit = (e) => {
  //   e.preventDefault();

  //   if (file) {
  //     fileReader.onload = function (event) {
  //       const text = event.target.result;
  //       // csvFileToArray(text);
  //     };

  //     fileReader.readAsText(file);
  //   }
  // };

  // const changeHandler = (e) => {
  //   Papa.parse(e.target.files[0], {
  //     header:true,
  //     skipEmptyLines:true,
  //     complete:function(results){
  //       console.log(results.data)
  //     },
  //   });
  // }

  // const headerKeys = Object.keys(Object.assign({}, ...array));

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
        {/* <div style={{ marginTop: '2rem', marginBottom: '2rem', marginRight: '4rem', marginLeft: '4rem', width: 'auto', height: 'auto', position: 'absolute'}}> */}
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
                  left: '36%',
                  top: '3.3rem',
                  fontFamily: 'sans-serif',
                  color: '#010101',
                  fontSize: '1.875rem',
                  borderRadius: '100px',
                  paddingX: '3.3125rem',
                  paddingY: '0.01rem',
                  backgroundColor: '#5790FF',
                  textTransform: 'none',
                  height: "4.5rem",
                  svg: {width: "3rem", height: "3rem", marginLeft: "-0.5rem", marginRight: "0.5rem"}
                }}
              >
                Upload CSV
              </Button>
            </label>
              {/* <form style={{ }}>
                <input
                  style={{ position:"absolute",  left:"50%", top:"11.25rem", transform:"translate(-50%, -50%)", display:"block"}}
                  type={"file"}
                  id={"csvFileInput"}
                  accept={".csv"}
                  onChange={handleOnChange}
                /> */}

            {/* <Button
              sx={{ 
                position:"absolute",
                left:"50%",
                top:"11.25rem",
                transform:"translate(-50%,50%)",
                display:"block",
                backgroundColor:"#212121",
                color:"#80828A",
                padding:"0",
                ":hover": {
                  textDecoration:"underline"
                },
              }}
              onClick={(e) => {
                handleOnSubmit(e);
              }}
            >
              Import CSV
            </Button> */}
          {/* </form> */}

              <br />

              {/* <table>
                <thead>
                  <tr key={"header"}>
                    {headerKeys.map((key) => (
                      <th>{key}</th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {array.map((item) => (
                    <tr key={item.id}>
                      {Object.values(item).map((val) => (
                        <td>{val}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table> */}

            </div>

            {/* <img src={csvInstructions} alt="CSV Format Instructions" /> */}
            <img src={csvInstr} alt="CSV Format Instructions" height="500rem" width="900rem"/>
        {/* </div> */}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default UploadCSV;