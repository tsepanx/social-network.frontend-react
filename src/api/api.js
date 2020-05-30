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

export class AuthApi {

    static getAuthorizationParam = (token) => `JWT ${token}`

    static instance = axios.create({
        baseURL: 'http://127.0.0.1:8000/api/',
        headers: {'Authorization': this.getAuthorizationParam(localStorage.getItem('token'))}
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
        } catch (e) { return false }
    }

    static getProfile = async (id) => {
        let url = `profile/${id}`

        try {
            return await this.instance.get(url)
        } catch (e) { return e }
    }

    static logout = () => {
        this.removeToken()
        return true
    }

    static setToken = (token) => {
        this.instance.defaults.headers.Authorization = this.getAuthorizationParam(token)
        localStorage.setItem('token', token)
    }

    static removeToken = () => {
        delete this.instance.defaults.headers.Authorization
        localStorage.removeItem('token')
    }
}