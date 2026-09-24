import type { RecommendedBook } from "@/types/book.schema";
import { AuthorsList } from "../lists/authors-list";
import { ImageAspect } from "../ui/image-aspect";
import { Link } from "react-router";

type BookRecommendedProps = {
  book: RecommendedBook;
};

export function BookRecommended({ book }: BookRecommendedProps) {
  return (
    <article className="group relative flex gap-4 rounded-lg border border-stone-200 bg-white p-4 transition-all duration-200 hover:border-stone-300 hover:shadow-md">
      <div className="min-w-20">
        <ImageAspect
          src={book.imageLinks}
          alt={`Couverture de ${book.title}`}
        />
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="line-clamp-2 font-serif text-lg group-hover:text-red-900">
          <Link
            to={`/book/${book.id}`}
            className="after:absolute after:inset-0"
          >
            {book.title}
          </Link>
        </h2>
        <AuthorsList authors={book.authors} />
        <p className="text-[13px] text-red-900">{book.justification}</p>
      </div>
    </article>
  );
}
