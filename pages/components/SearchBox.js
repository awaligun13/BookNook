import {useState} from "react";
import styles from "../../styles/SearchBox.module.css";
import {searchBooks} from "../library/googleBooks";

export default function SearchBox({onSearch, close}){
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [page,setPage] = useState(0);
    const [loading,setLoading] = useState(false);

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

    const nextPage = () => setPage((prev) => prev + 1);
    const prevPage = () => setPage((prev) => Math.max(prev - 1, 0));
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
                    <div key={book.id} className={styles.bookItem}>
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
        </div>
    )
};