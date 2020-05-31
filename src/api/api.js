import * as axios from "axios";
import {storage} from "./other";

const DEFAULT_ERROR_KEY = 'non_field_errors'

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

const endpointUrlWithId = (id) => (endpointUrl) => `${endpointUrl}${id}/`

const requestWithThrow = (func) => async (...args) => {
    try {
        return await func(...args)
    } catch (e) {
        let data = e.response.data

        if (DEFAULT_ERROR_KEY in data)
            throw {password: [DEFAULT_ERROR_KEY]}
        if ('username' in data)
            throw {username: data.username[0]}
        if ('password' in data)
            throw {password: data.password[0]}
    }
}

export class AuthApi {
    static authUser = async (username, password) => {
        let url = 'auth/'

        try {
            let r = await instance.post(url, {username, password})
            setToken(r.data.token)

            return r.data.user
        } catch (e) {
            throw e.response.data[DEFAULT_ERROR_KEY]
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
    static endpointUrl = 'user/'

    static logout = () => {
        removeToken()
        return true
    }

    static changeUsername = async (id, username) => {
        try {
            return await instance.put(
                endpointUrlWithId(id)(this.endpointUrl), {id, username}
            )
        } catch (e) {
            console.log(e)
        }
    }

    static createUser = requestWithThrow(async (username, password) => {
        let r = await instance.post(this.endpointUrl, {username, password})
        setToken(r.data.token)

        return r.data
    })

    static deleteUser = async (id) => {
        try {
            return await instance.delete(
                endpointUrlWithId(id)(this.endpointUrl)
            )
        } catch (e) {
            console.log(e)
        }
    }
}

export class ProfileApi {
    static endpointUrl = 'profile/'

    static getProfile = async (id) => {
        try {
            return await instance.get(
                endpointUrlWithId(id)(this.endpointUrl)
            )
        } catch (e) {
            return e
        }
    }
}