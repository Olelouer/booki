import type { BookGoogle } from "../../types/book.schema";

type BookCardProps = {
    book: BookGoogle;
    selectBook?: (book: BookGoogle) => void
}

export function BookCard({ book, selectBook }: BookCardProps) {
    const bookInfo = book.volumeInfo;
    
    return (
        <div>
            <p>{bookInfo.title}</p>
            {selectBook &&
                <button 
                    onClick={() => selectBook(book)}
                    className="cursor-pointer"
                >
                    Ajouter
                </button>
            }
        </div>
    )
}