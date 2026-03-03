//this is my reading room. I set the timer and background here and access the database to add new reading logs. It measures time read and pages read within that time.
//I thought it would be cool to compare those stats to see how quick or effective reading can really be. I have buttons to start, stop, and reset the timers. starting
//just intiializes the pages_popup, and then the timer starts after the pages are submitted. then, when hit stop, the pages pop is called again and the difference is stored
//in the database along with the time and date.

import styles from "../../styles/ReadingRoom.module.css"
import {useState, useRef, useEffect} from "react";
import Pages_Popup from "./pages_popup";
import {getDocument, addToDocumentArray} from "../../library/UserDoc";
import { auth } from "../../library/firebaseConfig";

export default function Reading_Room(){

    const [userData, setUserData] = useState(null);

    const [seconds, setSeconds] = useState(0)
    const interval = useRef(null)

    const [showPopup, setShowPopup] = useState(false);
    const pageStart = useRef(0);

    useEffect (() => {
        const getUser = async () => {
          const user = auth.currentUser;
          const data = await getDocument("users", user.uid);
          setUserData(data);
          }
          getUser();
          }, []);

    const getStartPage = () => {
        if (interval.current) { 
            return;
        }
        setShowPopup(true); 
    };
    const startTimer = (startingPage) =>{
        pageStart.current = startingPage;
        interval.current = setInterval(() => {
            setSeconds((prev) => prev + 1);
        }, 1000);
    }
    const stopTimer = () => {
        clearInterval(interval.current);
        interval.current = null;
        setShowPopup(true);
    }

    const handlePageSubmit = async (page) => {
        setShowPopup(false);
        const user = auth.currentUser;

        if (!interval.current && seconds>0){
            const pagesRead = page - pageStart.current;

            if (pagesRead > 0){
                const newEntry = {pages: pagesRead, timeSpent: seconds, date: new Date()};
                await addToDocumentArray("users", user.uid, "readingLog", newEntry);
                setUserData(prev => ({
                ...prev,
                readingLog: [...(prev.readingLog || []), newEntry]
            }));
            }
            setSeconds(0);
        }else{
            startTimer(page);
        }
    };

    const resetTimer = () => {
        clearInterval(interval.current);
        interval.current=null;
        setSeconds(0);
    }

    return(
        <div className = {styles.background}>
            <div className = {styles.box}>
                <h2>{String(Math.floor(seconds/60)).padStart(2, "0")}:
                    {String(seconds % 60).padStart(2, "0")}
                </h2>
                <div className = {styles.buttons}>
                <button onClick={getStartPage}>Start</button>
                <button onClick={stopTimer}>Stop</button>
                <button onClick={resetTimer}>Reset</button>
                </div>
            </div>
            {showPopup && <Pages_Popup onSubmit={handlePageSubmit} />}
        </div>
        
    );
}