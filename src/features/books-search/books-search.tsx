import { useState } from "react";
import { type BookGoogle, type Book } from "../../types/book.schema";
import { BookCard } from "../../components/cards/book-card";
import { searchBooks } from './api';
import { AddBookModal } from "./components/add-book-modal";

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

    function addBook(book: Book) {
        const storedBooks = localStorage.getItem("library:books");
        const library: Book[] = storedBooks ? [...JSON.parse(storedBooks), book] : [book]; 
        localStorage.setItem("library:books", JSON.stringify(library));
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
                    addBook={addBook}
                ></AddBookModal>
            }
        </>
    )
}