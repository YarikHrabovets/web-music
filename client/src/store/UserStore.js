import { makeAutoObservable } from 'mobx'


export default class UserStore {
    constructor() {
        this._isAuth = false
        this._user = {}
        this._likes = {}
        makeAutoObservable(this)
    }

    get isAuth() {
        return this._isAuth
    }

    get user() {
        return this._user
    }

    get likes() {
        return this._likes
    }

    setIsAuth(status) {
        this._isAuth = status
    }

    setUser(user) {
        this._user = user
    }

    setLikes(likes) {
        this._likes = likes
    }
}