import { useState } from "react"
const apiKey = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;
const apiUrl = import.meta.env.VITE_GOOGLE_BOOKS_URL;

export function BookSearch() {
    const [query, setQuery] = useState(null);
    async function searchBooks() {
        try {
            const data = await fetch(`${apiUrl}volumes?q=${encodeURIComponent(query)}&key=${apiKey}`)
            if (!data.ok) {
                throw new Error(`Response status: ${data.status}`);
            }
            console.log(data)
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <>
            <form>
                <input
                    type="search"
                    placeholder="Entrer le titre d'un livre..."
                    onChange={e => setQuery(e.target.value)}
                />
                <button type="submit"
                    onClick={e => {
                        e.preventDefault();
                        searchBooks();
                    }}
                >
                    Valider
                </button>
            </form>
        </>
    )
}