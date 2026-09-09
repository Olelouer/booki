import { getSingleBook } from "@/lib/library.storage";
import { useParams } from "react-router"
import { SingleBookDetails } from "./components/single-book-details";



export function SingleBook() {
    const { id } = useParams();
    const book = id ? getSingleBook(id) : undefined;

    if (!book) {
        return (
            <p>404 not found</p>
        )
    }

    return (
        <SingleBookDetails
            book={book}
        />
    )
}