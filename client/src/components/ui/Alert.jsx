import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faCircleExclamation, faTriangleExclamation, faCircleInfo, faCircleCheck } from '@fortawesome/free-solid-svg-icons'

function Alert({status, message}) {
    const [show, setShow] = useState(true)
    const palet = {
        'error': ['bg-red-200', 'text-red-600'],
        'warning': ['bg-amber-100', 'text-amber-600'],
        'info': ['bg-sky-300', 'text-sky-700'],
        'success': ['bg-teal-300', 'text-teal-700'],
    }

    const icons = {
        'error': faCircleExclamation,
        'warning': faTriangleExclamation,
        'info': faCircleInfo,
        'success': faCircleCheck,
    }

    const hideAlert = () => setShow(false)

    return (
        <>
            {show &&
                <div className={palet[status].join(' ') + ' p-5 m-5 rounded-xl flex justify-between'}>
                    <div className='flex items-center'>
                        <FontAwesomeIcon icon={icons[status]} size='2xl' />
                        <p className='text-md font-bold ms-3'>{message}</p>
                    </div>
                    <button onClick={() => hideAlert()}>
                        <FontAwesomeIcon icon={faXmark} size='2xl' />
                    </button>
                </div>
            }
        </>
    )
}

export default Alert
