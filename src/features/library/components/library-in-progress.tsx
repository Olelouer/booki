import { BookCardSimple } from "@/components/cards/book-card-simple";
import { BookHightlightCard } from "@/components/cards/book-highlight-card";
import type { Book } from "@/types/book.schema";

type LibraryInProgressProps = {
  books: Book[];
  onUpdateBook: (
    bookId: Book["id"],
    changes: Omit<Partial<Book>, "id">,
  ) => void;
};

export function LibraryInProgress({
  books,
  onUpdateBook,
}: LibraryInProgressProps) {
  return (
    <div>
      <p className="mb-4 text-[13px] tracking-wide text-stone-500 uppercase">
        En Cours
      </p>
      <ul>
        {books.slice(0, 1).map((book) => (
          <li key={book.id}>
            <BookHightlightCard book={book} onUpdateBook={onUpdateBook} />
          </li>
        ))}
      </ul>
      {Number(books.length) > 1 && (
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {books.slice(1).map((book) => (
            <li key={book.id}>
              <BookCardSimple book={book} onUpdateBook={onUpdateBook} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
