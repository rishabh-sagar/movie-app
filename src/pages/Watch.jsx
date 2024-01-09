import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'


function WatchPage() {
	const { type, id } = useParams()
	
	return (
		<div className="h-full w-full">
			<iframe className="h-[40vh] w-[90vw] mt-[40vh] md:mt-0 md:h-full md:w-full" src={`https://vidsrc.to/embed/${type}/${id}`}     allowFullScreen
 ></iframe>
		</div>
	)
}
export default WatchPage