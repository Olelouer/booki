import { useState } from "react"
import { type Book, DocsSchema } from "../../types/book.schema"
import z from "zod";

export function BookSearch() {
    const [query, setQuery] = useState('');
    const [booksData, setBooksData] = useState<Book[]>([]);

    async function searchBooks() {
        try {
            const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`)
            if (!response.ok) {
                throw new Error(`Statut de la réponse : ${response.status}`);
            }
            const result = await response.json();
            const books = DocsSchema.parse(result);
            setBooksData(books.docs);
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
                    <li key={book.key}>{book.title}</li>
                ))}
            </ul>
        </>
    )
}