import React from 'react'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function EditButton({text, onClickEvent, size, ...props}) {
    return (
        <button 
        className={'w-' + size + ' focus:outline-none text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2'} 
        onClick={onClickEvent} 
        {...props}
        >
            <FontAwesomeIcon icon={faPenToSquare} className='pe-2' />
            {text}
        </button>
    )
}

export default EditButton