import React from 'react'
import { faBolt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function DangerButton({text, onClickEvent, size, ...props}) {
    return (
        <button 
        className={'w-' + size + ' focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2'}
        onClick={onClickEvent}
        {...props}
        >
            <FontAwesomeIcon icon={faBolt} className='pe-2' />
            {text}
        </button>
    )
}

export default DangerButton
