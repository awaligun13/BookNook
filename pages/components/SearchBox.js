//another popup, but this one searches for books. it takes a user query and puts it through my searchBooks function
//that returns data from googlebooks api. it shows 10 of the results in a scroll menu, where each of the books can be clicked.
//when theyre clicked, they show a pages_details popup menu, which just goes more in depth and also allows the user to add the book to 
//their library

import {useState} from "react";
import styles from "../../styles/SearchBox.module.css";
import {searchBooks} from "../../library/googleBooks";
import BookDetails from "./book_details_popup";

export default function SearchBox({onSearch, close}){
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [page,setPage] = useState(0);
    const [loading,setLoading] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

    const resultsPerPage = 10;

    const handleSubmit = async (e, nextPage = 0) => {
        if (e) e.preventDefault();
        if (!query.trim()){
            return;
        }
        setLoading(true);
        try{
            const allResults = await searchBooks(query);
            setResults(allResults);
            setPage(nextPage);
        } catch (error){
            console.error(error);
        }finally{
            setLoading(false);
        }
    };
    const pagedResults = results.slice(page * resultsPerPage, (page + 1) * resultsPerPage);

    return (
        <div className ={styles.overlay}>
            <div className ={styles.box}>
                <button className={styles.close} onClick={close}>x</button>
                <form className={styles.search} onSubmit = {handleSubmit}>
                    <input type = "text"
                        value = {query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder = "Search Books..."
                        autoFocus
                    />
                    <button type="submit">Search</button>
                </form>
                <div className={styles.results}>
                    {loading ? (
                    <p>Loading...</p>
                    ) : pagedResults.length ? (
                    pagedResults.map((book) => (
                    <div key={book.id} className={styles.bookItem} onClick={() => setSelectedBook(book)}>
                        {book.volumeInfo.imageLinks?.thumbnail && (
                        <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
                        )}
                        <div>
                            <h4>{book.volumeInfo.title}</h4>
                            {book.volumeInfo.authors && <p>{book.volumeInfo.authors.join(", ")}</p>}
                        </div>
                    </div>
                    ))
                    ) : (
                    <p>Search for your favorite books</p>
                    )}
                </div>
            </div>
            {selectedBook && (<BookDetails book={selectedBook} onClose = {() =>setSelectedBook(null)}/>)}
        </div>
    )
}; 