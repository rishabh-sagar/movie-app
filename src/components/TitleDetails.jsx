import React, { useState } from 'react'

import Card from './Card'
import TitleOverview from './TitleOverview'
import { Link } from 'react-router-dom'

function TitleDetails({ title, id, type }) {
  return (
    <div
      className="md:h-5/6 bg-fixed bg-cover bg-center py-8 px-8"
      style={{ backgroundImage: `url(${title.backdrop_path})` }}
    >
      <div className="w-full flex flex-col max-w-5xl m-auto sm:flex-row items-center sm:items-start rounded-2xl p-2 shadow-xl backdrop-filter backdrop-brightness-75 dark:backdrop-brightness-50 backdrop-blur-md">
        <div className="w-auto sm:w-80 object-cover">
          <Card image={title.poster_path} title={title.name} />
        </div>
        <div className="flex-1 px-2 sm:px-8 py-4 space-y-3 text-white dark:text-light-800">
          <a href={title.homepage}>
            <h2 className="text-3xl font-bold text-light-500">{title.name}</h2>
          </a>
          <div className="flex flex-wrap">
            {title.genres.map(genre => (
              <span key={genre.id} className="px-2 text-sm m-1 rounded-full border border-light-800">{genre.name}</span>
            ))}
          </div>
          <div>
            <h3 className="font-bold uppercase">Plot</h3>
            <TitleOverview text={title.overview} className="text-sm" />
          </div>

          <hr className="border-2 w-1/3 mx-auto rounded-full border-true-gray-500/30" />

          <div className="flex flex-wrap justify-center text-center text-sm">
          <Link to={`/watchmain/${type}/${id}`}>
  <div className="m-2 flex items-center mr-4">
    <button type="button" class="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-full text-sm px-4 py-2 text-center">Watch Ad-Free</button>
  </div>
</Link>
<Link to={`/watch/${type}/${id}`}>
  <div className="m-2 flex items-center mr-4">
    <button type="button" class="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-full text-sm px-4 py-2 text-center">Watch (Server 1)</button>
  </div>
</Link>
<Link to={`/watch2/${type}/${id}`}>
  <div className="m-2 flex items-center mr-4">
    <button type="button" class="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-full text-sm px-4 py-2 text-center">Watch (Server 2)</button>
  </div>
</Link>
<Link to={`/watch3/${type}/${id}`}>
  <div className="m-2 flex items-center mr-4">
    <button type="button" class="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-full text-sm px-4 py-2 text-center">Watch (Server 3)</button>
  </div>
</Link>

            
          </div>
          <div className="flex flex-wrap justify-center text-center text-sm">
          {title.release_date &&
              <div className="m-2">
                <h3 className="text-sm font-bold uppercase mb-2">Release date</h3>
                <span className="text-sm">
                  {new Date(title.release_date).toDateString()}
                </span>
              </div>
            }
            <div className="m-2">
              <h3 className="font-bold uppercase mb-2">Rating</h3>
              <span className="w-8 h-8 rounded-full bg-light-800 p-1.5 text-dark-800">
                {title.vote_average ? title.vote_average : "N/A"}
              </span>
            </div>
            {title.homepage &&
              <div className="m-2">
                <h3 className="font-bold uppercase mb-2">Homepage</h3>
                <a className="capitalize text-blue-200" href={title.homepage} target="_blank">
                  {new URL(title.homepage).hostname.split(".").slice(-2, -1)[0]}
                </a>
              </div>
            }
            <div className="m-2">
              <h3 className="font-bold uppercase mb-2">Runtime</h3>
              <span>{title.runtime ? `${title.runtime} min` : "N/A"}</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
export default TitleDetails