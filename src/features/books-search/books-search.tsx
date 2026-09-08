import { useEffect, useState } from "react";
import { type Book } from "@/types/book.schema";
import { BookCard } from "@/components/cards/book-card";
import { searchBooks } from './api';
import { AddBookModal } from "./components/add-book-modal";
import { addBook } from "../../lib/library.storage";
import { useSearchParams } from "react-router";

export function BookSearch() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] = useState('');
    const [booksData, setBooksData] = useState<Book[]>([]);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [openModal, setOpenModal] = useState<boolean>(false);

    useEffect(() => {
        const param = searchParams.get("q");
        if (param) {
            setQuery(param);
            handleSearch(param);
        }
    }, [searchParams])

    async function handleSearch(query: string) {
        const booksData = await searchBooks(query);
        setBooksData(booksData);
    }

    function selectBook(book: Book) {
        setOpenModal(true);
        setSelectedBook(book);
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
                    setSearchParams({ q: query });
                }}
            >
                <input
                    type="search"
                    placeholder="Entrer le titre d'un livre..."
                    value={query}
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
                    book={selectedBook}
                    addBook={handleAddBook}
                ></AddBookModal>
            }
        </>
    )
}