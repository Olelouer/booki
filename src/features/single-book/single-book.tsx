import { useParams } from "react-router"

export function SingleBook() {
    const { id } = useParams();
    return(
        <>
            <p>Hello {id}</p>
        </>
    )
}