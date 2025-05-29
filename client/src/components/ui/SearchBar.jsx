import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

function SearcBar() {
    return (
       <div className='flex w-1/3'>
            <FontAwesomeIcon className='text-neutral-700 my-auto -mr-7' icon={faMagnifyingGlass} size='lg' />
            <input
                placeholder='Search...'
                className='bg-transparent border-neutral-700 border-2 rounded-2xl w-full h-full text-xs pl-8 focus:outline-none focus:ring focus:ring-neutral-500' 
            />
       </div>
    )
}

export default SearcBar