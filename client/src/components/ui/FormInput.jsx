import React from 'react'

function FormInput({isFullWidth=false, isFileInput=false, preview=null, ...props}) {

    const baseClass = 'bg-transparent border-neutral-700 text-neutral-400 border-2 rounded-2xl focus:outline-none focus:ring focus:ring-neutral-500'
    const widthClass = isFullWidth ? 'w-full' : 'w-full sm:w-80'
    if (isFileInput) {
        return (
            <>
                <input className={`${baseClass} ${widthClass} py-0 ps-0 file:bg-neutral-500 hover:file:bg-neutral-600 file:text-white file:h-12 file:border-0 file:cursor-pointer`} accept='image/*' {...props} />
                {preview && <img className='w-52 h-52 mt-3 mx-auto' src={preview} alt='Preview of new profile image' />}
            </>
        )
    }

    return (
        <input className={`${baseClass} ${widthClass} px-2 py-3`} {...props} />
    )
}

export default FormInput