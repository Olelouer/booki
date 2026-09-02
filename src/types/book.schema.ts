import * as z from "zod"

export const BookSchemaOpenLibrary = z.object({
    title: z.string(),
    key: z.string(),
    author_name: z.array(z.string()).optional(),
    first_publish_year: z.number().optional(),
    edition_count: z.number().optional()
});

export type BookOpenLibrary = z.infer<typeof BookSchemaOpenLibrary>;

export const BookSchemaGoogleAPI = z.object({
    id: z.string(),
    volumeInfo: z.object({
        title: z.string(),
        publishedDate: z.string().optional(),
        language: z.string().optional(),
        pageCount: z.number().optional(),
    }),
});

export type BookGoogle = z.infer<typeof BookSchemaGoogleAPI>;

export const BooksListSchemaGoogle = z.object({
    totalItems: z.number().optional(),
    items: z.array(BookSchemaGoogleAPI.nullable().catch(ctx => {
        console.warn(ctx.issues);
        return null;
    })).transform(books => books.filter(book => book !== null))
});

export type GoogleAPIResponse = z.infer<typeof BooksListSchemaGoogle>;

export const DocsSchema = z.object({
    docs: z.array(BookSchemaOpenLibrary.nullable().catch((ctx) => {
        console.warn(ctx.issues);
        return null;
    })).transform(books => books.filter(book => book !== null))
});

export type DocsResponse = z.infer<typeof DocsSchema>;