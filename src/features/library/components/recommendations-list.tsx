import { BookRecommended } from "@/components/cards/book-recommended";
import type { Book, RecommendedBook } from "@/types/book.schema";

type RecommendationsListProps = {
  recommendedBooks: RecommendedBook[];
  currentBook: Book;
};

export function RecommendationList({
  recommendedBooks,
  currentBook,
}: RecommendationsListProps) {
  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-[13px] tracking-wide text-red-900 uppercase">
          À lire ensuite
        </p>
        <p className="text-[13px] text-stone-600">
          en contraste avec <b>{currentBook.title}</b>
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {recommendedBooks.map((book) => (
          <BookRecommended key={book.id} book={book} />
        ))}
      </div>
    </>
  );
}
