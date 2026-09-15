import { useEffect, useState } from "react";
import { type Book } from "@/types/book.schema";
import { searchBooks } from './api';
import { AddBookModal } from "./components/add-book-modal";
import { addBook } from "../../lib/library.storage";
import { useSearchParams } from "react-router";
import { BookSearchResults } from "./components/book-search-results";
import { BookSearchForm } from "./components/book-search-form";

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

    function onSelect(book: Book) {
        setOpenModal(true);
        setSelectedBook(book);
    }

    function handleAddBook(book: Book) {
        addBook(book);
        setOpenModal(false);
        setSelectedBook(null);
    }

    return (
        <>
            <h1 className="font-serif font-medium text-4xl mb-5 mt-12">Chercher un livre</h1>
            <BookSearchForm 
                query={query}
                setQuery={setQuery}
                onSubmit={() => setSearchParams({ q: query })}
            />
            <BookSearchResults 
                books={booksData}
                onSelect={onSelect}
            />
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