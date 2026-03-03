import styles from "../../styles/Reviews.module.css";
import {useState, useEffect} from "react";
import { auth } from "../../library/firebaseConfig";
import {getDocument} from "../../library/UserDoc";

export default function Reviews(){

    const [reviews, setReviews] = useState([]);
    
    useEffect (() => {
            const getUser = async () => {
                const user = auth.currentUser;
                const data = await getDocument("users", user.uid);
                setReviews(data.reviews || []);
            }
            getUser();
            }, []);
    
    return (
        <div>
            <h1>Reviews</h1>
            <div className = {styles.reviewBox}>
        
                {reviews.length === 0 ? (<p>No Reviews Yet</p>) : (
                reviews.map((reviews, index) => (
                    <div key = {index} className = {styles.singleReview}>
                        <h2>{reviews.bookTitle}<small>{reviews.date}</small></h2>
                        <h2>{reviews.rating}⭐/5</h2>
                        <p>{reviews.reviewText}</p>
                    </div>
                ))
            )}
            </div>
            
        </div>
        
    );
}