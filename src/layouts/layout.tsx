import { Header } from "@/components/header";
import { Outlet } from "react-router";

export function Layout() {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
        </>
    )
}