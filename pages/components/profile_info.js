import Image from "next/image";
import styles from "../../styles/ProfileInfo.module.css"


export default function Profile() {
  return (
    <div className= {styles.profile_card}>
        <Image
            className={styles.profile_picture}
            src="/profile.jpg"   // put image in public folder
            alt="Profile picture"
            width={150}
            height={150}
        />
        <div className = {styles.text_info}>
            <h1 className="displayname">Display Name</h1>
            <h2 className="username">@username</h2>
            <h3 className="favoritebook">Favorite Book</h3>

            <p className="bio">Add to your bio!</p>
        </div>
    </div>
  );
}