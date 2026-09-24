import { type Book, BOOK_STATUS, TONE } from "@/types/book.schema";
import { BookCard } from "@/components/cards/book-card";
import { useState } from "react";
import { SelectInput } from "@/components/ui/select-input";

type LibraryListProps = {
  books: Book[];
};

export function LibraryList({ books }: LibraryListProps) {
  const [filters, setFilters] = useState({
    tone: "",
    status: "",
  });
  const library = books.filter((book) => {
    return (
      (filters.tone === "" || book.tone === filters.tone) &&
      (filters.status === "" || book.status === filters.status)
    );
  });

  function handleFilters(key: keyof typeof filters, value: string) {
    setFilters((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  }

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-8">
          {BOOK_STATUS && (
            <div className="flex flex-col">
              <label
                htmlFor="status"
                className="mb-1 text-[13px] tracking-wider text-stone-500 uppercase"
              >
                Statut :
              </label>
              <SelectInput
                onChange={(e) => {
                  handleFilters("status", e.currentTarget.value);
                }}
                id="status"
                name="status"
                value={filters.status}
                data={BOOK_STATUS}
              />
            </div>
          )}
          {TONE && (
            <div className="flex flex-col">
              <label
                htmlFor="tone"
                className="mb-1 text-[13px] tracking-wider text-stone-500 uppercase"
              >
                Ton :
              </label>
              <SelectInput
                onChange={(e) => {
                  handleFilters("tone", e.currentTarget.value);
                }}
                id="tone"
                name="tone"
                value={filters.tone}
                data={TONE}
              />
            </div>
          )}
        </div>
        {library.length > 0 && (
          <p className="text-[13px] tracking-wider text-stone-500 uppercase">
            {library.length} Livres
          </p>
        )}
      </div>
      <ul className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {library.map((book: Book) => (
          <li key={book.id}>
            <BookCard book={book} />
          </li>
        ))}
      </ul>
    </>
  );
}
