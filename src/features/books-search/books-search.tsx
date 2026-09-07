import { useState } from "react";
import { type BookGoogle, type Book } from "@/types/book.schema";
import { BookCard } from "@/components/cards/book-card";
import { searchBooks } from './api';
import { AddBookModal } from "./components/add-book-modal";
import { addBook } from "./library"

export function BookSearch() {
    const [query, setQuery] = useState('');
    const [booksData, setBooksData] = useState<BookGoogle[]>([]);
    const [selectedBook, setSelectedBook] = useState<BookGoogle | null>(null);
    const [openModal, setOpenModal] = useState<boolean>(false);

    async function handleSearch() {
        const booksData = await searchBooks(query);
        setBooksData(booksData);
    }

    function selectBook(bookGoogle: BookGoogle) {
        setOpenModal(true);
        setSelectedBook(bookGoogle);
    }

    function handleAddBook(book: Book) {
        addBook(book);
        setOpenModal(false);
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
                        <BookCard
                            book={book}
                            selectBook={selectBook}
                        />
                    </li>
                ))}
            </ul>
            {selectedBook &&
                <AddBookModal
                    open={openModal}
                    onOpenChange={setOpenModal}
                    bookGoogle={selectedBook}
                    addBook={handleAddBook}
                ></AddBookModal>
            }
        </>
    )
}