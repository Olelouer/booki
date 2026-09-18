import { type Book, LibraryBooksListSchema, type GetBooksResult } from '@/types/book.schema'
import * as z from 'zod';

const LIBRARY_KEY = "library:books";

export function addBook(book: Book) {
    const { success, library } = getBooks();
    if (!success) {
        return {
            success: false
        };
    } 

    const isDoublon = library.some(b => b.googleId === book.googleId);

    if (isDoublon) {
        console.warn("Ce livre est déjà présent dans votre bibliothèque");
        return {
            success: false
        };
    }

    library.push(book);
    return saveBooks(library);
}

export function getBooks(): GetBooksResult {
    const message = "Une erreur est survenue lors de la lecture de la bibliothèque";
    try {
        const storedBooks = localStorage.getItem(LIBRARY_KEY);
        if (storedBooks === null) {
            return {
                success: true,
                library: []
            };
        }
        return {
            success: true,
            library: LibraryBooksListSchema.parse(JSON.parse(storedBooks))
        };
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error(message, error.issues);
        } else if (error instanceof Error) {
            console.error(message, error.message);
        } else {
            console.error(message);
        }
        return {
            success: false,
            library: []
        };
    }
}

export function getSingleBook(bookId: string): Book | undefined {
    const { success, library } = getBooks();
    if (!success) return;

    return library.find((book) => book.id === bookId);
}

export function removeBook(bookId: string) {
    const { success, library } = getBooks();
    if (!success) {
        console.error("Impossible de supprimer le livre");
        return {
            success: false
        };
    }

    const filteredLibrary = library.filter(book => book.id !== bookId);
    return saveBooks(filteredLibrary);
}

export function updateBook(bookId: string, changes: Omit<Partial<Book>, "id">) {
    const { success, library } = getBooks();
    if (!success) return {
        success: false,
    };

    let book = library.find((book) => book.id === bookId);

    if(!book) {
        return {
            success: false,
        }
    }

    book = { ...book, ...changes };

    const newLibrary = library.map(b => {
        if(b.id === book.id) {
            return book;
        }
        return b;
    });

    const save = saveBooks(newLibrary);

    if(!save.success) {
        return {
            success: false
        }
    }
        
    return {
        success: true,
        book: book
    };
}

function saveBooks(library: Book[]) {    
    try {
        const newLibrary = LibraryBooksListSchema.parse(library);
        localStorage.setItem(LIBRARY_KEY, JSON.stringify(newLibrary));
        return {
            success: true
        }
    } catch(error) {
        if(error instanceof z.ZodError) {
            console.error(error.issues);
        } else if(error instanceof Error) {
            console.error(error.message);
        } else {
            console.error("Erreur lors de la mise à jour du livre");
        }
        return {
            success: false
        }
    }
}

export function getYearPagesCount(): number {
    const { success, library } = getBooks();
    if(!success) {
        return 0;
    }

    return library.reduce((acc, book) => {
        if(book.startedAt && book.currentPage && book.startedAt.slice(0,4) === new Date().getFullYear().toString()) {
            return acc + book.currentPage;
        }
        return acc;
    }, 0);
}

export function nextRead(bookId: Book["id"]) {
    const {success, library} = getBooks();

    if(!success) {
        return {
            success: false,
        }
    }

    const currentBook = library.filter((b: Book) => b.id === bookId);

    const { pageCount, tone, publishedDate } = currentBook;

    const unreadBooks = library.filter((b: Book) => b.status === 'unread');

    if(unreadBooks.length === 0) return;

    type ScoredBook = Book & { score : number };

    const recommandation = unreadBooks.reduce<ScoredBook[]>((acc, book) => {
        const pageScore = book.pageCount ? (0.4 * ((getPageScore(pageCount) - getPageScore(book.pageCount)) / 2 )) : 0;
        const toneScore = book.tone ? (0.4 * ((getToneNumber(tone) - getToneNumber(book.tone)) / 2 )) : 0;
        const epoqueScore = book.tone ? (0.2 * ((getToneNumber(tone) - getToneNumber(book.tone)) / 2 )) : 0;
        acc.push({
            ...book,
            score: pageScore + toneScore + epoqueScore,
        });
        return acc;
    }, []).sort((a, b) => b.score - a.score ).slice(0, 3);
    
    return recommandation;
}

export function getToneNumber(tone: Book["tone"]): number {
    switch (tone) {
        case "dark":
            return 1;
        case "neutral":
            return 2;
        case "light":
            return 3;
        default:
            return 0;
    }
}

export function getPageScore(totalPages: number) {
    if(totalPages <= 250) return 1;
    if(totalPages > 250 && totalPages <= 500 ) return 2;
    if(totalPages > 500) return 3;
    return 0;
}
 