import { BookRecommended } from "@/components/cards/book-recommended";
import type { Book, RecommendedBook } from "@/types/book.schema"

type RecommendationsListProps = {
    recommendedBooks: RecommendedBook[];
    currentBook: Book;
}

export function RecommendationList({ recommendedBooks, currentBook }: RecommendationsListProps) {
    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <p className="text-[13px] text-red-900 tracking-wide uppercase">À lire ensuite</p>
                <p className="text-[13px] text-stone-600">en contraste avec <b>{currentBook.title}</b></p>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
                {recommendedBooks.map(book =>
                    <BookRecommended 
                        key={book.id} 
                        book={book} 
                    />
                )}
            </div>
        </>
    )
}