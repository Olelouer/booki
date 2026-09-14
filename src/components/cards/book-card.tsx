import { type Book } from "@/types/book.schema"
import { Link } from 'react-router'
import { Tablet } from "../ui/tablet"
import { googleDateToYear } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type BookCardProps = {
    book: Book;
    selectBook?: (book: Book) => void
}

export function BookCard({ book, selectBook }: BookCardProps) {

    return (
        <div className="flex flex-col gap-3">
            <div className="relative flex items-center justify-center w-full h-full aspect-2/3 rounded-xl overflow-hidden bg-stone-100">
                {book.imageLinks ?
                    <img className="absolute w-full h-full inset-0 object-cover" src={book.imageLinks} />
                    : <span className="text-2xl font-serif text-stone-500">{book.title.slice(0, 2).toUpperCase()}</span>
                }
            </div>

            <p className="text-lg font-serif">{book.title}</p>
            {book.authors &&
                <div className="flex flex-wrap gap-1.5 items-center">
                    <div className="flex flex-wrap gap-1.5">
                        {book.authors.slice(0, 3).map(author => {
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
                            text={`+${book.authors.length - 3}`}
                        />
                    }
                </div>
            }

            {(book.publishedDate || book.pageCount) &&
                <div className="flex flex-wrap gap-1.5 text-[13px] text-stone-700">
                    {book.publishedDate &&
                        <p>{googleDateToYear(book.publishedDate)}</p>
                    }
                    {book.publishedDate && Number(book.pageCount) > 0 &&
                        <span>·</span>
                    }
                    {Number(book.pageCount) > 0 &&
                        <p>{book.pageCount} p.</p>
                    }
                </div>
            }

            {book.categories &&
                <div className="flex gap-1.5">
                    {book.categories.map(category => {
                        return (
                            <Tablet text={category} key={category} />
                        )
                    })}
                </div>
            }

            {selectBook ?
                <Button
                    onClick={() => selectBook(book)}
                    variant="outline"
                    className="cursor-pointer"
                >
                    Ajouter
                </Button> :
                <Link
                    to={`/book/${book.id}`}
                    className="cursor-pointer"
                >
                    Voir le détail du livre
                </Link>
            }
        </div>
    )
}