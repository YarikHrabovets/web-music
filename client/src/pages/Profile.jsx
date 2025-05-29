import React from 'react'
import { observer } from 'mobx-react-lite'
import Main from '../components/profile/Main'
import Settings from '../components/profile/Settings'
import Dashboard from '../components/profile/Dashboard'

function Profile() {

    return (
        <div className='grid grid-cols-3 gap-4 mx-10 mt-32'>
            <Main />
            <Settings />
            <Dashboard />
        </div>
    )
}

export default observer(Profile)
