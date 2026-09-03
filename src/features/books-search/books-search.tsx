import { useState } from "react"
import { type BookGoogle } from "../../types/book.schema"
import { BookCard } from "../../components/cards/book-card";
import { searchBooks } from './api';

export function BookSearch() {
    const [query, setQuery] = useState('');
    const [booksData, setBooksData] = useState<BookGoogle[]>([]);

    async function handleSearch() {
        const booksData = await searchBooks(query);
        setBooksData(booksData);
    }

    return (
        <>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    handleSearch();
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
                    <li key={book.id}>
                        <BookCard book={book}/>
                    </li>
                ))}
            </ul>
        </>
    )
}