import { type Book } from "@/types/book.schema"

type SingleBookProps = {
    book: Book;
    removeBook: (bookId: string) => void;
    updateBook: (bookId: string, changes: Partial<Book>) => void;
}

export function SingleBookDetails({ book, removeBook, updateBook }: SingleBookProps) {
    const today = new Date().toISOString().slice(0,10);

    return (
        <>
            <h1>{book.title}</h1>
            <p>{book.status}</p>
            <p>{book.tone}</p>
            <div className="flex flex-col">
                <button
                    onClick={() => updateBook(book.id, { status: "completed", finishedAt: today })}
                    className="cursor-pointer flex"
                >
                    Marquer comme lu
                </button>
                <button
                    className="cursor-pointer flex"
                    onClick={() => updateBook(book.id, { status: "unread", startedAt: today, finishedAt: null })}
                >
                    Relire
                </button>
                <p>{book.currentPage}</p>
                <button
                    className="cursor-pointer flex"
                    onClick={() => updateBook(book.id, { currentPage: (book.currentPage || 0) + 15 })}
                >
                    Ajouter 15 pages
                </button>
                <button
                    onClick={() => removeBook(book.id)}
                    className="cursor-pointer flex"
                >
                    Retirer de ma bibliothèque
                </button>
            </div>
        </>
    )
}