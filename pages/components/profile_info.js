"use client";

import Image from "next/image";
import styles from "../../styles/ProfileInfo.module.css";
import {useState, useEffect } from "react";
import EditProfilePopUp from "../components/edit_profile_popup";
import { auth } from "../library/firebaseConfig";
import {getDocument} from "./UserDoc";
import ProfilePicturePopup from "./profile_pic_popup";

export default function Profile() {

  const [showPopup, setShowPopup] = useState(false);
  const [showPicPopup, setShowPicPopup] = useState(false); 
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const user = auth.currentUser;
      if (!user) {
        setLoading(false);
        return;
      }

      const data = await getDocument("users", user.uid);
      setUserData(data);
      setLoading(false);
    }

    getUser();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!userData) return <p>No user data found.</p>;

  return (
    <div>
      <div className={styles.profile_card}>
        <Image
          className={styles.profile_picture}
          src={userData.profilePic}
          width={150}
          height={150}
        />
        <div className={styles.text_info}>
          <h1>
            {userData.displayName}
            <button  className = {styles.editProfile} onClick={() => setShowPopup(true)}>
              Edit Profile
            </button>
            <button className = {styles.editProfile} onClick = {() => setShowPicPopup(true)}>Change Profile Pic</button>
          </h1>
          <h2>@{userData.username}</h2>
          <h3>Favorite Book</h3>
          <p>{userData.bio || "Add to your bio!"}</p>
        </div>
      </div>
      {showPopup && (
        <EditProfilePopUp onClose={() => setShowPopup(false)} />
      )}
      {showPicPopup && (
        <ProfilePicturePopup onClose={() => setShowPicPopup(false)} />
      )}
    </div>
  );
}