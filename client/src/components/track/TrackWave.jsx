import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

function TrackWave({ rawPeaks, isPlaying, audioRef, barCount=64 }) {
    if (!rawPeaks) {
        return (
            <></>
        )
    }

    const peaks = JSON.parse(rawPeaks).peaks
    const [barHeights, setBarHeights] = useState(new Array(barCount).fill(0))

    const update = () => {
        const audio = audioRef.current
        if (!audio || !audio.duration || !peaks.length) return
        const progress = audio.currentTime / audio.duration
        const peakIndex = Math.floor(progress * peaks.length)
        const half = Math.floor(barCount / 2)
        const start = Math.max(peakIndex - half, 0)
        const end = start + barCount
        const segment = peaks.slice(start, end)
        setBarHeights(segment)
    }

    useEffect(() => {
        const interval = setInterval(() => {
            update()
        }, 50)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className='flex items-end gap-[2px] h-24 w-full ps-3 mt-24 overflow-hidden'>
            {barHeights.map((h, index) => (
                <motion.div
                    key={index}
                    className={
                        isPlaying ?
                        'bg-gradient-to-t from-indigo-500 via-purple-500/75 to-pink-500/75 transition-all duration-75 rounded-sm'
                        :
                        'bg-gradient-to-t from-indigo-500 via-purple-500/75 to-pink-500/75 rounded-sm'
                    } 
                    animate={{ y: `${h}%` }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    style={{
                        width: `${100 / barCount}%`,
                        height: '100%'
                    }}
                ></motion.div>
            ))}
        </div>
    )
}

export default TrackWave
