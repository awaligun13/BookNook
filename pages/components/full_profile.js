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

