import React, { useState } from 'react'
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
import CSVFormat from '../assets/CSVFormat.png';
import Papa from "papaparse";

function UploadCSV() {
  const [file, setFile] = useState();
  const [array, setArray] = useState([]);

  const fileReader = new FileReader();

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
    Papa.parse(e.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function(results) {
        console.log(results.data)
      },
    });
  };

  const csvFileToArray = string => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    const array = csvRows.map(i => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });

    setArray(array);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        csvFileToArray(text);
      };

      fileReader.readAsText(file);
    }
  };

  // const changeHandler = (e) => {
  //   Papa.parse(e.target.files[0], {
  //     header:true,
  //     skipEmptyLines:true,
  //     complete:function(results){
  //       console.log(results.data)
  //     },
  //   });
  // }

  const headerKeys = Object.keys(Object.assign({}, ...array));

  return (
    <div>
      <div style={{ textAlign:"center"}}>
        <form style={{ }}>
          <input
            style={{ position:"absolute",  left:"50%", top:"32%", transform:"translate(-50%, -50%)", display:"block"}}
            type={"file"}
            id={"csvFileInput"}
            accept={".csv"}
            onChange={handleOnChange}
          />

          <Button
            sx={{ 
              position:"absolute",
              left:"50%",
              top:"32%",
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
          </Button>
        </form>

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
      <img src={CSVFormat} alt="CSV Format" />
    </div>
  );
}

export default UploadCSV;