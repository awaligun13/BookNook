"use client";
import logo from "./assets/Copilot_20260212_200919.png";
import Image from "next/image";
import decor from "./assets/Copilot_20260217_124729.png";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import {useState, useEffect} from "react";
import bio from "../public/IMG_9263.png";
import { searchBooks } from "./library/googleBooks";

export default function Home() {

  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function getBooks(){
      const newBooks = await searchBooks("subject:fiction&printType=books&orderBy=relevance&langRestrict=en");
      setBooks(newBooks);
    }
    getBooks();
  }, []);

  return (
    <div className = {styles.home_page}>
      <div className = {styles.top}>
        <div className = {styles.logo}>
          <Image src = {decor}/>
          <Image src = {logo} />
          <Image className = {styles.left} src = {decor}/>
        </div>
        <div className = {styles.getStarted}>
          <Link href = "./profile"> Get Started!</Link> 
        </div>
      </div>

      <div className={styles.information}>
        <h1 className = {styles.firstRead}>Find your first read now!</h1>

      <div className = {styles.bookRow}>
        {books.map((book) =>{
          const info = book.volumeInfo;
          return (
            <a
              key={book.id}
              href={info.previewLink || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.bookCard}
            >
              {info.imageLinks?.thumbnail ? (
                <Image
                  src={info.imageLinks.thumbnail}
                  alt={info.title}
                  width={120}
                  height={180}
                />
              ) : (
                <div className={styles.noImage}>No Image</div>
              )}
            </a>
          );
        })}
      </div>
        <div className ={styles.bottomRow}>
          <div className ={styles.leftColumn}>
            <h1 className = {styles.question}>What is BookNook?</h1>
            <p>BookNook is a place for readers to track their reading stress-free. 
              Tired of overwhelming book apps that never feel personalized, BookNook was
              created to make books about what they should be: reading. Instead of focusing on 
              reading the most books and reading the most popular books, BookNook seeks to grow 
              reading skills and enjoyment. Personalized stats show progress and commitment to reading,
              encouraging more pages read and time spent reading. Personal bookshelves and reviews
              allow a reader to keep track of their books and how much they enjoyed reading them.
            </p>
           </div> 
          <div className = {styles.creator}>
              <Image src = {bio}/>
              <p>Hi, my name is Ava Waligun! I am a 20 year old computer science major
                at Penn State University. BookNook is my passion project I am making as an
                assignment for my Cmpsc 263 course where I am learning web development.
                I am excited to be learning how to use so many new tools and expand my skill set
                as a student and engineer. My favorite color is purple, can you tell, and I
                have 2 cats. I hope you enjoy BookNook!
              </p>
          </div>
          </div>
        <div className ={styles.bottom}>
          <hr></hr>
          <p> ©fakecopyright2025</p>
          <Image src = {logo} /> 
          <p>BookNook by Ava Waligun</p>
          <p></p>
        </div>
      </div>
      
    </div>
  );
}
