"use client";

import { useEffect, useState } from "react";
import { auth, db } from "../library/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import styles from "../../styles/EditProfilePopUp.module.css";
import getUserData from "../hooks/getUserData";

export default function EditProfilePopUp({ onClose }) {

    const { user, userData, loading } = getUserData();
    const [username, setUsername] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [bio, setBio] = useState("");

    useEffect(() => {
    if (userData) {
      setUsername(userData.username || "");
      setDisplayName(userData.displayName || "");
      setBio(userData.bio || "");
    }
  }, [userData]);

    const handleSave = async () => {
        try{
            const user = auth.currentUser;
            if (!user) return;
            const docRef = doc(db, "users", user.uid);
            await updateDoc(docRef, {
                username: username,
                displayName: displayName,
                bio: bio
            });
            alert("Profile updated!");
            onClose();
        } catch (error){
            console.error("Error updating profile", error);
        }
    };
    if (loading) return <p>Loading...</p>;
    if (!userData) return <p>No user data found.</p>;
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
                <button className={styles.saveChanges} onClick={handleSave}>Save Changes</button>
            </div>
        </div>
    );
}