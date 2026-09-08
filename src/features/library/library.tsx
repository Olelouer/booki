import type { Book, GetBooksResult } from "@/types/book.schema";
import { getBooks } from "../../lib/library.storage"
import { BookCard } from "@/components/cards/book-card";

export function Library() {
    const { library }: GetBooksResult = getBooks();

    return (
        <>
            <p>Ma bibliothèque</p>
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