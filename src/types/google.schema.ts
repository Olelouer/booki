import * as z from 'zod'
import { BookSchema, type Book } from './book.schema';

export const GoogleBookSchema = z.object({
    id: z.string(),
    volumeInfo: z.object({
        title: z.string(),
        imageLinks: z.object({
            smallThumbnail: z.string().optional(),
            thumbnail: z.string().optional(),
        }).optional(),
        industryIdentifiers: z.array(
            z.object({
                type: z.string(),
                identifier: z.string()
            })
        ).optional(),
        infoLink: z.string().optional(),
        categories: z.array(z.string()).optional(),
        description: z.string().optional(),
        subtitle: z.string().optional(),
        authors: z.array(z.string()).optional(),
        publisher: z.string().optional(),
        publishedDate: z.string().optional(),
        language: z.string().optional(),
        pageCount: z.number().optional(),
    }),
});

export type GoogleBook = z.infer<typeof GoogleBookSchema>;

const googleBookToBook = (book: GoogleBook): Book => {
    return BookSchema.parse({
        googleId: book.id,
        title: book.volumeInfo.title,
        imageLinks: book.volumeInfo.imageLinks?.thumbnail,
        infoLink: book.volumeInfo.infoLink,
        categories: book.volumeInfo.categories,
        description: book.volumeInfo.description,
        subtitle: book.volumeInfo.subtitle,
        authors: book.volumeInfo.authors,
        language: book.volumeInfo.language,
        pageCount: book.volumeInfo.pageCount,
        publisher: book.volumeInfo.publisher,
        publishedDate: book.volumeInfo.publishedDate,
    })
}

export const GoogleBookToBookSchema = GoogleBookSchema.transform(googleBookToBook);

export const GoogleBooksListSchema = z.object({
    totalItems: z.number().optional(),
    items: z.array(GoogleBookToBookSchema.nullable().catch(ctx => {
        console.warn(ctx.issues);
        return null;
    })).transform(books => books.filter((book): book is Book => book !== null))
});

export type GoogleAPIResponse = z.infer<typeof GoogleBooksListSchema>;