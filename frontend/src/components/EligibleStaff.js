import React, { useContext } from "react";
import UploadCSV from "../components/Upload";
import SelectDuties from "../components/SelectDuties";
import UploadContext from "../contexts/UploadContext";

function EligibleStaff(props) {
    const {dutiesValue} = useContext(UploadContext);
    const [, setDuties] = dutiesValue;

    // const duties = props.duties;
    // const dutiesList = dutiesValue.map((duty, index) => (
    //     <li key={index}>
    //         {duty}
    //     </li>
    // ));
    return(
        // <ul>{dutiesList}</ul>
        <main>
            <ul>
                {dutiesValue.map((duty, index) => (
                    <li key={index}>
                        {duty}
                    </li>
                ))}
            </ul>
        </main>
    );
}

export default EligibleStaff;