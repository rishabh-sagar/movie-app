import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './global.css'

import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import TitlePage from './pages/TitlePage'
import NotFoundPage from './pages/NotFoundPage'
import WatchPage from './pages/Watch'
import WatchPage2 from './pages/Watch2'
import WatchPage3 from './pages/Watch3'


function App() {
  const [darkMode, setDarkMode] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches ? true : false
  )

  return (
    <div className={`App ${darkMode && "dark"}`}>
    <Router>
      <div className="bg-light-800 dark:bg-dark-600 h-screen overflow-x-hidden">
        <Navbar 
          darkMode={darkMode}
          setDarkMode={setDarkMode} 
          brand="React IMDB" 
        />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/title/:type/:id">
            <TitlePage />
          </Route>
          <Route path="/watch/:type/:id">
            <WatchPage />
          </Route>
          <Route path="/watch2/:type/:id">
            <WatchPage2 />
          </Route>
          <Route path="/watch3/:type/:id">
            <WatchPage3 />
          </Route>
          <Route path="*">
            <NotFoundPage />
          </Route>
        </Switch>
      </div>
    </Router>
    </div>
  )
}

export default App