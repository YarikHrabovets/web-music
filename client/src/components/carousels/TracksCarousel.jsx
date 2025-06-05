import React, { useEffect, useContext, useState} from 'react'
import { observer } from 'mobx-react-lite'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {motion, AnimatePresence} from 'framer-motion'
import { slideVariants } from '../../animations/slideVariants'
import { getTracks } from '../../api/musicApi'
import { Context } from '../../main'
import TrackCard from './TrackCard'
import Spinner from '../ui/Spinner'
import TrackViewModal from '../modals/TrackViewModal'

function TrackCarousel({limit, title, tags}) {
    const { music } = useContext(Context)
    const [offsetStart, setOffSetStart] = useState(0)
    const [direction, setDirection] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isViewOpen, setIsViewOpen] = useState(false)
    const [trackData, setTrackData] = useState(null)

    const openModal = (track) => {
        setTrackData(track)
        setIsViewOpen(true)
    }

    const closeModal = () => {
        setIsViewOpen(false)
        setTrackData(null)
    }

    const fetchTrack = (isForward) => {
        setDirection(isForward ? 'right' : 'left')
        setIsLoading(true)
        const nextOffset = isForward ? offsetStart + limit + 1 : Math.max(0, offsetStart - limit - 1)
        getTracks({limit, offset: nextOffset, tags, order: 'popularity_month', include: 'musicinfo'})
        .then(data => {
            music.setTracks(title, data.results)
            setOffSetStart(nextOffset)
            setIsLoading(false)
        })
        .catch(error => console.log(error))
    }

    useEffect(() => {
        fetchTrack()
    }, [])
    
    if (!music.tracks.get(title)) {
        return (
            <div className='mt-5'>
                <div className='flex justify-center'>
                    <div className='block'>
                        <h3 className='text-2xl font-bold'>{title}</h3>
                        <div className='flex justify-center mt-3'>
                            <Spinner size='sm' />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className='mt-5 mb-16'>
            <div className='flex justify-center'>
                <div className='block w-2/3'>
                    <div className='flex justify-between'>
                        <h3 className='text-2xl font-bold'>{title}</h3>
                        <div>
                            <button onClick={() => fetchTrack(false)} disabled={offsetStart === 0} className='border-2 px-2 py-1 me-1 transition-colors disabled:bg-neutral-700 disabled:text-neutral-800 disabled:border-none text-white rounded-full border-custom-black bg-custom-black/70 hover:bg-custom-black/10 active:bg-custom-black/70 focus:outline-none focus:ring focus:ring-neutral-600'><FontAwesomeIcon icon={faArrowLeft} /></button>
                            <button onClick={() => fetchTrack(true)} className='border-2 px-2 py-1 transition-colors text-white rounded-full border-custom-black bg-custom-black/70 hover:bg-custom-black/10 active:bg-custom-black/70 focus:outline-none focus:ring focus:ring-neutral-600'><FontAwesomeIcon icon={faArrowRight} /></button>
                        </div>
                    </div>
                    <div className='relative mt-3'>
                        {isLoading ? (
                           <div className='flex justify-center'>
                                <Spinner size='sm' />
                           </div>
                        ) : (
                            <AnimatePresence custom={direction} mode='wait'>
                                <motion.div
                                    key={offsetStart}
                                    custom={direction}
                                    variants={slideVariants}
                                    initial='enter'
                                    animate='center'
                                    exit='exit'
                                    transition={{ duration: 0.5 }}
                                    className='flex justify-center gap-5'
                                >
                                    {music.tracks.get(title).map(track => 
                                        <TrackCard key={track.id} data={track} openModal={openModal} />
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        )}
                    </div>
                </div>
            </div>
            {isViewOpen && <TrackViewModal data={trackData} openModal={openModal} closeModal={closeModal} />}
        </div>
    )
}

export default observer(TrackCarousel)
