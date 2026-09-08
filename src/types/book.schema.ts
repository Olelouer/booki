import * as z from "zod"

export const TONE = ["sombre", "neutre", "lumineux"] as const;
export const BOOK_STATUS = ["non lu", "terminé", "en cours", "abandonné"] as const;
export type Tone = (typeof TONE)[number];

export const BookSchema = z.object({
    id: z.string(),
    title: z.string(),
    imageLinks: z.string().optional(),
    infoLink: z.string().optional(),
    categories: z.array(z.string()).optional(),
    description: z.string().optional(),
    subtitle: z.string().optional(),
    authors: z.array(z.string()).optional(),
    language: z.string().optional(),
    pageCount: z.number().optional(),
    publisher: z.string().optional(),
    publishedDate: z.string().optional(),
    tone: z.enum(TONE).optional().nullable(),
    status: z.enum(BOOK_STATUS).optional().nullable(),
    startedAt: z.iso.date().optional(),
    finishedAt: z.iso.date().optional(),
});

export type Book = z.infer<typeof BookSchema>;

export const LibraryBooksListSchema = z.array(
    BookSchema.nullable()
        .catch(ctx => {
            console.warn(ctx.issues);
            return null;
        })).transform(books => books.filter((book): book is Book => book !== null));

export type GetBooksResult = {
  success: boolean;
  library: Book[];
};