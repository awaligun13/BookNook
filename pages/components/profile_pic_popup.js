//this is my popup to change the profile picture. I wasnt sure how to have a user uploaded photo, and how to access a user camera library or anything.
//so I just generated 2 default profile pictures and automatically se it to one, but it can be changed anytime. it is a popup with each picture, you just click
//the one you want as the profile picture and it is set in the database

import {useState, useEffect} from "react";
import {getDocument, setDocument} from "./UserDoc";
import { auth } from "../library/firebaseConfig";
import styles from "../../styles/ProfilePicPopup.module.css";

export default function ProfilePicturePopup({onClose}){

        const [profilePicture, setProfilePicture] = useState(null);
        const [user, setUser] = useState(null);

        useEffect (() => {
                const getUser = async () => {
                    const user = auth.currentUser;
                    const data = await getDocument("users", user.uid);
                    setUser(data);
                    setProfilePicture(data.profilePic || "/girl.png");
                }
                getUser();
                }, []);

        const changeProfilePicture = async(selection) => {
            const user = auth.currentUser;
            await setDocument("users", user.uid , {profilePic: selection});
            setProfilePicture(selection || []);
            onClose();
        }
    return (
        <div className = {styles.overlay}>
            <div className = {styles.box}>
                <h2>Select Profile Picture</h2>
                <div className ={styles.images}>
                    <img src="/girl.png" onClick={() => changeProfilePicture("/girl.png")} />                
                    <img src = "/boy.png" onClick = {() => changeProfilePicture("/boy.png")}/>
                </div>
            </div>
        </div>
    )
}