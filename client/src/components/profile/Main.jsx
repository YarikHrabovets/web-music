import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import { Context } from '../../main'
import EditProfileModal from '../modals/EditProfileModal'
import DangerButton from '../ui/buttons/DangerButton'
import { LOGIN_ROUTE } from '../../utils/constants'
import DefaultProfileImage from '/blank-profile-image.png'

function Main() {
    const { user } = useContext(Context)
    const avatar = user.user.avatar ? `${process.env.REACT_APP_API_URL}media/${user.user.avatar}` : DefaultProfileImage
    const navigate = useNavigate()

    const logout = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.setItem('jwt-token', '')
        navigate(LOGIN_ROUTE)
    }

    return (
        <div className='col-span-2 bg-custom-black rounded-xl p-4'>
            <div className='flex items-end'>
                <img src={avatar} alt='Profile image' className='w-32 rounded-lg border-4 border-neutral-400' />
                <p className='font-bold text-3xl ps-3'>{user.user.username}</p>
            </div>
            <hr className='my-3 border-t-custom-dark border-t-8 rounded-lg' />
            <div className='flex'>
                <EditProfileModal />
                <DangerButton text={'Log Out'} onClickEvent={logout} size={'full'} />
            </div>
        </div>
    )
}

export default observer(Main)