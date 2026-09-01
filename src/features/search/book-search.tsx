import { useState } from "react"
const apiKey = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;
const apiUrl = import.meta.env.VITE_GOOGLE_BOOKS_URL;

interface Book {
    title: string;
    key: string;
}

export function BookSearch() {
    const [query, setQuery] = useState('');
    const [booksData, setBooksData] = useState<Array<Book>>([]);

    async function searchBooks() {
        try {
            const data = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`)
            if (!data.ok) {
                throw new Error(`Response status: ${data.status}`);
            }
            const result = await data.json();
            setBooksData(result.docs);
        } catch (error: unknown) {
            if(error instanceof Error) {
                console.error(error.message);
            } else {
                console.error("Une erreur est survenue lors du chargement des livres veuillez réessayer plus tard.");
            }
        }
    }

    return (
        <>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    searchBooks();
                }}
            >
                <input
                    type="search"
                    placeholder="Entrer le titre d'un livre..."
                    onChange={e => setQuery(e.target.value)}
                />
                <button type="submit">
                    Valider
                </button>
            </form>
            <ul>
                {booksData.map((book) => (
                    <li key={book.key}>{book.title}</li>
                ))}
            </ul>
        </>
    )
}