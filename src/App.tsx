import { Route, Routes } from 'react-router'
import { Library } from './features/library/library'
import { BookSearch } from './features/books-search/books-search'
import { Layout } from './layouts/layout'
import { SingleBook } from './features/single-book/single-book'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Library />} />
        <Route path="/search" element={<BookSearch />} />
        <Route path="book/:id" element={<SingleBook />}/>
      </Route>
    </Routes>
  )
}

export default App
