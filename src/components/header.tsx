import { NavLink } from "react-router";
import { cn } from "cn"

export function Header() {
    return (
        <header className="flex items-center gap-8 mb-12">
            <span className="font-serif text-lg">Lectures.</span>
            <nav className="flex items-center gap-1.5">
                <NavLink 
                    className={({ isActive }) => cn("text-sm px-3.5 py-1.5 duration-100 rounded-2xl", isActive ? "text-accent-foreground bg-accent" : "text-stone-500 hover:text-black")}
                    to="/" 
                    end
                >
                    Bibliothèque
                </NavLink>
                <NavLink 
                    className={({ isActive }) => cn("text-sm px-3.5 py-1.5 duration-100 rounded-2xl", isActive ? "text-accent-foreground bg-accent" : "text-stone-500 hover:text-black")}
                    to="/search" 
                    end
                >
                    Recherche
                </NavLink>
            </nav>
        </header>
    )
}