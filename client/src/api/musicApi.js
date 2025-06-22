import { host, authHost } from './index'

export const getTracks = async (args) => {
    const { data } = await host.get('music/tracks', {params: {...args}})
    return data
}

export const getLikedTracks = async () => {
    const { data } = await authHost.get('music/liked-tracks')
    return data
}

export const addTrack = async (trackId) => {
    const { data } = await authHost.post('music/add-track', {trackId})
    return data
}