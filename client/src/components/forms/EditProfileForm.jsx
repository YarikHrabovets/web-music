import React, { useContext, useState } from 'react'
import { observer } from 'mobx-react-lite'
import FormInput from '../ui/FormInput'
import { Context } from '../../main'
import { uploadAvatar, updateUsername } from '../../api/userApi'
import Alert from '../ui/Alert'

function EditProfileForm() {
    const { user } = useContext(Context)
    const [newUsername, setNewUsername] = useState('')
    const [nameError, setNameError] = useState('')
    const [nameSuccess, setNameSuccess] = useState('')
    const [file, setFile] = useState(null)
    const [fileError, setFileError] = useState('')
    const [fileSuccess, setFileSuccess] = useState('')
    const [preview, setPreview] = useState(null)
    const [formClass, setFormClass] = useState('')

    const FileOnChangeHandler = (e) => {
        setFile(e.target.files[0])
        const fileReader = new FileReader
        fileReader.onload = () => setPreview(fileReader.result)
        fileReader.readAsDataURL(e.target.files[0])
    }

    const EditProfileHandher = (e) => {
        e.preventDefault()
        if (newUsername !== '') {
            updateUsername(newUsername)
            .then((data) => {
                user.setUser(data)
                setNameSuccess('Username was updated!')
            })
            .catch((error) => setNameError(error.response.data.message))
        }
        if (file) {
            uploadAvatar(file)
            .then((data) => {
                user.setUser(data)
                setFileSuccess('Profile image was updated!')
            })
            .catch((error) => setFileError(error.response.data.message))
        }
        if (newUsername !== '' || file) setFormClass('hidden')
    }

    return (
        <>
            <div className='mb-5'>
                {nameError && <Alert status='error' message={nameError} />}
                {fileError && <Alert status='error' message={fileError} />}
                {nameSuccess && <Alert status='success' message={nameSuccess} />}
                {fileSuccess && <Alert status='success' message={fileSuccess} />}
            </div>
            <form onSubmit={EditProfileHandher} className={formClass}>
                <div className='mb-5'>
                    <label htmlFor='username' className='block mb-2 text-sm font-medium'>Your new username</label>
                    <FormInput id='username' name='username' type='text' isFullWidth value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
                </div>
                <div>
                    <label htmlFor='avatar' className='block mb-2 text-sm font-medium'>Your new avatar</label>
                    <FormInput id='avatar' name='avatar' type='file' preview={preview} onChange={FileOnChangeHandler} isFullWidth isFileInput />
                </div>
                <button type='submit' className='block bg-custom-pink w-full mt-5 px-2 py-3 rounded-2xl border-pink-800 border-2 hover:bg-pink-800 active:bg-pink-900 focus:outline-none focus:ring focus:ring-pink-400'>Save Changes</button>
            </form>
        </>
    )
}

export default observer(EditProfileForm)
