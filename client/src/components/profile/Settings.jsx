import React from 'react'
import { faHeart, faKey, faHeartBroken, faDesktop } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Settings(props) {
    return (
        <div className='bg-custom-black rounded-xl'>
            {/* <hr className='my-3 border-t-custom-dark border-t-8 rounded-lg' /> */}
            <ul className='mt-3'>
                <li className='p-3 hover:bg-custom-dark/45 hover:cursor-pointer'>
                    <div className='flex gap-3'>
                        <FontAwesomeIcon icon={faHeart} size='2x' className='text-custom-pink/75' />
                        <p className='my-auto'>Liked Tracks</p>
                    </div>
                </li>
                <li className='p-3 hover:bg-custom-dark/45 hover:cursor-pointer'>
                    <div className='flex gap-3'>
                        <FontAwesomeIcon icon={faKey} size='2x' className='text-custom-pink/75' />
                        <p className='my-auto'>Change Password</p>
                    </div>
                </li>
                <li className='p-3 hover:bg-custom-dark/45 hover:cursor-pointer'>
                    <div className='flex gap-3'>
                        <FontAwesomeIcon icon={faDesktop} size='2x' className='text-custom-pink/75' />
                        <p className='my-auto'>Manage Devices</p>
                    </div>
                </li>
                <li className='p-3 hover:bg-custom-dark/45 hover:cursor-pointer rounded-b-xl'>
                    <div className='flex gap-3'>
                        <FontAwesomeIcon icon={faHeartBroken} size='2x' className='text-custom-pink/75' />
                        <p className='my-auto'>Delete Account</p>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default Settings
