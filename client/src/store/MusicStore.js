import { makeAutoObservable } from 'mobx'

export default class MusicStore {
    constructor() {
        this._tracks = new Map()
        makeAutoObservable(this)
    }

    get tracks() {
        return this._tracks
    }

    setTracks(key, tracks) {
        this._tracks.set(key, tracks)
    }
}