import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import { MediaPlayer, MediaProvider, Track } from '@vidstack/react';
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';
import axios from 'axios';

const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const API_BASE_URL = "https://api.themoviedb.org/3";


const WatchMain = () => {
  const { type, id } = useParams();
  const isMovie = type === 'movie';

  const [videoSources, setVideoSources] = useState([]);

  const [seasons, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [episodes, setEpisodes] = useState([]);
  const [selectedEpisode, setSelectedEpisode] = useState(1);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sources, setSources] = useState([]);
  const [sourcesingle, setSourcesingle] = useState([]);
  const [subtitles, setSubtitles] = useState([]);
  const [selectedSource, setSelectedSource] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = isMovie
          ? `https://vidsrc-api-ten.vercel.app/vidsrc/${id}`
          : `https://vidsrc-api-ten.vercel.app/vidsrc/${id}?s=${selectedSeason}&e=${selectedEpisode}`;

        const vsrcmeUrl = isMovie
          ? `https://vidsrc-api-ten.vercel.app/vsrcme/${id}`
          : `https://vidsrc-api-ten.vercel.app/vsrcme/${id}?s=${selectedSeason}&e=${selectedEpisode}`;

        const vidsrcResponse = await axios.get(apiUrl, {
          headers: {
            'Access-Control-Allow-Origin': 'https://movie-app.tech', // Replace with your domain
          },
        });

        const vsrcmeResponse = await axios.get(vsrcmeUrl, {
          headers: {
            'Access-Control-Allow-Origin': 'https://movie-app.tech', // Replace with your domain
          },
        });

        const vidsrcData = await vidsrcResponse.data;
        const vsrcmeData = await vsrcmeResponse.data;
        console.log([...vidsrcData, ...vsrcmeData])

        // Extract sources and subtitles separately
        const sourcesArray = [];
        const subtitlesArray = [];
        const combinedSources = [...vidsrcData, ...vsrcmeData].map(source => {

          if (typeof source.data !== 'object') {
            return source; // Skip processing if data is not an object
          }

          const sourceName = source.name;
          console.log(sourceName)
          const sourceFile = source.data.file.replace(/#.mp4/g, "");
          const sourceSubtitles = Array.isArray(source.data.sub) ? source.data.sub : [];

          // Add to sourcesArray if sourceFile exists
          if (sourceFile) {
            sourcesArray.push({ sourceName, link: sourceFile });
          }

          const subArray = sourceSubtitles.map(sub => ({
            lang: `${sub.lang}-${sourceName}`,
            URL: sub.file,
          }));
          subtitlesArray.push(...subArray);

          return {
            ...source,
            sources: sourceFile ? [{ src: sourceFile }] : [],
            subtitles: subArray,
          };
        });

        setVideoSources(combinedSources);
        setSources(sourcesArray);
        // console.log(sourcesArray)
        setSubtitles(subtitlesArray);
        setSourcesingle(sourcesArray[0]?.link)
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, seasons, episodes, selectedEpisode, selectedSeason, isMovie]);



  useEffect(() => {
    const fetchData = async () => {
      try {
        if (type !== 'movie') {
          const response = await fetch(`${API_BASE_URL}/${type}/${id}?api_key=${TMDB_API_KEY}`);
          const titleData = await response.json();
          console.log(titleData)
          if (titleData.seasons) {
            setSeasons(titleData.seasons);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [type, id]);

  useEffect(() => {
    if (selectedSeason !== 0 && type !== 'movie') {
      const selectedSeasonData = seasons.find(season => season.season_number === selectedSeason);
      if (selectedSeasonData) {
        setEpisodes(selectedSeasonData.episode_count);
      }
    }
  }, [selectedSeason, seasons, type]);

  const handleSeasonChange = event => {
    setSelectedSeason(parseInt(event.target.value));
    setSelectedEpisode(1); // Reset selected episode when a new season is chosen
  };

  const handleEpisodeChange = event => {
    setSelectedEpisode(parseInt(event.target.value));
  };



  const handleSourceChange = (event) => {
    console.log(sources)
    const sourceName = event.target.value;
    const selected = sources.find(source => source.sourceName === sourceName);
    setSelectedSource(selected);
    // console.log(selected)
    setSourcesingle(selected.link)
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen">Error: {error.message}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
      <div>
        {!isMovie && (
          <div className="mb-4">
            <label htmlFor="season" className="text-white mr-1">Select a Season:</label>
            <select id="season" value={selectedSeason} className='bg-gray-800 text-white px-2 py-1 rounded' onChange={handleSeasonChange}>
              {seasons.map(season => (
                <option key={season.id} value={season.season_number}>
                  Season {season.season_number}
                </option>
              ))}
            </select>

            <label htmlFor="episode" className=" mx-2 text-white">Select an Episode:</label>
            <select id="episode" value={selectedEpisode} className='bg-gray-800 text-white px-2 py-1 rounded' onChange={handleEpisodeChange}>
              {[...Array(episodes).keys()].map(i => (
                <option key={i + 1} value={i + 1}>
                  Episode {i + 1}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="sources" className="mr-2">
            Select Source:
          </label>
          <select
            id="sources"
            onChange={handleSourceChange}
            className="bg-gray-800 text-white px-2 py-1 rounded"
          >
            {sources.map(source => (
              <option key={source.sourceName} value={source.sourceName}>{source.sourceName}</option>
            ))}
          </select>
        </div>
      </div>


      <div className="w-[95vw] md:w-[60vw] h-[60vh]">
        <MediaPlayer title="Sprite Fight" src={sourcesingle}>
          <MediaProvider>
            {subtitles.length > 0 &&
              subtitles.map((data) => (
                <Track
                  src={data.URL}
                  kind="subtitles"
                  label={data.lang}
                  lang={data.lang}
                />
              ))}
          </MediaProvider>

          <DefaultVideoLayout icons={defaultLayoutIcons} />
        </MediaPlayer>
      </div>
    </div>
  );
};

export default WatchMain;
