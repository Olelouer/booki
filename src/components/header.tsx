import { NavLink } from "react-router";
import { cn } from "cn";

export function Header() {
  return (
    <header className="mb-12 flex items-center gap-8">
      <span className="font-serif text-lg">Booki.</span>
      <nav className="flex items-center gap-1.5">
        <NavLink
          className={({ isActive }) =>
            cn(
              "rounded-2xl px-3.5 py-1.5 text-sm duration-100",
              isActive
                ? "bg-accent text-accent-foreground"
                : "text-stone-500 hover:text-black",
            )
          }
          to="/"
          end
        >
          Bibliothèque
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            cn(
              "rounded-2xl px-3.5 py-1.5 text-sm duration-100",
              isActive
                ? "bg-accent text-accent-foreground"
                : "text-stone-500 hover:text-black",
            )
          }
          to="/search"
          end
        >
          Recherche
        </NavLink>
      </nav>
    </header>
  );
}
