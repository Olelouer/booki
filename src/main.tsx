import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import { BookSearch } from './features/search/book-search'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <BookSearch />
    </BrowserRouter>
  </StrictMode>
  ,
)
