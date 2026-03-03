
export async function searchBooks(query){
    if (!query){
        return [];
    }
    try{
        const fullQuery = `${query} fiction novel bestseller`
        const res = await fetch(`/api/hello?query=${encodeURIComponent(fullQuery)}&printType=books&orderBy=newest&langRestrict=en`);
        const data = await res.json();
        return data.items || [];
    }catch (error){
        console.error("Error fetxhing books", error);
        return [];
    }
}