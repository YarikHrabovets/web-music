import React from 'react'

function Badge({title}) {

    return (
        <div className='px-2 py-1 font-bold text-indigo-800 border-indigo-900 border-2 bg-indigo-400/75 rounded-full'>
            {title}
        </div>
    )
}

export default Badge
