import { useState } from 'react';
import { type BookGoogle, type Book, type Tone, TONE } from '@/types/book.schema'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

type PropsAddBookModal = {
    bookGoogle: BookGoogle,
    open: boolean,
    onOpenChange: (open: boolean) => void,
    addBook: (book: Book) => void
}

export function AddBookModal({ bookGoogle, open, onOpenChange, addBook }: PropsAddBookModal) {
    const [libraryBook, setLibraryBook] = useState<Book>({ book: bookGoogle, tone: "neutre", status: "non lu" });
    const bookInfo = bookGoogle.volumeInfo;

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Ajouter {bookInfo.title} à votre bibliothèque</DialogTitle>
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
                                book: {
                                    ...libraryBook.book,
                                    volumeInfo: {
                                        ...libraryBook.book.volumeInfo,
                                        pageCount: Number(e.target.value)
                                    }
                                }
                            })
                        }}
                        defaultValue={Number(bookInfo.pageCount) ?? ''}
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
                        value={libraryBook.tone}
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