import type { Book } from "@/types/book.schema";
import { ProgressBar } from "../ui/progress-bar";
import { ImageAspect } from "../ui/image-aspect";
import { Button } from "../ui/button";
import { AuthorsList } from "../lists/authors-list";
import { Link } from "react-router";

type BookCardSimpleProps = {
  book: Book;
  onUpdateBook: (
    bookId: Book["id"],
    changes: Omit<Partial<Book>, "id">,
  ) => void;
};

export function BookCardSimple({ book, onUpdateBook }: BookCardSimpleProps) {
  const canCalculatePercentage =
    Number(book.currentPage) > 0 && Number(book.pageCount) > 0;
  const percentage = canCalculatePercentage
    ? Math.round((Number(book.currentPage) / Number(book.pageCount)) * 100)
    : 0;

  return (
    <div className="group relative flex h-full gap-2 rounded-lg border border-border bg-white p-4 transition-all duration-300 hover:border-stone-300 hover:shadow-md">
      <div className="min-w-20">
        <ImageAspect
          src={book.imageLinks}
          alt={`Couverture de ${book.title}`}
          fallback={book.title.slice(0, 2).toUpperCase()}
        />
      </div>
      <div className="flex grow flex-col gap-1">
        <h2 className="line-clamp-2 font-serif text-lg group-hover:text-red-900">
          <Link
            to={`/book/${book.id}`}
            className="after:absolute after:inset-0"
          >
            {book.title}
          </Link>
        </h2>
        <AuthorsList authors={book.authors} />
        {canCalculatePercentage && (
          <>
            <ProgressBar
              min={0}
              max={100}
              value={percentage}
              variant="secondary"
            />
            <span className="text-[13px] text-stone-600">
              p. {`${book.currentPage}/${book.pageCount} · ${percentage}%`}
            </span>
          </>
        )}
        <div className="mt-auto flex pt-2">
          <Button
            variant="secondary"
            onClick={() =>
              onUpdateBook(book.id, {
                lastActivityAt: new Date().toISOString(),
              })
            }
          >
            Reprendre
          </Button>
        </div>
      </div>
    </div>
  );
}
