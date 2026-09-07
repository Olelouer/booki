import { type Book, BooksListSchemaLibrary } from '@/types/book.schema'
import * as z from 'zod';

export function addBook(book: Book): void {
    const storedBooks = localStorage.getItem("library:books");
    let library: Book[] = [];
    if (storedBooks !== null) {
        try {
            library = BooksListSchemaLibrary.parse(JSON.parse(storedBooks));
        } catch (error) {
            if (error instanceof z.ZodError) {
                console.error("Une erreur est survenue lors de l'ajout du livre", error.issues);
            } else if (error instanceof Error) {
                console.error("Une erreur est survenue lors de l'ajout du livre", error.message);
            } else {
                console.error("Une erreur est survenue lors de l'ajout du livre");
            }
            return;
        }
    }
    library.push(book);

    localStorage.setItem("library:books", JSON.stringify(library));
}

export function getLibrary() {

}