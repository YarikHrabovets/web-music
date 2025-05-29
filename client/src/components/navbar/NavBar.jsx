import React, {useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { LOGIN_ROUTE, REGISTER_ROUTE, PROFILE_ROUTE } from '../../utils/constants'
import { Context } from '../../main'
import SearcBar from '../ui/SearchBar'
import NavigateButton from '../ui/buttons/NavigateButton'
import DefaultProfileImage from '/blank-profile-image.png'

function NavBar() {
    const { user } = useContext(Context)
    const avatar = user.user.avatar ? `${process.env.REACT_APP_API_URL}media/${user.user.avatar}` : DefaultProfileImage

    return (
        <header className='px-3 py-2 bg-custom-black'>
            <div className='flex justify-between'>
                <h1 className='font-bold my-auto'>Music App</h1>
                <SearcBar />
                {user.isAuth ? 
                    <a href={PROFILE_ROUTE}>
                        <img className='w-8 h-8 rounded-full border-2 border-neutral-400' src={avatar} alt='Profile Image' />
                    </a>
                    :
                    <div className='grid gap-2 grid-cols-2'>
                        <NavigateButton text='Sign Up' route={REGISTER_ROUTE} size='auto' />
                        <NavigateButton text='Sign In' route={LOGIN_ROUTE} size='auto' />
                    </div>
                }
            </div>
        </header>
    )
}

export default observer(NavBar)