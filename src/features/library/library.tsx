import type { Book, GetBooksResult } from "@/types/book.schema";
import { getBooks, getYearPagesCount, updateBook } from "../../lib/library.storage"
import { LibraryList } from "./components/library-list";
import { LibraryInProgress } from "./components/library-in-progress";
import { useState } from "react";

export function Library() {
    const { success, library }: GetBooksResult = getBooks();
    const [books, setBooks] = useState(library);
    const pagesCount = getYearPagesCount();

    if (!success) {
        return (
            <p>Impossible de charger la bibliothèque</p>
        )
    }

    function handleUpdateBook(bookId: Book["id"], changes: Omit<Partial<Book>, "id">) {
        updateBook(bookId, { ...changes });
        setBooks(prevBooks => 
            prevBooks.map(book => book.id === bookId ? {...book, ...changes } : book)
        )
    }

    const inProgressBooks = books.filter(book => book.status === 'reading')
                                 .sort((a, b) => (b.lastActivityAt ? new Date(b.lastActivityAt).getTime() : 0) - (a.lastActivityAt ? new Date(a.lastActivityAt).getTime() : 0));

    return (
        <>
            {pagesCount > 1000 &&
                <p>{pagesCount}</p>
            }
            <div className="mb-8">
                <LibraryInProgress 
                    books={inProgressBooks}
                    onUpdateBook={handleUpdateBook}
                />
            </div>
            <LibraryList
                books={books}
            />
        </>
    )
}