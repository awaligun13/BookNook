//i thought it would be easier to have each part of the profile be its own peice, since they each had a lot going on. This is just the entire page put together

import Profile from "./profile_info";
import ReadingStats from "./stats_info";
import Reviews from "./reviews_info";
import styles from "../../styles/FullProfile.module.css";

export default function ProfileCard(){
    return(
        <div className = {styles.profileContainer}>
            <Profile />
            <ReadingStats />
            <Reviews />
        </div>
    );
}

