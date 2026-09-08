import { getSingleBook } from "@/lib/library.storage";
import { useParams } from "react-router"
import { SingleBook } from "./single-book";



export function SingleBookWrapper() {
    const { id } = useParams();
    const book = id ? getSingleBook(id) : undefined;

    if (!book) {
        return (
            <p>404 not found</p>
        )
    }

    return <SingleBook book={book} />
}