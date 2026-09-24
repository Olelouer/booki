import { BookCard } from "@/components/cards/book-card";
import { type Book } from "@/types/book.schema";

type BookSearchResultsProps = {
  books: Book[];
  onSelect: (book: Book) => void;
};

export function BookSearchResults({ books, onSelect }: BookSearchResultsProps) {
  return (
    <ul className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {books.map((book) => (
        <li key={book.id}>
          <BookCard book={book} onSelect={onSelect} />
        </li>
      ))}
    </ul>
  );
}
