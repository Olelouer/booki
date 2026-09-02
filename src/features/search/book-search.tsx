import { useState } from "react"
import { type BookGoogle, BooksListSchemaGoogle } from "../../types/book.schema"
import { handleCacheTTL } from "../../utils/cache" 
import * as z from "zod";
const apiKey = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;
const baseUrl = import.meta.env.VITE_GOOGLE_BOOKS_URL;

export function BookSearch() {
    const [query, setQuery] = useState('');
    const [booksData, setBooksData] = useState<BookGoogle[]>([]);
    const { setCacheTTL, getCacheTTL} = handleCacheTTL();

    async function searchBooks() {
        const cachedData = getCacheTTL(query);

        if(cachedData) {
            setBooksData(cachedData);
            return;
        }

        try {
            const response = await fetch(`${baseUrl}volumes?q=${encodeURIComponent(query)}&key=${apiKey}&maxResults=40`)
            if (!response.ok) {
                throw new Error(`Statut de la réponse : ${response.status}`);
            }
            const result = await response.json();
            const books = BooksListSchemaGoogle.parse(result);
            setBooksData(books.items);
            setCacheTTL(query, books.items);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message);
            } else if (error instanceof z.ZodError) {
                console.error("La validation a échouée", error.issues);
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
                    <li key={book.id}>{book.volumeInfo.title}</li>
                ))}
            </ul>
        </>
    )
}