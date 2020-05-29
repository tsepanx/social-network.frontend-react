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

    static getAuthorizationParam = () => `JWT ${localStorage.getItem('token')}`

    static instance = axios.create({
        baseURL: 'http://127.0.0.1:8000/api/',
        headers: {'Authorization': this.getAuthorizationParam()}
    })

    static authUser = async (username, password) => {
        let url = 'auth/'

        try {
            let r = await this.instance.post(url, {username, password})
            let token = r.data.token

            this.setToken(token)
            console.log(r.status, r.statusText, token)
            console.log(r.data)

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

    static logout = () => {
        this.removeToken()
        return true
    }

    static setToken = (token) => {
        this.instance.defaults.headers.Authorization = this.getAuthorizationParam()
        localStorage.setItem('token', token)
    }

    static removeToken = () => {
        delete this.headers.Authorization
        localStorage.removeItem('token')
    }
}