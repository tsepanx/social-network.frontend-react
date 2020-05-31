import * as axios from "axios";
import {storage} from "./other";

const getAuthorizationParam = (token) => token ? `JWT ${token}` : ''

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    headers: {'Authorization': getAuthorizationParam(storage.getToken())}
})

const setToken = (token) => {
    instance.defaults.headers.Authorization = getAuthorizationParam(token)
    storage.setToken(token)
}

const removeToken = () => {
    delete instance.defaults.headers.Authorization
    storage.removeToken()
}

const baseUrlWithId = (id) => (baseUrl) => `${baseUrl}/${id}/`

export class AuthApi {
    static authUser = async (username, password) => {
        let url = 'auth/'

        try {
            let r = await instance.post(url, {username, password})
            setToken(r.data.token)

            return r.data.user
        } catch (e) {
            console.log(e)
            return false
        }
    }

    static getMe = async () => {
        let url = 'me/'

        try {
            return await instance.get(url)
        } catch (e) {
            return false
        }
    }

    static refreshToken = async () => {
        let url = 'refresh/'

        try {
            let r = await instance.post(url, {token: storage.getToken()})
            storage.setToken(r.data.token)
        } catch (e) {
            console.log(e)
        }
    }
}

export class UserApi {
    static baseUrl = 'user'

    static logout = () => {
        removeToken()
        return true
    }

    static changeUsername = async (id, username) => {
        try {
            return await instance.put(
                baseUrlWithId(id)(this.baseUrl), {id, username}
            )
        } catch (e) {
            console.log(e)
        }
    }

    static deleteUser = async (id) => {
        try {
            return await instance.delete(
                baseUrlWithId(id)(this.baseUrl)
            )
        } catch (e) {
            console.log(e)
        }
    }
}

export class ProfileApi {
    static baseUrl = 'profile'

    static getProfile = async (id) => {
        try {
            return await instance.get(
                baseUrlWithId(id)(this.baseUrl)
            )
        } catch (e) {
            return e
        }
    }
}