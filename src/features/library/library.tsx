import type { GetBooksResult } from "@/types/book.schema";
import { getBooks } from "../../lib/library.storage"
import { LibraryList } from "./components/library-list";

export function Library() {
    const { success, library }: GetBooksResult = getBooks();

    if (!success) {
        return (
            <p>Impossible de charger la bibliothèque</p>
        )
    }

    return (
        <>
            <p>Ma bibliothèque</p>
            <LibraryList
                books={library}
            />
        </>
    )
}