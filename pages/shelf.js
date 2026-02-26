import styles from "../styles/Shelf.module.css"
import Image from "next/image"
import { useState } from "react";
import SearchBox from "./components/SearchBox";
import {searchBooks} from "./library/googleBooks";

export default function Shelf(){
    const [open, setOpen] = useState(false);
    const [showSearchBox, setShowSearchBox] = useState(false);
    const [books, setBooks] = useState([]);

    const toggleMenu = () => setOpen(!open);

    const handleSearch = async (query) => {
        const results = await searchBooks(query);
        setBooks(results);
    }

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
                <button onClick ={() => setShowSearchBox(true)}>Add</button>
                <button>Remove</button>
            </div>
        </div>
        {showSearchBox && (
            <SearchBox 
                onSearch = {handleSearch}
                close={() => setShowSearchBox(false)}
            />
        )}
        <div className={styles.topShelf}></div>

        <div className={styles.Shelf}></div>

        <div className={styles.Shelf}></div>
    </div>
 );
}