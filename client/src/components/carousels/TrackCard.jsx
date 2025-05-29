import React, { useState } from 'react'
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TrackViewModal from '../modals/TrackViewModal'

function TrackCard({data}) {
    const [isViewOpen, setIsViewOpen] = useState(false)

    const compress = (string) => {
        if (string.length >= 20) {
            return string.slice(0, 15) + '...'
        }

        return string
    }

    if (isViewOpen) {
        return <TrackViewModal setIsViewOpen={setIsViewOpen} data={data} />
    }

    return (
        <div className='group relative break-words h-48 w-48 cursor-pointer transition-all hover:scale-110' onClick={() => setIsViewOpen(true)}>
            <img className='h-full group-hover:brightness-50 rounded-md' src={data.image} alt={'Image of ' + data.name} />
            <FontAwesomeIcon className='hidden group-hover:block text-custom-pink absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' icon={faCirclePlay} size='4x' />
            <p className='break-all'>{compress(data.name)}</p>
            <p className='text-neutral-400'>{compress(data.artist_name)}</p>
        </div>
    )
}

export default TrackCard
