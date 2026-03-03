//this is all the user information that is shown on the profile page. I accessed profile picture, username, displayname, bio, and favorite book all here, and then display it
//I also included buttons to edit the information shown. I call my edit profile popup and my proofile picture popup
"use client";

import Image from "next/image";
import styles from "../../styles/ProfileInfo.module.css";
import {useState, useEffect } from "react";
import EditProfilePopUp from "../components/edit_profile_popup";
import { auth } from "../../library/firebaseConfig";
import {getDocument} from "../../library/UserDoc";
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
          <h1 className = {styles.buttonRow}>
          <button  className = {styles.editProfile} onClick={() => setShowPopup(true)}>
              Edit Profile
            </button>
            <button className = {styles.editProfile} onClick = {() => setShowPicPopup(true)}>Change Profile Pic</button>
          </h1>
          <h1>
            {userData.displayName}
          </h1>
          <h2>@{userData.username}</h2>
          <p>{userData.bio || "Add to your bio!"}</p>
          
          <div className = {styles.favorite}>
          <h3>Favorite Book</h3>
          {userData.favoriteBook.bookData.imageLinks?.thumbnail && (
                <img
                  src={userData.favoriteBook.bookData.imageLinks.thumbnail}
                  alt={userData.favoriteBook.bookData.title || "Favorite Book"}
                />
              )}
              <p>{userData.favoriteBook.bookData.title || "No title available"}</p>
          </div>
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