import React, { useState } from "react";
import { Stack, Box } from '@mui/material';
import TimeRangePicker from '@wojtekmaj/react-timerange-picker';
import '@wojtekmaj/react-timerange-picker/dist/TimeRangePicker.css';
import 'react-clock/dist/Clock.css';
import EligibleStaff from '../components/EligibleStaff';
import UploadContext from  "../contexts/UploadContext";


function SelectDuties() {
  // const [value, onChange] = useState(["00:00:00","00:00:00"]);
  const [duties, setDuties] = useState(["caf1","caf2","library"]);

  return (
    <UploadContext.Provider

      value={{
        dutiesValue: [duties, setDuties]
      }}
    >

      {/* <TimeRangePicker onChange={onChange} value={value} /> */}
      <EligibleStaff/>
      {/* <SelectDuties /> */}
      {/* <SelectDuties duties={duties} /> */}
    </UploadContext.Provider>
  );
}

export default SelectDuties;