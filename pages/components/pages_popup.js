//this is a popup that is used in the reading room. it is only used to get the number of pages the user inputs, and is how I tracked the number of pages read per reading session.
//this is called at the start and end of each reading session to get start and end page number, but this is just the component that appears as a way to insert the number

import { useState } from "react";
import styles from "../../styles/ReadingRoom.module.css"

export default function Pages_Popup({onSubmit}){

    const [pageNumber, setPageNumber] = useState(0);

    const Submit = () =>{
        onSubmit(parseInt(pageNumber,10));
    };

    return(
        <div className = {styles.overlay}>
            <div className = {styles.box}>
                <h1>Page Number:</h1>
                <input
                    type="number"
                    placeholder="Page Number"
                    value={pageNumber}
                    onChange ={(e) => setPageNumber(e.target.value)}
                />
                <button onClick={Submit}>Submit</button>
            </div>
        </div>
    )
}