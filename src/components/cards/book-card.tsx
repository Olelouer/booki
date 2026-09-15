import { type Book } from "@/types/book.schema"
import { Link } from 'react-router'
import { Tablet } from "../ui/tablet"
import { googleDateToYear } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type BookCardProps = {
    book: Book;
    onSelect?: (book: Book) => void
}

export function BookCard({ book, onSelect }: BookCardProps) {
    const hasPages = Number(book.pageCount) > 0;

    return (
        <div className="flex flex-col gap-2.5 h-full">
            <div className="relative flex items-center justify-center w-full aspect-2/3 rounded-xl overflow-hidden bg-stone-100">
                {book.imageLinks ?
                    <img className="absolute w-full h-full inset-0 object-cover" src={book.imageLinks} alt={`Couverture de ${book.title}`}/>
                    : <span className="text-2xl font-serif text-stone-500">{book.title.slice(0, 2).toUpperCase()}</span>
                }
            </div>

            <div className="flex flex-col flex-grow justify-between">
                <div className="flex flex-col gap-2.5 ">
                    <h2 className="text-lg font-serif">{book.title}</h2>

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
                    {onSelect ?
                        <Button
                            onClick={() => onSelect(book)}
                            variant="outline"
                            size="lg"
                            className="w-full"
                        >
                            Ajouter
                        </Button> :
                        <Link
                            to={`/book/${book.id}`}
                        >
                            Voir le détail du livre
                        </Link>
                    }
                </div>
            </div>
        </div>
    )
}