import type { RecommendedBook } from "@/types/book.schema";
import { AuthorsList } from "../lists/authors-list";
import { ImageAspect } from "../ui/image-aspect";

type BookRecommendedProps = {
    book: RecommendedBook
};

export function BookRecommended({ book }: BookRecommendedProps) {
    return (
        <article className="group relative flex gap-4 rounded-lg border border-stone-200 bg-white p-4 transition-[border-color,box-shadow] duration-200 hover:border-stone-300 hover:shadow-md">
            <div className="min-w-20">
                <ImageAspect 
                    src={book.imageLinks}
                    alt={`Couverture de ${book.title}`}
                />
            </div>
            <div className="flex flex-col gap-1">
                <h2 className="font-serif line-clamp-2 group-hover:text-red-900">
                    {book.title}
                </h2>
                <AuthorsList authors={book.authors} />
                <p className="text-[13px] text-red-900">{book.justification}</p>
            </div>
        </article>
    )
}