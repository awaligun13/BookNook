import styles from "../../styles/SearchBox.module.css";
import {getDocument, addToDocumentArray} from "./UserDoc";
import { auth } from "../library/firebaseConfig";
import {useState, useEffect} from "react";

export default function BookDetails({book, onClose}){
    const bookInfo = book.volumeInfo || book.bookData || {};

    const [userData, setUserData] = useState(null);
    
    useEffect (() => {
        const getUser = async () => {
            const user = auth.currentUser;
            const data = await getDocument("users", user.uid);
            setUserData(data);
        }
        getUser();
    }, []);

    const addBook = async() =>{
        const user = auth.currentUser;
        const newEntry = {bookData : bookInfo};

        await addToDocumentArray("users", user.uid, "books", newEntry);
        setUserData(prev => ({
            ...prev, books: [...(prev?.books || []), newEntry]
        }))
    }


    return(
        <div className = {styles.overlay}>
            <div className = {styles.box}>
                <div className = {styles.bookInfo}>
                    <div className = {styles.stats}>
                        {bookInfo.imageLinks?.thumbnail && (<img src={bookInfo.imageLinks.thumbnail} alt={bookInfo.title} className = {styles.bookCover}/>)}
                        <button onClick = {onClose}>Return</button>
                        <h1>{bookInfo.title}</h1>
                        <h2>{bookInfo.authors}</h2>
                        <h2>{bookInfo.publishedDate}</h2>
                    </div>
                    <div className = {styles.bio}>
                        <p>{bookInfo.description || "No description availible"}</p>
                        <button onClick = {addBook}>Add Book</button>
                    </div>
                </div>
            </div>
        </div>

    )
}
