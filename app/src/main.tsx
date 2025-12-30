import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import AwardsPage from './components/AwardsPage.tsx'
import MarkdownPage from './components/MarkdownPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/awards" element={<AwardsPage />} />
        <Route path="/projects/codeit/:project/:page" element={<MarkdownPage />} />
        <Route path="/projects/codeit/:project" element={<MarkdownPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
