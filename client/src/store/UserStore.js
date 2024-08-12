import { makeAutoObservable } from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._user = {}
        this._userRole = "ADMIN" // ЗДЕСЬ
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }
    setUser(user) {
        this._user = user
    }

    setRole(user) {
        this._userRole = user
    }

    get role() {
        return this._userRole;
    }

    get isAuth() {
        return this._isAuth
    }
    get user() {
        return this._user
    }
}