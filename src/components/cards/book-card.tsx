import { type Book } from "@/types/book.schema"
import { Link } from 'react-router'
import { Tablet } from "../ui/tablet"
import { googleDateToYear } from "@/lib/utils"

type BookCardProps = {
    book: Book;
    selectBook?: (book: Book) => void
}

export function BookCard({ book, selectBook }: BookCardProps) {


    return (
        <div className="flex flex-col gap-2">
            <p className="text-lg font-serif">{book.title}</p>
            {book.authors &&
                <div className="flex flex-wrap gap-1.5 items-center">
                    <div className="flex flex-wrap gap-1.5">
                        {book.authors.slice(0,3).map(author => {
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
                    {book.publishedDate && book.pageCount &&
                        <span>·</span>
                    }
                    {book.pageCount &&
                        <p>{book.pageCount} p.</p>
                    }
                </div>
            }
            
            {book.categories &&
                <div className="flex gap-1.5">
                    {book.categories.map(category => {
                        return (
                            <Tablet text={category} key={category}/>
                        )
                    })}
                </div>
            }

            {selectBook ?
                <button
                    onClick={() => selectBook(book)}
                    className="cursor-pointer"
                >
                    Ajouter
                </button> :
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