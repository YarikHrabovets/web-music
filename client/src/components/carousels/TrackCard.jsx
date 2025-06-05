import React from 'react'
import { observer } from 'mobx-react-lite'
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function TrackCard({data, openModal}) {

    const compress = (string) => {
        if (string.length >= 20) {
            return string.slice(0, 15) + '...'
        }

        return string
    }

    return (
        <div className='group relative break-words cursor-pointer transition-all hover:scale-110' onClick={() => openModal(data)}>
            <div className='relative'>
                <img className='h-48 w-48 group-hover:brightness-50 rounded-md' src={data.image} alt={'Image of ' + data.name} />
                <FontAwesomeIcon className='hidden group-hover:block text-custom-pink absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' icon={faCirclePlay} size='4x' />
            </div>
            <p className='break-all'>{compress(data.name)}</p>
            <p className='text-neutral-400'>{compress(data.artist_name)}</p>
        </div>
    )
}

export default observer(TrackCard)
