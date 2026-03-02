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