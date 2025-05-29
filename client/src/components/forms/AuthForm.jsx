import React, { useState } from 'react'
import FormInput from '../ui/FormInput'
import { observer } from 'mobx-react-lite'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { LOGIN_ROUTE, REGISTER_ROUTE } from '../../utils/constants'

function AuthForm({isLogin, authFunc}) {
    const title = isLogin ? 'Sign In' : 'Sign Up'
    const opositeTitle = isLogin ? 'Sign Up' : 'Sign In'
    const opositeURL = isLogin ? REGISTER_ROUTE : LOGIN_ROUTE

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const [passwordIcon, setPasswordIcon] = useState(faEye)
    const [rePasswordIcon, setRePasswordIcon] = useState(faEye)
    const [passwordFieldType, setPasswordFieldType] = useState('password')
    const [rePasswordFieldType, setRePasswordFieldType] = useState('password')

    const authHandler = (e) => {
        e.preventDefault()
        if (isLogin) {
            authFunc(username, password)
        } else {
            authFunc(username, password, rePassword)
        }
    }


    return (
        <div className='bg-white/30 backdrop-blur-sm p-1 border-2 border-slate-100 rounded-lg h-full md:h-2/3 w-full sm:w-auto'>
            <form className='bg-custom-dark p-3 sm:p-10 rounded-lg h-full flex flex-col justify-between gap-20' onSubmit={authHandler}>
                <p className='font-bold text-xl text-center'>{title}</p>
                <div>
                    <label htmlFor='username'>
                        <span className='block'>Email or Username</span>
                        <FormInput id='username' name='username' type='text' placeholder='Email or Username...' value={username} onChange={e => setUsername(e.target.value)} />
                    </label>
                    <label htmlFor='password'>
                        <span className='block mt-2'>Password</span>
                        <div className='relative'>
                            <FormInput id='password' name='password' type={passwordFieldType} placeholder='Password...' value={password} onChange={e => setPassword(e.target.value)} />
                            <button
                                type='button'
                                className='absolute end-2.5 h-full text-neutral-400'
                                onClick={() => {
                                    if (passwordIcon == faEye) {
                                        setPasswordFieldType('text')
                                        setPasswordIcon(faEyeSlash)
                                    } else {
                                        setPasswordFieldType('password')
                                        setPasswordIcon(faEye)
                                    }
                                }}
                            >
                                <FontAwesomeIcon icon={passwordIcon} />
                            </button>
                        </div>
                    </label>
                    {!isLogin && 
                        <label htmlFor='repassword'>
                            <span className='block mt-2'>Confirm password</span>
                            <div className='relative'>
                            <FormInput id='repassword' name='repassword' type={rePasswordFieldType} placeholder='Confirm password...' value={rePassword} onChange={e => setRePassword(e.target.value)} />
                                <button
                                    type='button'
                                    className='absolute end-2.5 h-full text-neutral-400'
                                    onClick={() => {
                                        if (rePasswordIcon == faEye) {
                                            setRePasswordFieldType('text')
                                            setRePasswordIcon(faEyeSlash)
                                        } else {
                                            setRePasswordFieldType('password')
                                            setRePasswordIcon(faEye)
                                        }
                                    }}
                                >
                                    <FontAwesomeIcon icon={rePasswordIcon} />
                                </button>
                            </div>
                        </label>
                    }
                    <button type='submit' className='block bg-custom-pink w-full mt-5 px-2 py-3 rounded-2xl border-pink-800 border-2 hover:bg-pink-800 active:bg-pink-900 focus:outline-none focus:ring focus:ring-pink-400'>{title}</button>
                    <p className='text-sm text-center mt-2 text-neutral-400'>Want to {opositeTitle}? Use <a className='text-neutral-500 underline hover:no-underline font-semibold' href={opositeURL}>this link</a></p>
                </div>
            </form>
        </div>
    )
}

export default observer(AuthForm)