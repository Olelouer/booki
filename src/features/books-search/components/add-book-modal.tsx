import { useState } from 'react';
import { type Book, type Tone, TONE } from '@/types/book.schema'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

type PropsAddBookModal = {
    book: Book,
    open: boolean,
    onOpenChange: (open: boolean) => void,
    addBook: (book: Book) => void
}

export function AddBookModal({ book, open, onOpenChange, addBook }: PropsAddBookModal) {
    const [libraryBook, setLibraryBook] = useState<Book>({ ...book, tone: "neutre", status: "non lu" });

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Ajouter {book.title} à votre bibliothèque</DialogTitle>
                </DialogHeader>
                <form
                    onSubmit={e => {
                        e.preventDefault();
                        addBook(libraryBook);
                    }}
                >
                    <label>Nombre de pages :</label>
                    <input
                        type="number"
                        name="pages"
                        id="pages"
                        onChange={(e) => {
                            setLibraryBook({
                                ...libraryBook,
                                pageCount: Number(e.target.value)
                            })
                        }}
                        defaultValue={Number(book.pageCount) ?? ''}
                        required
                    />
                    <label>Ton du livre :</label>
                    <select
                        onChange={(e) => {
                            setLibraryBook({
                                ...libraryBook,
                                tone: e.target.value as Tone
                            })
                        }}
                        value={libraryBook.tone as Tone}
                    >
                        {TONE.map((tone: Tone) => {
                            return <option key={tone} value={tone}>{tone}</option>
                        }
                        )}
                    </select>
                    <button>Ajouter le livre</button>
                </form>
            </DialogContent>
        </Dialog>
    )
}