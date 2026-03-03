import styles from "../styles/Shelf.module.css"
import Image from "next/image"
import { useState, useEffect } from "react";
import SearchBox from "./components/SearchBox";
import {searchBooks} from "../library/googleBooks";
import { auth } from "../library/firebaseConfig";
import { getDocument, removeFromDocumentArray, setDocument} from "../library/UserDoc";
import BookDetails from "./components/book_details_popup";
import ReviewPopup from "./components/review_popup";

export default function Shelf(){

    const [open, setOpen] = useState(false);
    const [showSearchBox, setShowSearchBox] = useState(false);
    const [books, setBooks] = useState([]);
    const [savedBooks, setSavedBooks] = useState([]);
    const [userData, setUserData] = useState(null);
    const [selectedBook, setSelectedBook] = useState(null);
    const [removeMode, setRemoveMode] = useState(false);
    const [selectFavorite, setSelectFavorite] = useState(false);
    const [writeReview, setWriteReview] = useState(false);

    const booksPerShelf = 7;
    const defaultShelves = 3;

    useEffect (() => {
        const getUser = async () => {
            const user = auth.currentUser;
            const data = await getDocument("users", user.uid);
            setUserData(data);
            setSavedBooks(data.books || []);
        }
        getUser();
        }, []);
    function shelvesBooks(booksArray, perShelf){
        const shelves = [];
        for (let i = 0; i < booksArray.length; i += perShelf){
            shelves.push(booksArray.slice(i, i + perShelf))
        }
        return shelves;
    }
    const buildShelfs = () => {
        const getBooksOnShelf = shelvesBooks(savedBooks, booksPerShelf);
        const totalShelves = Math.max(getBooksOnShelf.length, defaultShelves);

        const allShelves = [];
        for (let i = 0; i < totalShelves; i++){
            allShelves.push(getBooksOnShelf[i] || []);
        }
        return allShelves;
    }
    const toggleMenu = () => setOpen(!open);

    const handleSearch = async (query) => {
        const results = await searchBooks(query);
        setBooks(results);
        const data = await getDocument("users", user.uid);
        setSavedBooks(data.books || []);
    }

    const removeBook = async(book) => {
        const user = auth.currentUser;
        await removeFromDocumentArray("users", user.uid, "books", book);
        const data = await getDocument("users", user.uid);
        setSavedBooks(data.books || []);
        setRemoveMode(false);
    }
    
    const pickFavoriteBook = async(book) => {
        const user = auth.currentUser;
        const data = await getDocument("users", user.uid);
    
    }
    const shelves = buildShelfs();
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
                <button onClick={() => setRemoveMode(prev => !prev)}> {removeMode ? "Cancel Remove" : "Remove"}</button>
                <button onClick={() => setSelectFavorite(prev => !prev)}> {selectFavorite ? "Cancel Selection" : "Select Favorite"}</button>
                <button onClick={() => setWriteReview(prev => !prev)}> {writeReview ? "Cancel" : "Write Review"}</button>
            </div>
        </div>
        {selectedBook && writeReview && (
            <ReviewPopup book={selectedBook} onClose={() => {setSelectedBook(null), setWriteReview(false);}}/>
        )}
        {showSearchBox && (
            <SearchBox onSearch = {handleSearch} close={() => setShowSearchBox(false)}/>
        )}
        {selectedBook && !writeReview && (
            <BookDetails book={selectedBook} onClose={() => setSelectedBook(null)}/>
        )}
        {removeMode && <p style={{color: "red"}}>Click a book to remove it!</p>}

        {shelves.map((shelfBooks, shelfIndex) => (
            <div className = {styles.Shelf}>
                <div className={styles.insideShelf}>
                    {shelfBooks.map((book, bookIndex) => {
                    const info = book?.bookData;

                    const handleClick = () => {
                        if (removeMode) {
                            removeBook(book);
                        } else if (selectFavorite) {
                            pickFavoriteBook(book);
                        }else if (writeReview){
                            setSelectedBook(book);
                        } else {
                            setSelectedBook(book);
                        }
                    };
    
                    return info ? (
                        <div className={styles.bookItem} onClick={handleClick} style ={{cursor:"pointer"}}>
                            {info.imageLinks?.thumbnail ? (
                            <img src={info.imageLinks.thumbnail}/>
                            ) : (
                            <div className={styles.placeholder}>No Image</div>
                                )}
                        </div>
                        ) : (
                        <div className={styles.bookItem}>
                            <div className={styles.placeholder}>No Data</div>
                                <h4>No Title</h4>
                            </div>
                        );
                    })}
                </div>
            </div>
        ))}
    </div>
 );
}