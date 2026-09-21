import type { Book, GetBooksResult, RecommendedBook } from "@/types/book.schema";
import { getBooks, getYearPagesCount, updateBook } from "@/lib/library.storage"
import { LibraryList } from "./components/library-list";
import { LibraryInProgress } from "./components/library-in-progress";
import { useState } from "react";
import { getNextReads } from "@/lib/recommendations";

export function Library() {
    const { success, library }: GetBooksResult = getBooks();
    const [books, setBooks] = useState(library);
    const pagesCount = getYearPagesCount(books);

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

    const recommendations = inProgressBooks.length > 0 ? getNextReads(inProgressBooks[0].id, books) : [];

    return (
        <>
            {pagesCount > 10000 &&
                <p>{pagesCount}</p>
            }
            {inProgressBooks.length > 0 &&
                <div className="mb-8">
                    <LibraryInProgress 
                        books={inProgressBooks}
                        onUpdateBook={handleUpdateBook}
                    />
                </div>
            }
            {recommendations.length > 0 && 
                recommendations.map((book: RecommendedBook) => 
                    <div key={book.id}>
                        <p></p>{book.title}
                        <p>{book.justification}</p>
                    </div>
                )
            }
            <LibraryList
                books={books}
            />
        </>
    )
}