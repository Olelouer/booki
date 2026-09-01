import * as z from "zod"

export const BookSchema = z.object({
    title: z.string(),
    key: z.string(),
    author_name: z.array(z.string()).optional(),
    first_publish_year: z.number().optional(),
    edition_count: z.number().optional()
});

export type Book = z.infer<typeof BookSchema>;

export const DocsSchema = z.object({
    docs: z.array(BookSchema.catch((ctx) => {
        console.warn(ctx.issues);
        return null;
    }))
});

export type DocsResponse = z.infer<typeof DocsSchema>;