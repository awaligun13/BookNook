import styles from "../styles/Shelf.module.css"

export default function Shelf(){
 return (
 <div className={styles.page}>
        <div className={styles.topShelf}></div>

        <div className={styles.middleShelf}>
            {/* your shelf content goes here */}
        </div>

        <div className={styles.bottomShelf}></div>
    </div>
 );
}