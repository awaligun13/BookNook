"use client";

import Image from "next/image";
import profilePic from "../../public/IMG_9263.png";
import styles from "../../styles/ProfileInfo.module.css";
import {useState } from "react";
import useUserData from "../hooks/getUserData";
import EditProfilePopUp from "../components/edit_profile_popup";


export default function Profile() {
  const { user, userData, loading } = useUserData();
  const [showPopup, setShowPopup] = useState(false);

  if (loading) return <p>Loading...</p>;
  if (!userData) return <p>No user data found.</p>;

  return (
    <>
      <div className={styles.profile_card}>
        <Image
          className={styles.profile_picture}
          src={profilePic}
          alt="Profile picture"
          width={150}
          height={150}
        />
        <div className={styles.text_info}>
          <h1>
            {userData.displayName}
            <button onClick={() => setShowPopup(true)}>
              Edit Profile
            </button>
          </h1>
          <h2>@{userData.username}</h2>
          <h3>Favorite Book</h3>
          <p>{userData.bio || "Add to your bio!"}</p>
        </div>
      </div>
      {showPopup && (
        <EditProfilePopUp onClose={() => setShowPopup(false)} />
      )}
    </>
  );
}