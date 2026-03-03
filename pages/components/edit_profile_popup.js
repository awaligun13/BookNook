//this is another popup that appear in the middle of the screen when a button is clicked.
//this one accesses the users data in the database, and allows the username, displayname, and bio to be changed

"use client";

import { useEffect, useState } from "react";
import { auth } from "../../library/firebaseConfig";
import {getDocument, setDocument} from "../../library/UserDoc";
import styles from "../../styles/EditProfilePopUp.module.css";


export default function EditProfilePopUp({ onClose }) {

    const [username, setUsername] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [bio, setBio] = useState("");

    useEffect (() => {
        const getUser = async () => {
        const user = auth.currentUser;
        const data = await getDocument("users", user.uid);
        if (data){
            setUsername(data.username || "");
            setDisplayName(data.displayName || "");
            setBio(data.bio || "");
        }
    }
    getUser();
    }, []);

    const saveChanges = async() => {
        const user = auth.currentUser;
        await setDocument("users", user.uid, { username, displayName, bio});
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.box}>
                <button className ={styles.close} onClick={onClose}>X</button>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Display Name"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                />
                <input 
                    className={styles.bio}
                    type="text"
                    placeholder="Bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                />
                <button className={styles.saveChanges} onClick={saveChanges}>Save Changes</button>
            </div>
        </div>
    );
}