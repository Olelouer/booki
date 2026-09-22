import type { Book } from "@/types/book.schema"
import { ProgressBar } from "../ui/progress-bar";
import { ImageAspect } from "../ui/image-aspect";
import { Tablet } from "../ui/tablet";
import { Button } from "../ui/button";
import { AuthorsList } from "../lists/authors-list";

type BookCardSimpleProps = {
    book: Book;
    onUpdateBook: (bookId: Book["id"], changes: Omit<Partial<Book>, "id">) => void;
}

export function BookCardSimple({ book, onUpdateBook }: BookCardSimpleProps) {
    const canCalculatePercentage = Number(book.currentPage) > 0 && Number(book.pageCount) > 0;
    const percentage = canCalculatePercentage ? Math.round(Number(book.currentPage) / Number(book.pageCount) * 100) : 0;

    return (
        <div className="flex h-full bg-white border-1 border-border rounded-lg p-4 gap-2">
            <div className="min-w-20">
                <ImageAspect 
                    src={book.imageLinks} 
                    alt={`Couverture de ${book.title}`}
                    fallback={book.title.slice(0,2).toUpperCase()}
                />
            </div>
            <div className="flex flex-grow flex-col gap-1">
                <h2 className="font-serif line-clamp-2">{book.title}</h2>
                <AuthorsList authors={book.authors}/>
                {canCalculatePercentage &&
                    <>
                        <ProgressBar 
                            min={0}
                            max={100}
                            value={percentage}
                            variant="secondary"
                        />
                        <span className="text-stone-600 text-[13px]">p. {`${book.currentPage}/${book.pageCount} · ${percentage}%`}</span>
                    </>
                }
                <div className="mt-auto flex pt-2">
                    <Button
                        variant="secondary"
                        onClick={() => onUpdateBook(book.id, { lastActivityAt: new Date().toISOString()})}
                    >
                        Reprendre
                    </Button>
                </div>
            </div>
        </div>
    )
}