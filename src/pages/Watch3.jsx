import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'


function WatchPage3() {
	const { type, id } = useParams()
	const newtype =type==="tv" ? "embedtvfull" :"embed"
	return (
		<div className="h-full w-full">
			<iframe className="h-full w-full" src={`https://www.2embed.cc/${newtype}/${id}`}     allowFullScreen
 ></iframe>
		</div>
	)
}
export default WatchPage3