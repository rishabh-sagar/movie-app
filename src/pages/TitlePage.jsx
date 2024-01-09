import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import TitleDetails from '../components/TitleDetails'
import ActorList from '../components/ActorList'
import ActorDetails from '../components/ActorDetails'
import Loader from '../components/Loader'

import TMDB from '../API'

function TitlePage() {
	const { type, id } = useParams()
	const title = TMDB.getTitle(type, id)
	const actors = TMDB.getActors(type, id)
	const [loading, setLoading] = useState(true)
	const [selectedActorID, setSelectedActorID] = useState(null)
	const [selectedActor, setSelectedActor] = useState({})

	const fetchActor = async (id) => {
		setLoading(true)
		const actor = await TMDB.getActor(id)
		setSelectedActor(actor)
		setLoading(false)
	}

	useEffect(() => {
		if (!selectedActorID) return
		fetchActor(selectedActorID)
	}, [selectedActorID])

	return (
		<>
			{selectedActorID && 
				<ActorDetails 
					actor={selectedActor} 
					loading={loading}
					onClose={() => setSelectedActorID(null)} 
				/>
			}
			{title.data && <TitleDetails title={title.data} type={type} id={id} />}
			<div className="bg-[#1C1C1E] text-white p-4 mt-4 rounded-lg w-3/4 mx-auto">
    <table className="w-full table-fixed items-center text-center">
        <thead>
            <tr>
                <th className="px-4 py-2 border-b-2 border-[#4A4A4A]">Name</th>
                <th className="px-4 py-2 border-b-2 border-[#4A4A4A]">Service Quality</th>
                <th className="px-4 py-2 border-b-2 border-[#4A4A4A]">Animes Supported</th>
                <th className="px-4 py-2 border-b-2 border-[#4A4A4A]">Ads</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td className="px-4 py-2">Server1</td>
                <td className="px-4 py-2">Best</td>
                <td className="px-4 py-2">No</td>
                <td className="px-4 py-2">Very Less</td>
            </tr>
            <tr>
                <td className="px-4 py-2">Server2</td>
                <td className="px-4 py-2">OK OK</td>
                <td className="px-4 py-2">Yes</td>
                <td className="px-4 py-2">Highest Among Three</td>
            </tr>
            <tr>
                <td className="px-4 py-2">Server3</td>
                <td className="px-4 py-2">Worst Among Three</td>
                <td className="px-4 py-2">Yes</td>
                <td className="px-4 py-2">OK OK</td>
            </tr>
        </tbody>
    </table>
</div>

			{actors && 
				<ActorList 
					header="Cast" 
					actors={actors} 
					onClick={setSelectedActorID} 
				/>
			}
			{!(title.data || actors) && <Loader />}
		</>
	)
}
export default TitlePage