import React, { useEffect, useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlay, faCirclePause, faForward, faBackward } from '@fortawesome/free-solid-svg-icons'
import TrackWave from './TrackWave'

function TrackPlayer({ src, peaks }) {
    const audioRef = useRef(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [progress, setProgress] = useState(0)
    const [duration, setDuration] = useState(0)

    useEffect(() => {
        setIsPlaying(false)
        setProgress(0)
        setDuration(0)
    }, [src, peaks])

    const togglePlay = () => {
        const audio = audioRef.current
        if (!audio) return
        if (isPlaying) audio.pause()
        else audio.play()
        setIsPlaying(!isPlaying)
    }

    const onTimeUpdate = () => {
        const audio = audioRef.current
        if (!audio) return
        setProgress((audio.currentTime / audio.duration) * 100)
    }

    const onLoadedMetadata = () => {
        const audio = audioRef.current
        if (audio) setDuration(audio.duration)
    }

    const onChange = (e) => {
        const audio = audioRef.current
        const value = e.target.value
        if (!audio) return
        audio.currentTime = (value / 100) * audio.duration
        setProgress(value)
    }

    const formatTime = (time) => {
        if (!time) return '00:00'
        const minutes = Math.floor(time / 60).toString().padStart(2, '0')
        const seconds = Math.floor(time % 60).toString().padStart(2, '0')
        return `${minutes}:${seconds}`
    }

    return (
        <>
            <audio
                ref={audioRef}
                src={src}
                onTimeUpdate={onTimeUpdate}
                onLoadedMetadata={onLoadedMetadata}
            />
            <div className='flex items-center gap-2 mt-4 text-sm font-bolder'>
                <span>{formatTime((progress / 100) * duration)}</span>
                <input
                    type='range'
                    value={Number.isNaN(progress) ? 0 : progress}
                    onChange={onChange}
                    className='w-full appearance-none bg-custom-dark h-3 rounded-lg accent-custom-blue cursor-pointer'
                />
                <span>{formatTime(duration)}</span>
            </div>
            <div className='flex justify-center gap-6 mt-4'>
                <button className='text-indigo-400/75 hover:scale-110 transition'>{<FontAwesomeIcon icon={faBackward} size='3x' />}</button>
                <button
                    onClick={togglePlay}
                    className='text-indigo-400/75 hover:scale-110 transition'
                    >
                    {isPlaying ? <FontAwesomeIcon icon={faCirclePause} size='3x' /> : <FontAwesomeIcon icon={faCirclePlay} size='3x' />}
                </button>
                <button className='text-indigo-400/75 hover:scale-110 transition'>{<FontAwesomeIcon icon={faForward} size='3x' />}</button>
            </div>
            <TrackWave rawPeaks={peaks} isPlaying={isPlaying} audioRef={audioRef} />
        </>
    )
}

export default TrackPlayer
