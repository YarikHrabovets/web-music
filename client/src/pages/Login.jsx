import React, { useState, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import AuthForm from '../components/forms/AuthForm'
import { login } from '../api/userApi'
import { Context } from '../main'
import { PROFILE_ROUTE } from '../utils/constants'
import Alert from '../components/ui/Alert'

function Login() {
    const { user } = useContext(Context)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const authorize = async (username, password) => {
        try {
            setError(null)
            const data = await login(username, password)
            user.setUser(data)
            user.setIsAuth(true)
            navigate(PROFILE_ROUTE)
        } catch (error) {
            setError(error.response.data.message)
        }
    }

    return (
        <>
            {error && <div className='position-absolute'><Alert status={'warning'} message={error} /></div>}
            <div className='flex min-h-screen p-5 sm:p-0 justify-center items-center'>
                <AuthForm isLogin={true} authFunc={authorize} />
            </div>
        </>
    )
}

export default observer(Login)
