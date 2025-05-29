import { host } from './index'

export const getTracks = async (args) => {
    const { data } = await host.get('music/tracks', {params: {...args}})
    return data
}