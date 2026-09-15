import type { GetBooksResult } from "@/types/book.schema";
import { getBooks, getYearPagesCount } from "../../lib/library.storage"
import { LibraryList } from "./components/library-list";

export function Library() {
    const { success, library }: GetBooksResult = getBooks();
    const pagesCount = getYearPagesCount();

    if (!success) {
        return (
            <p>Impossible de charger la bibliothèque</p>
        )
    }

    return (
        <>
            {pagesCount > 1000 &&
                <p>{pagesCount}</p>
            }
            <LibraryList
                books={library}
            />
        </>
    )
}