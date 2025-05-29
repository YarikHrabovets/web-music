import React from 'react'

function Spinner({size}) {
    const sizes = {
        'sm': 'size-5',
        'md': 'size-10',
        'lg': 'size-14',
        'xl': 'size-16'
    }

    return (
        <svg className={sizes[size] + ' animate-spin text-custom-pink'} viewBox='0 0 24 24'>
            <circle className='opacity-25' cx='12' cy='12' r='10' fill='none' stroke='currentColor' strokeWidth='4'></circle>
            <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
        </svg>
    )
}

export default Spinner