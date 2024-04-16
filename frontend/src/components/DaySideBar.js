import {useState} from "react";
import { Box, Divider, FormControl, MenuItem, Select, Stack } from "@mui/material";

function DaySideBar({cellValue, dayTypes}) {
  const [dayType, setDayType] = useState(dayTypes);

  // const styles = theme => ({
  //   blueColour: {
  //     color: "#5790FF"
  //   }
  // })

  const dayTypeChange = (event) => {
    setDayType(event.target.value);
  }

  return (
      <Box
        width='100%'
        height="100%"
        display='flex'
      //   alignItems='flex-start'
        flexDirection= 'column'
      >
          <p style={{color: "#C1D6FF", fontSize: "2rem", marginLeft: "2.5rem", marginTop:"4.3rem", marginBottom: "1rem", paddingBottom: "0rem"}}>{cellValue}</p>
          {/* <p style={{fontSize: "2rem", marginLeft: "1.2rem", marginTop: "0rem", paddingTop: "0rem", color: "#80828A"}}>________________________ </p> */}
          <Divider sx={{background: "#55575E", borderBottomWidth: 2}}/>
          <Stack direction="horizontal">
            <p style={{color: "#80828A", marginLeft: "1.5rem", fontSize: "1.7rem", marginTop: "0.8rem"}}>Day Type:</p>
            <FormControl variant="standard" >
              <Select
                id="day-type"
                value={dayType}
                onChange={dayTypeChange}
                class={{
                  root: '#5790FF'
                }}
                // color="#5790FF"
                // color="#5790FF"
              >
                <MenuItem value={"School"}>School</MenuItem>
                <MenuItem value={"PA Day"}>PA Day</MenuItem>
                <MenuItem value={"Holiday"}>Holiday</MenuItem>
              </Select>
            </FormControl>
          </Stack>
      </Box>

    )
}

export default DaySideBar;