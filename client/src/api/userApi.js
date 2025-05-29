import { host, authHost } from './index'
import { jwtDecode } from 'jwt-decode'

export const register = async (username, password) => {
    const { data } = await host.post('user/signup', {username, password})
    localStorage.setItem('jwt-token', data.token)
    return jwtDecode(data.token)
}

export const login = async (username, password) => {
    const { data } = await host.post('user/signin', {username, password})
    localStorage.setItem('jwt-token', data.token)
    return jwtDecode(data.token)
}

export const authentication = async () => {
    const { data } = await authHost.get('user/authenticate')
    localStorage.setItem('jwt-token', data.token)
    return jwtDecode(data.token)
}

export const uploadAvatar = async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    const { data } = await authHost.post('user/upload-avatar', formData)
    localStorage.setItem('jwt-token', data.token)
    return jwtDecode(data.token)
}

export const updateUsername = async (username) => {
    const { data } = await authHost.post('user/update-username', {username})
    localStorage.setItem('jwt-token', data.token)
    return jwtDecode(data.token)
}