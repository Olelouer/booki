import { getSingleBook, updateBook } from "@/lib/library.storage"
import { useNavigate, useParams } from "react-router"
import { SingleBookDetails } from "./components/single-book-details"
import { removeBook } from "@/lib/library.storage"
import { type Book } from "@/types/book.schema"
import { useState } from "react"

export function SingleBook() {
    const { id } = useParams();
    const [book, setBook] = useState<Book | undefined>(() => id ? getSingleBook(id) : undefined);
    const navigate = useNavigate();

    if(!id || !book) {
        return (
            <p>404 not found</p>
        )
    }

    function handleRemoveBook(bookId: string): void {
        const response = removeBook(bookId);
        if (response.success) {
            navigate("/");
        }
    }

    function handleUpdateBook(bookId: string, changes: Partial<Book>): void {
        const response = updateBook(bookId, changes);
        if (response.success) {
            setBook(response.book);
        }
    }
    return (
        <>
            <SingleBookDetails
                book={book}
                removeBook={handleRemoveBook}
                updateBook={handleUpdateBook}
            />
        </>
    )
}