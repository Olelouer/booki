import type { Book } from "@/types/book.schema"
import { Tablet } from "../ui/tablet"
import { ProgressBar } from "../ui/progress-bar";
import { Button } from "../ui/button";
import { ImageAspect } from "../ui/image-aspect";

type BookHighlightProps = {
    book: Book;
    onUpdateBook: (bookId: Book["id"], changes: Omit<Partial<Book>, "id">) => void;
}

export function BookHightlightCard({ book, onUpdateBook }: BookHighlightProps) {
    const canCalculatePercentage = Number(book.currentPage) > 0 && Number(book.pageCount) > 0;
    const percentage = canCalculatePercentage ? Math.round(Number(book.currentPage) / Number(book.pageCount) * 100) : 0;
    
    return (
        <div className="flex flex-row w-full p-4 rounded-lg bg-red-100">
            <div className="flex flex-col gap-2 justify-between w-full sm:flex-row">
                <div className="flex gap-4 sm:w-2/3">
                    <div className="min-w-20">
                        <ImageAspect 
                            src={book.imageLinks} 
                            alt={`Couverture de ${book.title}`}
                            fallback={book.title.slice(0,2).toUpperCase()}
                        />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                        <span className="text-[13px] font-light text-accent tracking-wide uppercase">Reprise en dernier</span>
                        <h2 className="text-2xl font-serif">{book.title}</h2>
                        {book.authors && book.authors.length > 0 &&
                            <div className="flex flex-wrap gap-1.5 items-center">
                                <div className="flex flex-wrap gap-1.5">
                                    {book.authors.slice(0, 2).map(author => {
                                        return (
                                            <span
                                                key={author}
                                                className="text-sm text-stone-700 after:content-['·'] after:ml-1.5 last:after:content-['']"
                                            >
                                                {author}
                                            </span>
                                        )
                                    })}
                                </div>
                                {book.authors.length > 2 &&
                                    <Tablet
                                        text={`+${book.authors.length - 2}`}
                                    />
                                }
                            </div>
                        }
                        {canCalculatePercentage &&
                            <>
                                <ProgressBar 
                                    min={0}
                                    max={100}
                                    value={percentage}
                                />
                                <span className="text-accent text-[13px]">p. {`${book.currentPage}/${book.pageCount} · ${percentage}%`}</span>
                            </>
                        }
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <Button
                        size="lg"
                        onClick={() => onUpdateBook(book.id,  { currentPage: Math.min(Number(book.currentPage) + 10, Number(book.pageCount)), lastActivityAt: new Date().toISOString() })}
                    >
                        Ajouter 10 pages
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        onClick={() => onUpdateBook(book.id,  { currentPage: Number(book.pageCount), status: "completed" })}
                    >
                        Marquer comme lu
                    </Button>
                </div>
            </div>
        </div>
    )
}