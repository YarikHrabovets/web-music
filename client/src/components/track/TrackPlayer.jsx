import React, { useEffect, useState, useRef, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlay, faCirclePause, faForward, faBackward, faThumbsUp as solidThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp as regularThumbsUp } from '@fortawesome/free-regular-svg-icons'
import TrackWave from './TrackWave'
import { Context } from '../../main'

function TrackPlayer({ src, peaks }) {
    const { user } = useContext(Context)
    const audioRef = useRef(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [progress, setProgress] = useState(0)
    const [duration, setDuration] = useState(0)
    const [isLiked, setIsLiked] = useState(false)

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

    const toggleLike = () => {
        setIsLiked(!isLiked)
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
            <div className='relative mt-4'>
                <div className='flex justify-center gap-6'>
                    <button className='text-indigo-400/75 hover:scale-110 transition'><FontAwesomeIcon icon={faBackward} size='3x' /></button>
                    <button
                        onClick={togglePlay}
                        className='text-indigo-400/75 hover:scale-110 transition'
                        >
                        {isPlaying ? <FontAwesomeIcon icon={faCirclePause} size='3x' /> : <FontAwesomeIcon icon={faCirclePlay} size='3x' />}
                    </button>
                    <button className='text-indigo-400/75 hover:scale-110 transition'><FontAwesomeIcon icon={faForward} size='3x' /></button>
                </div>
                {user.isAuth &&
                    <div className='absolute top-0 left-0'>
                        <button
                            onClick={toggleLike}
                            className='text-indigo-400/75 hover:scale-110 transition'
                            >
                            {isLiked ? <FontAwesomeIcon icon={solidThumbsUp} size='3x' /> : <FontAwesomeIcon icon={regularThumbsUp} size='3x' />}
                        </button>
                    </div>
                }
            </div>
            <TrackWave rawPeaks={peaks} isPlaying={isPlaying} audioRef={audioRef} />
        </>
    )
}

export default observer(TrackPlayer)
