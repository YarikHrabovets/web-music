import React, { useState, useContext, useEffect } from 'react'
import { Context } from '../../main'
import { getTracks } from '../../api/musicApi'
import Spinner from '../ui/Spinner'
import TrackCard from '../carousels/TrackCard'

function TrackSimilar({title, tags, onTrackClick}) {
    const { music } = useContext(Context)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getTracks({limit: 9, tags: tags.join(',')})
        .then((data) => {
            music.setTracks(title, data.results)
            setIsLoading(false)
        })
        .catch(error => console.log(error))
    }, [])

    if (isLoading || !music.tracks.get(title)) {
        return (
            <div className='flex justify-center items-center'>
				<Spinner size='md' />
			</div>
        )
    }

    return (
        <div className='grid grid-cols-[repeat(auto-fit,_minmax(150px,_12rem))] justify-center gap-4'>
            {music.tracks.get(title).map(track => 
                <TrackCard key={track.id} data={track} openModal={onTrackClick} />
            )}
        </div>
    )
}

export default TrackSimilar
