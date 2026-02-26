import styles from "../../styles/ReadingRoom.module.css"
import {useState, useRef} from "react";
import { auth, db } from "../library/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import getUserData from "../hooks/getUserData";

export default function Reading_Room(){
    
    const { user, userData, loading } = getUserData();
    const [seconds, setSeconds] = useState(0)
    const interval = useRef(null)

    const startTimer = () => {
        if (interval.current) {
            return;
        }

        interval.current = setInterval(() => {
            setSeconds((prev) => prev + 1);
        }, 1000);
    };

    const stopTimer = () => {
        clearInterval(interval.current);
        interval.current = null;
    };

    const resetTimer = () => {
        clearInterval(interval.current);
        interval.current=null;
        setSeconds(0);
    }

    return(
        <div className = {styles.background}>
            <div className = {styles.timer_box}>
                <h2>{String(Math.floor(seconds/60)).padStart(2, "0")}:
                    {String(seconds % 60).padStart(2, "0")}
                </h2>
                <div className = {styles.buttons}>
                <button onClick={startTimer}>Start</button>
                <button onClick={stopTimer}>Stop</button>
                <button onClick={resetTimer}>Reset</button>
                </div>
            </div>
        </div>
    );
}