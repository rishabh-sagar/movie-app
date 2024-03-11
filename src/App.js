import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './global.css'

import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import TitlePage from './pages/TitlePage'
import NotFoundPage from './pages/NotFoundPage'
import WatchPage from './pages/Watch'
import WatchPage2 from './pages/Watch2'
import WatchPage3 from './pages/Watch3'
import WatchMain from './pages/Watch-Main'


function App() {
  const [darkMode, setDarkMode] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches ? true : false
  )

  return (
    <div className={`App text-white ${darkMode && "dark"}`}>
      <Router>
      <div className="bg-[#1C1C1C] h-screen overflow-x-hidden">
        <Navbar 
          darkMode={darkMode}
          setDarkMode={setDarkMode} 
          brand="React IMDB" 
        />
        <Routes>
  <Route exact path="/" element={<HomePage />} />
  <Route path="/title/:type/:id" element={<TitlePage />} />
  <Route path="/watch/:type/:id" element={<WatchPage />} />
  <Route path="/watchmain/:type/:id" element={<WatchMain />} />
  <Route path="/watch2/:type/:id" element={<WatchPage2 />} />
  <Route path="/watch3/:type/:id" element={<WatchPage3 />} />
  <Route path="*" element={<NotFoundPage />} />
</Routes>

      </div>
    </Router>
    </div>
  )
}

export default App