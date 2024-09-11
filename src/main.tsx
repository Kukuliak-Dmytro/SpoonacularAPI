import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Search from './Pages/Search/Search.tsx'
import App from './App.tsx';
import Recipe from './Pages/Recipe/Recipe.tsx';
import { BrowserRouter, createBrowserRouter } from "react-router-dom";

import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App></App>
    </BrowserRouter>
  </StrictMode>,
)
