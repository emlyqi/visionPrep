import React, { useState } from "react";
import { Stack, Box } from '@mui/material';
import TimeRangePicker from '@wojtekmaj/react-timerange-picker';
import '@wojtekmaj/react-timerange-picker/dist/TimeRangePicker.css';
import 'react-clock/dist/Clock.css';


function SelectDuties() {
  const [value, onChange] = useState(["00:00:00","00:00:00"]);

  return (
    <div>
      <TimeRangePicker onChange={onChange} value={value} />
    </div>
  );
}

export default SelectDuties;