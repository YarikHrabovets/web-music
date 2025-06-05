import React, { useState, useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../../main'
import { getTracks } from '../../api/musicApi'
import Spinner from '../ui/Spinner'
import TrackCard from '../carousels/TrackCard'

function TrackSimilar({title, tags, openModal}) {
    const { music } = useContext(Context)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getTracks({limit: 9, fuzzytags: tags.slice(0, 2).join(',')})
        .then((data) => {
            music.setTracks(title, data.results)
            setIsLoading(false)
        })
        .catch(error => console.log(error))
    }, [tags, title])

    if (isLoading || !music.tracks.get(title)) {
        return (
            <div className='flex justify-center items-center'>
				<Spinner size='md' />
			</div>
        )
    }

    return (
        <div className='grid grid-cols-[repeat(auto-fit,_minmax(150px,_12rem))] justify-center gap-4'>
            {music.tracks.get(title).length === 0 ?
                <h3 className='text-center text-xl font-bold'>Nothing to display</h3>
                :
                music.tracks.get(title).map(track => 
                    <TrackCard key={track.id} data={track} openModal={openModal} />
            )}
        </div>
    )
}

export default observer(TrackSimilar)
