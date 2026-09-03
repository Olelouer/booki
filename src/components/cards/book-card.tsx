import type { BookGoogle } from "../../types/book.schema";

type BookCardProps = {
    book: BookGoogle;
}

export function BookCard({ book }: BookCardProps) {
    const bookInfo = book.volumeInfo;
    
    return (                                                                                                                                                                                
        <div>
            <p>{bookInfo.title}</p>
        </div>
    )
}