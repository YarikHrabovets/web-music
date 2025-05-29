import React, { useState, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import { register } from '../api/userApi'
import { Context } from '../main'
import AuthForm from '../components/forms/AuthForm'
import { PROFILE_ROUTE } from '../utils/constants'
import Alert from '../components/ui/Alert'

function Register() {
    const { user } = useContext(Context)
    const [error, setError] = useState([])
    const navigate = useNavigate()

    const authorize = async (username, password, rePassword) => {
        try {
            if (password !== rePassword) {
                throw new Error('Passwords do not match')
            }
            setError([])
            const data = await register(username, password)
            user.setUser(data)
            user.setIsAuth(true)
            navigate(PROFILE_ROUTE)
        } catch (error) {
            if (!!error.response) {
                setError(error.response.data.message.errors || [{'msg': error.response.data.message}])
            } else {
                setError([{'msg': error.message}])
            }
        }
    }

    return (
        <>
            <div className='position-absolute'>
                {
                    error.map((e, index) => 
                        <Alert status={'warning'} message={e.msg} key={index} />
                    )
                }
            </div>
            <div className='flex min-h-screen p-5 sm:p-0 justify-center items-center'>
                <AuthForm isLogin={false} authFunc={authorize} />
            </div>
        </>
    )
}

export default observer(Register)
