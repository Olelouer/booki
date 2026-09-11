import { type Book, BOOK_STATUS, type BookStatus, type Tone, TONE } from "@/types/book.schema";
import { BookCard } from "@/components/cards/book-card";
import { useState } from "react";

type LibraryListProps = {
    books: Book[],
}

export function LibraryList({ books }: LibraryListProps) {
    const [filters, setFilters] = useState({
        tone: '',
        status: ''
    });
    const library = books.filter(book => {
                        return (
                            (filters.tone === '' || book.tone === filters.tone) 
                            && (filters.status === '' || book.status === filters.status)
                        )
                    });

    function handleFilters(key: keyof typeof filters, value: string) {
        setFilters(prev => {
            return {
                ...prev,
                [key]: value
            };
        });
    }

    return (
        <>
            {BOOK_STATUS &&
                <select
                    onChange={e => {
                        handleFilters("status", e.currentTarget.value);
                    }}
                    name="status"
                    value={filters.status}
                >
                    <option value="">Tous</option>
                    {
                        BOOK_STATUS.map((status: BookStatus) => <option key={status} value={status}>{status}</option>)
                    }
                </select>
            }
            {TONE &&
                <select
                    onChange={e => {
                        handleFilters("tone", e.currentTarget.value);
                    }}
                    name="tone"
                    value={filters.tone}
                >
                    <option value="">Tous</option>
                    {
                        TONE.map((tone: Tone) => <option key={tone} value={tone}>{tone}</option>)
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