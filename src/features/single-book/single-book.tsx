import { type Book } from "@/types/book.schema"


type SingleBookProps = {
    book: Book
}
export function SingleBook({ book }: SingleBookProps) {
    return (
        <>
            <h1>{book.title}</h1>
        </>
    )
}