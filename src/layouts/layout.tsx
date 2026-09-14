import { Header } from "@/components/header";
import { Outlet } from "react-router";

export function Layout() {
    return (
        <div className="mx-auto max-w-[1120px] px-10 pt-8 pb-28">
            <Header />
            <main>
                <Outlet />
            </main>
        </div>
    )
}