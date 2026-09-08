import { NavLink } from "react-router";

export function Header() {
    return (
        <header>
            <nav>
                <NavLink to="/" end>
                    Bibliothèque
                </NavLink>
                <NavLink to="/search" end>
                    Recherche
                </NavLink>
            </nav>
        </header>
    )
}