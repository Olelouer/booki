import { type Book } from "@/types/book.schema";
import { Link } from 'react-router';

type BookCardProps = {
    book: Book;
    selectBook?: (book: Book) => void
}

export function BookCard({ book, selectBook }: BookCardProps) {
    return (
        <div>
            <p>{book.title}</p>
            {selectBook ?
                <button
                    onClick={() => selectBook(book)}
                    className="cursor-pointer"
                >
                    Ajouter
                </button> :
                <Link
                    to={`/book/${book.id}`}
                    className="cursor-pointer"
                >
                    Voir le détail du livre
                </Link>
            }
        </div>
    )
}