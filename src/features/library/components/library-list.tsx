import { type Book, BOOK_STATUS } from "@/types/book.schema";
import { BookCard } from "@/components/cards/book-card";
import { useState } from "react";

type LibraryListProps = {
    books: Book[],
}

export function LibraryList({ books }: LibraryListProps) {
    const [library, setLibrary] = useState<Book[]>(books);

    function handleStatus(selectedStatus: string) {
        if (selectedStatus === "all") {
            setLibrary(books);
            return;
        }
        const filteredBooks = books.filter(book => book.status === selectedStatus);
        setLibrary(filteredBooks);
    }

    return (
        <>
            {BOOK_STATUS &&
                <select
                    onChange={e => {
                        handleStatus(e.currentTarget.value);
                    }}
                >
                    <option value="all">Tous</option>
                    {
                        BOOK_STATUS.map(status => <option key={status} value={status}>{status}</option>)
                    }
                </select>
            }
            {library.map((book: Book) =>
                <li key={book.id}>
                    <BookCard
                        book={book}
                    />
                </li>
            )}
        </>
    )
}