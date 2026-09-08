import { type Book, LibraryBooksListSchema, type GetBooksResult } from '@/types/book.schema'
import * as z from 'zod';

const LIBRARY_KEY = "library:books";

export function addBook(book: Book): void {
    const { success, library } = getBooks();
    if (!success) return;

    const isDoublon = library.some(b => b.id === book.id);

    if (isDoublon) {
        console.warn("Ce livre est déjà présent dans votre bibliothèque");
        return;
    }

    library.push(book);
    localStorage.setItem(LIBRARY_KEY, JSON.stringify(library));
}

export function getBooks(): GetBooksResult {
    const storedBooks = localStorage.getItem(LIBRARY_KEY);
    let message = "Une erreur est survenue lors de la lecture de la bibliothèque";
    if (storedBooks !== null) {
        try {
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
    return {
        success: true,
        library: []
    };
}

export function getSingleBook(bookId: string): Book | undefined {
    const { success, library } = getBooks();
    if (!success) return;

    return library.find((book) => book.id === bookId);
}

export function removeBook(bookId: string): void {
    const { success, library } = getBooks();
    if (!success) return;

    const filteredLibrary = library.filter(book => book.id !== bookId);
    localStorage.setItem(LIBRARY_KEY, JSON.stringify(filteredLibrary));
}