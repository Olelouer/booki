import { type Book } from "@/types/book.schema"
import { Link } from 'react-router'
import { Tablet } from "../ui/tablet"
import { googleDateToYear } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ImageAspect } from "../ui/image-aspect"
import { AuthorsList } from "../lists/authors-list"

type BookCardProps = {
    book: Book;
    onSelect?: (book: Book) => void
}

export function BookCard({ book, onSelect }: BookCardProps) {
    const hasPages = Number(book.pageCount) > 0;

    return (
        <article className="relative flex flex-col gap-2.5 h-full group">
            <ImageAspect 
                src={book.imageLinks} 
                alt={`Couverture de ${book.title}`}
                fallback={book.title.slice(0,2).toUpperCase()}
                className="group-hover:-translate-y-1.5 group-hover:shadow-xl"
            />
            <div className="flex flex-col flex-grow justify-between">
                <div className="flex flex-col gap-2.5">
                    <h2 className="text-lg font-serif line-clamp-2">
                        <Link
                            to={`/book/${book.id}`}
                            className="after:absolute after:inset-0 after:content-[''] transition-colors group-hover:text-red-900"
                        >
                            {book.title}
                        </Link>
                    </h2>
                    <AuthorsList authors={book.authors}/>
                    {(book.publishedDate || hasPages) &&
                        <div className="flex flex-wrap gap-1.5 text-[13px] text-stone-700">
                            {book.publishedDate &&
                                <span>{googleDateToYear(book.publishedDate)}</span>
                            }
                            {book.publishedDate && hasPages &&
                                <span aria-hidden="true">·</span>
                            }
                            {hasPages &&
                                <span>{book.pageCount} p.</span>
                            }
                        </div>
                    }

                    {book.categories && book.categories.length > 0 &&
                        <div className="flex flex-wrap gap-1.5">
                            {book.categories.map(category => {
                                return (
                                    <Tablet text={category} key={category} />
                                )
                            })}
                        </div>
                    }
                </div>
                <div className="mt-5">
                    {onSelect &&
                        <div className="mt-5">
                            <Button
                                onClick={() => onSelect(book)}
                                variant="outline"
                                size="lg"
                                className="relative z-10 w-full"
                            >
                                Ajouter
                            </Button>
                        </div>
                    }
                </div>
            </div>
        </article>
    )
}