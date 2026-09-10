import { getSingleBook } from "@/lib/library.storage";
import { useNavigate, useParams } from "react-router"
import { SingleBookDetails } from "./components/single-book-details";
import { removeBook } from "@/lib/library.storage"

export function SingleBook() {
    const { id } = useParams();
    const navigate = useNavigate();
    const book = id ? getSingleBook(id) : undefined;

    if (!book) {
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

    return (
        <SingleBookDetails
            book={book}
            removeBook={handleRemoveBook}
        />
    )
}