import { type Book } from "@/types/book.schema"


type SingleBookProps = {
    book: Book;
    removeBook: (bookId: string) => void;
}
export function SingleBookDetails({ book, removeBook }: SingleBookProps) {
    return (
        <>
            <h1>{book.title}</h1>
            <button
                onClick={() => removeBook(book.id)}
            >
                Supprimer de ma bibliothèque
            </button>
        </>
    )
}