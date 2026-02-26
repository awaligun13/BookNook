import styles from "../../styles/Reviews.module.css";
import {useState, useEffect} from "react";

export default function Reviews(){

    return (
        <div>
            <hi>Reviews</hi>
            <body className = {styles.reviewBox}></body>
        </div>
    );
}