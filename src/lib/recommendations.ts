import type {
  Book,
  RecommendedBook,
  ScoreBreakdown,
} from "@/types/book.schema";

export function getNextReads(
  bookId: Book["id"],
  books: Book[],
): RecommendedBook[] {
  const currentBook = books.find((b: Book) => b.id === bookId);

  if (!currentBook) return [];

  const unreadBooks = books.filter((b: Book) => b.status === "unread");

  const scoredBooks = unreadBooks.reduce<RecommendedBook[]>((acc, book) => {
    const pageDiff = getScoreDiff(
      getPageCountScore(currentBook.pageCount),
      getPageCountScore(book.pageCount),
    );
    const toneDiff = getScoreDiff(
      getToneScore(currentBook.tone),
      getToneScore(book.tone),
    );
    const publicationDateDiff = getScoreDiff(
      getPublicationDateScore(currentBook.publishedDate),
      getPublicationDateScore(book.publishedDate),
    );

    const pageScore = getScore(pageDiff, 0.4);
    const toneScore = getScore(toneDiff, 0.4);
    const publicationDateScore = getScore(publicationDateDiff, 0.2);

    acc.push({
      ...book,
      diversityScore: pageScore + toneScore + publicationDateScore,
      breakdown: {
        pageDiff,
        toneDiff,
        publicationDateDiff,
        pageScore,
        toneScore,
        publicationDateScore,
      },
    });
    return acc;
  }, []);

  return scoredBooks
    .sort((a, b) => b.diversityScore - a.diversityScore)
    .slice(0, 3)
    .map((book) => {
      return {
        ...book,
        justification: buildJustification(book.breakdown),
      };
    });
}

function buildJustification(breakdown: ScoreBreakdown): string {
  const {
    pageScore,
    toneScore,
    publicationDateScore,
    pageDiff,
    publicationDateDiff,
    toneDiff,
  } = breakdown;
  const justification = [
    {
      score: pageScore,
      diff: pageDiff,
      text:
        pageDiff > 0 ? "une lecture plus longue" : "une lecture plus courte",
    },
    {
      score: toneScore,
      diff: toneDiff,
      text: toneDiff > 0 ? "un ton plus lumineux" : "un ton plus sombre",
    },
    {
      score: publicationDateScore,
      diff: publicationDateDiff,
      text:
        publicationDateDiff > 0
          ? "une époque plus ancienne"
          : "une parution plus récente",
    },
  ];

  return justification
    .filter((b) => b.diff !== 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 2)
    .map((b) => b.text)
    .join(", ");
}

function getScoreDiff(
  currentScore: number | undefined,
  bookScore: number | undefined,
) {
  if (currentScore === undefined || bookScore === undefined) return 0;
  return bookScore - currentScore;
}

function getScore(score: number, weight: number): number {
  return (weight * Math.abs(score)) / 2;
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
  if (!totalPages) return;
  if (totalPages <= 250) return 1;
  if (totalPages <= 500) return 2;
  return 3;
}

function getPublicationDateScore(
  publishedDate: Book["publishedDate"],
): number | undefined {
  if (!publishedDate) return;

  const publicationYear = Number(publishedDate?.slice(0, 4));
  const currentYear = new Date().getFullYear();
  const age = currentYear - publicationYear;

  if (age <= 10) return 1;
  if (age <= 75) return 2;
  return 3;
}
