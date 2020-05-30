import * as axios from "axios";

export class CountryApi {
    static _instance = axios.create({
        baseURL: 'https://corona.lmao.ninja/v2/'
    })


    static async receiveCountryData(name) {
        let url = `countries/${name}`
        return this._instance.get(url).then(response => response.data)
    }
}

let storage = {
    _get: (name) => {
        let value = localStorage.getItem(name)
        return value ? value : ''
        // throw `No such value in storage: ${name}`
    },

    _set: (name, value) => {
        return localStorage.setItem(name, value)
    },

    _remove: (name) => {
        return localStorage.removeItem(name)
    },


    getToken: () => {
        return storage._get('token')
    },

    setToken: (value) => {
        return storage._set('token', value)
    },

    removeToken: () => {
        return storage._remove('token')
    }
}

export class AuthApi {

    static getAuthorizationParam = (token) => token ? `JWT ${token}` : ''

    static instance = axios.create({
        baseURL: 'http://127.0.0.1:8000/api/',
        headers: {'Authorization': this.getAuthorizationParam(storage.getToken())}
    })

    static authUser = async (username, password) => {
        let url = 'auth/'

        try {
            let r = await this.instance.post(url, {username, password})
            this.setToken(r.data.token)

            return r.data.user
        } catch (e) {
            console.log(e)
            return false
        }
    }

    static getMe = async () => {
        let url = 'me/'

        try {
            return await this.instance.get(url)
        } catch (e) {
            return false
        }
    }

    static getProfile = async (id) => {
        let url = `profile/${id}/`

        try {
            return await this.instance.get(url)
        } catch (e) {
            return e
        }
    }

    static logout = () => {
        this.removeToken()
        return true
    }

    static refreshToken = async () => {
        let url = 'refresh/'

        try {
            let r = await this.instance.post(url, { token: storage.getToken() })
            storage.setToken(r.data.token)
        } catch (e) {
            console.log(e)
        }
    }

    static setToken = (token) => {
        this.instance.defaults.headers.Authorization = this.getAuthorizationParam(token)
        storage.setToken(token)
    }

    static removeToken = () => {
        delete this.instance.defaults.headers.Authorization
        storage.removeToken()
    }
}