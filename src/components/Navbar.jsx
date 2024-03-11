import React from 'react'
import { Link } from 'react-router-dom'

// import GithubLogoDark from '../assests/github-logo-dark.png'
// import GithubLogoLight from '../assests/github-logo-light.png'

export default function Navbar({ darkMode, setDarkMode, brand }) {
  return (
    <nav className="flex justify-between px-4 sm:px-0 sm:justify-around items-center py-2 sticky z-50 top-0 backdrop-filter backdrop-brightness-125 dark:backdrop-brightness-75 backdrop-blur-lg w-full">
      <Link to="/">
        <h2 className="text-xl font-bold text-teal-500">Movie App</h2>
      </Link>
      <div className="flex space-x-12">
        {/* <span className="flex space-x-4 items-center">
          
          <a href="" target="_blank">
            <img 
              className="w-8" 
              src={darkMode ? GithubLogoLight : GithubLogoDark} 
              alt="GitHub logo"
            />
          </a>
        </span> */}
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="text-yellow-500 dark:text-blue-300 focus:outline-none active:animate-spin"
        >
          {darkMode 
            ? <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
            : <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
          }
        </button>
      </div>
    </nav>
  )
}