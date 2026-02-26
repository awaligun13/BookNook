
export async function searchBooks(query){
    if (!query){
        return [];
    }
    try{
        const res = await fetch(`/api/hello?query=${encodeURIComponent(query)}`);
        const data = await res.json();
        return data.items || [];
    }catch (error){
        console.error("Error fetxhing books", error);
        return [];
    }
}