import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { motion, AnimatePresence } from 'framer-motion'
import { slideInFromTop } from '../../animations/slideIn'
import { faXmark, faDownload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Badge from '../ui/Badge'
import TrackPlayer from '../track/TrackPlayer'
import TrackSimilar from '../track/TrackSimilar'

function TrackViewModal({data, openModal, closeModal}) {
    const [tags, setTags] = useState([])

    useEffect(() => {
        if (data?.musicinfo?.tags) {
            Object.entries(data.musicinfo.tags).map(([tag, tagElems]) => (
                tagElems.map(elem => (
                    setTags(prev => [...prev, elem])
                ))
            ))
        }
    }, [data])

    return (
        <AnimatePresence>
            <motion.div 
                className='overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-full bg-black bg-opacity-35'
                variants={slideInFromTop}
                initial='hidden'
                animate='visible'
                exit='exit'
            >
                <div className='relative mx-auto p-4 w-full max-h-full'>
                    <div className='relative rounded-lg shadow-sm bg-custom-black'>
                        <div className='flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-600'>
                            <h3 className='text-xl font-semibold'>Track View</h3>
                            <button className='text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-gray-800 hover:text-white' onClick={() => closeModal()}>
                                <FontAwesomeIcon icon={faXmark} />
                            </button>
                        </div>
                        <div className='p-4 md:p-5'>
                            <div className='flex'>
                                <div className='w-1/3 flex-auto'>
                                    <img className='w-80 h-80 rounded-md' src={data.image} alt={'Image of ' + data.name} />
                                    <div className='flex flex-wrap min-w-full gap-1 mt-3 mb-3'>
                                        {tags.map((tag, i) => <Badge key={i} title={tag} color='indigo' /> )}
                                    </div>
                                    {
                                        data.audiodownload_allowed && 
                                        <a className='px-4 py-2 block w-full text-center cursor-pointer font-bold text-custom-pink border-custom-pink border-2 bg-custom-pink/5 hover:bg-custom-pink/35 rounded-full' href={data.audiodownload}>
                                            Downdload <FontAwesomeIcon icon={faDownload} />
                                        </a>
                                    }
                                    {/* <p>{data.shareurl}</p> */}
                                </div>
                                <div className='w-2/3 flex-auto relative'>
                                    <div className='absolute inset-x-0 bottom-0 '>
                                        <p className='text-center font-bold text-4xl'>{data.name}</p>
                                        <p className='text-center text-neutral-400 text-lg'>{data.artist_name}</p>
                                        <TrackPlayer src={data.audio} peaks={data.waveform} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='border-t rounded-b border-gray-600 p-4 md:p-5'>
                            <h3 className='text-xl font-semibold mb-5'>You may also like</h3>
                            <TrackSimilar title={`${data.id}_similar`} tags={tags} openModal={openModal} />
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}

export default observer(TrackViewModal)
