import type { Book, RecommendedBook } from "@/types/book.schema";

export function getNextReads(bookId: Book["id"], books: Book[]): RecommendedBook[] {
    const currentBook = books.find((b: Book) => b.id === bookId);

    if (!currentBook) return [];

    const unreadBooks = books.filter((b: Book) => b.status === 'unread');

    return unreadBooks.reduce<RecommendedBook[]>((acc, book) => {
        const pageScore = calculateScore(getPageCountScore(currentBook.pageCount), getPageCountScore(book.pageCount), 0.4);
        const toneScore = calculateScore(getToneScore(currentBook.tone), getToneScore(book.tone), 0.4);
        const epoqueScore = calculateScore(getPublicationDateScore(currentBook.publishedDate), getPublicationDateScore(book.publishedDate), 0.2);
        
        acc.push({
            ...book,
            diversityScore: pageScore + toneScore + epoqueScore,
            justification: '' 
        });
        return acc;
    }, []).sort((a, b) => b.diversityScore - a.diversityScore).slice(0, 3);
}

function calculateScore(currentScore: number | undefined, bookScore: number | undefined, weight: number): number {
    if(currentScore === undefined || bookScore === undefined) return 0;

    return weight * (Math.abs(currentScore - bookScore)) / 2;
}

function getToneScore(tone: Book["tone"]): number | undefined {
    switch (tone) {
        case "dark":
            return 1;
        case "neutral":
            return 2;
        case "light":
            return 3;
        default:
            return;
    }
}

function getPageCountScore(totalPages: Book["pageCount"]): number | undefined {
    if(!totalPages) return;
    if (totalPages <= 250) return 1;
    if (totalPages <= 500) return 2;
    return 3;
}

function getPublicationDateScore(publishedDate: Book['publishedDate']): number| undefined {
    if(!publishedDate) return;

    const publicationYear = Number(publishedDate?.slice(0, 4));
    const currentYear = new Date().getFullYear();
    const age = currentYear - publicationYear;

    if (age <= 10) return 1;
    if (age <= 75) return 2;
    return 3;
}
