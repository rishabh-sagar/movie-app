import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_BASE_URL = "https://api.themoviedb.org/3";

function WatchPage2() {
    const { type, id } = useParams();
    const [seasons, setSeasons] = useState([]);
    const [selectedSeason, setSelectedSeason] = useState(1);
    const [episodes, setEpisodes] = useState([]);
    const [selectedEpisode, setSelectedEpisode] = useState(1);
    const [videoId, setVideoId] = useState(type==="movie"?`https://multiembed.mov/?video_id=${id}&tmdb=1`:`https://multiembed.mov/?video_id=${id}&tmdb=1&s=1&e=1`);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (type !== 'movie') {
                    const response = await fetch(`${API_BASE_URL}/${type}/${id}?api_key=${TMDB_API_KEY}`);
                    const titleData = await response.json();

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

    const handleWatchClick = () => {
        if (type !== 'movie') {
			console.log(`https://multiembed.mov/?video_id=${id}&tmdb=1&s=${selectedSeason}&e=${selectedEpisode}`)
            setVideoId(`https://multiembed.mov/?video_id=${id}&tmdb=1&s=${selectedSeason}&e=${selectedEpisode}`);
        }
    };

    return (
        <div className="h-full w-full">
            {type !== 'movie' ? (
                <div className="w-full h-full">
                    <div className="flex flex-wrap md:flex-row items-center space-x-2 my-4 ml-4">
					<label htmlFor="season" className="text-white mr-1">Select a Season:</label>
                    <select id="season" value={selectedSeason} onChange={handleSeasonChange}>
                        {seasons.map(season => (
                            <option key={season.id} value={season.season_number}>
                               Season {season.season_number}
                            </option>
                        ))}
                    </select>

                    <label htmlFor="episode" className=" mx-2 text-white">Select an Episode:</label>
                    <select id="episode" value={selectedEpisode} onChange={handleEpisodeChange}>
                        {[...Array(episodes).keys()].map(i => (
                            <option key={i + 1} value={i + 1}>
                                Episode {i + 1}
                            </option>
                        ))}
                    </select>
					<button type="button" class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-rounded-sm text-lg px-5 py-2.5 text-center me-2 mb-2" onClick={handleWatchClick}>Watch</button>
					</div>
 
					<iframe
                className="h-[40vh] w-[90vw] mt-[40vh] md:mt-0 md:h-full md:w-full"
                src={videoId}
                allowFullScreen
            ></iframe>
                </div>
            ):(
				<iframe
                className="h-[40vh] w-[90vw] mt-[40vh] md:mt-0 md:h-full md:w-full"
                src={videoId}
                allowFullScreen
            ></iframe>
			)}

        </div>
    );
}

export default WatchPage2;
