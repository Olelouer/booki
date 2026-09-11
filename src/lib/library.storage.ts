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

export function getYearPagesCount() {
    const { success, library } = getBooks();
    if(!success) {
        return 0;
    }
    console.log()

    return library.reduce((acc, book) => {
        if(book.startedAt && book.currentPage && book.startedAt.slice(0,4) === new Date().getFullYear().toString()) {
            return acc + book.currentPage;
        }
        return acc;
    }, 0);
}