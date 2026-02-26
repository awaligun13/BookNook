export default async function handler(req, res) {
  try{
    let { query } = req.query;
    const API_KEY = process.env.GoogleBooksAPIKey;

    if (!query) query = "fiction";

    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${API_KEY}`);
    
    if (!response.ok){
      throw new Error("Failed to fetch from Google Books API");
    }
    const data = await response.json();
    res.status(200).json(data);
    }catch (error){
      console.error(error);
      res.status(500).json({ error: "Something went wrong"});
    } 
}
