import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/search-input";

type BookSearchFormProps = {
  query: string;
  setQuery: (value: string) => void;
  onSubmit: () => void;
};

export function BookSearchForm({
  query,
  setQuery,
  onSubmit,
}: BookSearchFormProps) {
  return (
    <div className="mb-8 flex flex-col-reverse gap-4 md:flex-row md:gap-8">
      <form
        className="flex w-full gap-2 md:w-2/3"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <SearchInput
          className="w-full"
          placeholder="Titre, auteur..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button type="submit" className="h-13 px-7 text-base">
          Chercher
        </Button>
      </form>
      <p className="font-serif text-stone-500 md:w-1/3">
        Trouvez votre prochaine lecture et ajoutez-la en quelques secondes à
        votre bibliothèque.
      </p>
    </div>
  );
}
