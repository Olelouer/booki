import { getCacheTTL, setCacheTTL } from "../../utils/cache";
import { BooksListSchemaGoogle, type BookGoogle } from "../../types/book.schema";
import * as z from 'zod';
const apiKey = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;
const baseUrl = import.meta.env.VITE_GOOGLE_BOOKS_URL;

export async function searchBooks(query: string): Promise<BookGoogle[]>  {
    const cachedData: BookGoogle[] | null = getCacheTTL(query);

    if(cachedData) return cachedData;

    try {
        const response = await fetch(`${baseUrl}volumes?q=${encodeURIComponent(query)}&key=${apiKey}&maxResults=40`);
        if (!response.ok) {
            throw new Error(`Statut de la réponse : ${response.status}`);
        }
        const result = await response.json();
        const books = BooksListSchemaGoogle.parse(result);
        setCacheTTL(query, books.items);
        return books.items;
    } catch (error: unknown) {
        if (error instanceof z.ZodError) {
            console.error("La validation a échouée", error.issues);
        } else if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error("Une erreur est survenue lors du chargement des livres veuillez réessayer plus tard.");
        }
        return [];
    }
}