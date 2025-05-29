import React, { useState} from 'react'
import { observer } from 'mobx-react-lite'
import EditButton from '../ui/buttons/EditButton'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import EditProfileForm from '../forms/EditProfileForm'

function EditProfileModal() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <EditButton text={'Edit'} size={'full'} onClick={() => setIsOpen(true)} />
            {isOpen && 
                <div className='overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-full bg-black bg-opacity-35'>
                    <div className='relative mx-auto p-4 w-full max-w-2xl max-h-full'>
                        <div className='relative rounded-lg shadow-sm bg-custom-black'>
                            <div className='flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-600'>
                                <h3 className='text-xl font-semibold'>Edit Profile Form</h3>
                                <button className='text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-gray-800 hover:text-white' onClick={() => setIsOpen(false)}>
                                    <FontAwesomeIcon icon={faXmark} />
                                </button>
                            </div>
                            <div className='p-4 md:p-5'>
                                <EditProfileForm />
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default observer(EditProfileModal)
