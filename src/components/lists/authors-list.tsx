import type { Book } from "@/types/book.schema";
import { Tablet } from "../ui/tablet";

type AuhtorsListProps = {
  authors: Book["authors"];
};

export function AuthorsList({ authors }: AuhtorsListProps) {
  if (!authors) return;

  return (
    authors.length > 0 && (
      <div className="flex flex-wrap items-center gap-1.5">
        <div className="flex flex-wrap gap-1.5">
          {authors.slice(0, 2).map((author) => {
            return (
              <span
                key={author}
                className="text-sm text-stone-700 after:ml-1.5 after:content-['·'] last:after:content-['']"
              >
                {author}
              </span>
            );
          })}
        </div>
        {authors.length > 2 && <Tablet text={`+${authors.length - 2}`} />}
      </div>
    )
  );
}
