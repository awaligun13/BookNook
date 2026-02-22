import styles from "../styles/Shelf.module.css"
import Image from "next/image"
import { useState } from "react";

export default function Shelf(){
    const [open, setOpen] = useState(false);
    const toggleMenu = () => setOpen(!open);
 return (
    <div className={styles.page}>
        <div className = {styles.menuContainer}>
            <button className={`${styles.addButton} ${open ? styles.open: ""}`}
                onClick= {toggleMenu}>
                <Image src = "/menu.png"
                    alt = "open Menu" 
                    width={40}
                    height={40}
                />
             </button>
             <div className={`${styles.menuButtons} ${open ? styles.open : ""}`}>
                <button>Add Book</button>
                <button>Remove Book</button>
            </div>
        </div>
        <div className={styles.topShelf}></div>

        <div className={styles.Shelf}></div>

        <div className={styles.Shelf}></div>
    </div>
 );
}