import React from 'react'
import { useNavigate } from 'react-router-dom'

function ButtonNavigate({text, route, size, ...props}) {
    const navigate = useNavigate()

    return (
        <button
        className={'w-' + size + ' bg-transparent px-3 py-1 rounded-2xl transition-colors border-violet-800 border-2 hover:bg-violet-800 active:bg-violet-900 focus:outline-none focus:ring focus:ring-violet-400'}
        onClick={() => navigate(route)} 
        {...props}
        >
            {text}
        </button>
    )
}

export default ButtonNavigate