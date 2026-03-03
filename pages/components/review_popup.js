//this is my popup for writing a review. it 
import { useState, useEffect } from "react";
import { auth } from "../../library/firebaseConfig";
import styles from "../../styles/Reviews.module.css";
import {getDocument, addToDocumentArray} from "../../library/UserDoc";

export default function ReviewPopup({book, onClose}){
    
    const [userData, setUserData] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState("");
        
    useEffect (() => {
        const getUser = async () => {
            const user = auth.currentUser;
            const data = await getDocument("users", user.uid);
            setUserData(data);
            setReviews(data.reviews || []);
            }
        getUser();
    }, []);
    const addReview = async() => {
        if (!rating || !reviewText.trim()){
            return;
        }
        const user = auth.currentUser;
        const newReview = {
            bookCover: book.bookData.imageLinks.thumbnail,
            bookTitle: book.bookData.title,
            rating,
            reviewText,
            date: new Date().toISOString(),
        }
        await addToDocumentArray("users", user.uid, "reviews", newReview);
        onClose();
    }
        
        return(
            <div className = {styles.overlay}>
                <div className = {styles.box}>
                    <div className = {styles.userInput}>
                        <h1>Review: {book.bookData.title}</h1>
                        <h2><input type="number" min="0" max="5" value= {rating} onChange ={(e) => setRating(e.target.value)}/>★</h2>
                        <textarea placeholder = "Write your review..." value = {reviewText} onChange={(e) => setReviewText(e.target.value)}/>
                   </div>
                    <button onClick={addReview}>Submit Review</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        )
}