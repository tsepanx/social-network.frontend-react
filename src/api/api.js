import * as axios from "axios";
import {storage} from "./other";

const DEFAULT_ERROR_KEY = 'non_field_errors'

const getAuthorizationParam = (token) => token ? `JWT ${token}` : ''

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    headers: {'Authorization': getAuthorizationParam(storage.getToken())}
})

window.instance = instance

const setToken = (token) => {
    instance.defaults.headers.Authorization = getAuthorizationParam(token)
    storage._setToken(token)
}

const removeToken = () => {
    delete instance.defaults.headers.Authorization
    storage._removeToken()
}

const getInstanceToken = () => {
    return instance.defaults.headers.Authorization
}

const endpointUrlWithId = (id) => (endpointUrl) => `${endpointUrl}${id}/`

const requestWithThrow = (func, onError = null) => async (...args) => {
    try {
        return await func(...args)
    } catch (e) {
        if (onError)
            onError()

        if (!('response' in e))
            throw e

        let data = e.response.data

        if (DEFAULT_ERROR_KEY in data)
            throw {password: data[DEFAULT_ERROR_KEY]}
        else if ('username' in data)
            throw {username: data.username}
        else if ('password' in data)
            throw {password: data.password}
        else
            throw e
    }
}

export class AuthApi {
    static authUser = requestWithThrow(async (username, password) => {
        let url = 'auth/'
        let r = await instance.post(url, {username, password})
        setToken(r.data.token)

        return r.data.user
    })

    static getMe = requestWithThrow(async () => {
        let url = 'me/'

        return await instance.get(url)
    })

    static refreshToken = async () => {
        let url = 'refresh/'

        try {
            let r = await instance.post(url, {token: storage.getToken()})
            setToken(r.data.token)
        } catch (e) {
            debugger
            console.log(e)
        }
    }
}

export class UserApi {
    static endpointUrl = 'user/'

    static logout = requestWithThrow(() => {
        removeToken()
    })

    static changeUsername = requestWithThrow(async (id, username) => {
        let r = await instance.patch(endpointUrlWithId(id)(this.endpointUrl), {id, username});
        setToken(r.data.token)
    })

    static changePassword = requestWithThrow(async (id, password) => {
        return instance.patch(endpointUrlWithId(id)(this.endpointUrl), {id, password});
    })

    static createUser = requestWithThrow(async (username, password) => {
        removeToken()
        let r = await instance.post(this.endpointUrl, {username, password})
        setToken(r.data.token)
    })

    static deleteUser = requestWithThrow(async id => {
        return await instance.delete(
            endpointUrlWithId(id)(this.endpointUrl)
        )
    })
}

const instanceGet = (id = null, endpointUrl) => requestWithThrow(async () => {
    return instance.get(id ? endpointUrlWithId(id)(endpointUrl) : endpointUrl)
})

const instancePatch = (id = null, endpointUrl, args) => requestWithThrow(async () => {
    return instance.patch(id ? endpointUrlWithId(id)(endpointUrl) : endpointUrl, args);
})

export class ProfileApi {
    static endpointUrl = 'profile/'

    static getMany = () => instanceGet(null, this.endpointUrl)()

    static getProfile = (id) => instanceGet(id, this.endpointUrl)()

    static setStatus = (id, status) => instancePatch(id, this.endpointUrl, {status})()

    static setProfilePhoto = (id, url) => instancePatch(id, this.endpointUrl, {profile_photo: url})()
}

// export class FriendsApi {
//     static endpointUrl = 'social/'
//
//     static getRelationships = async (id) => {
//         let r = await instance.get(endpointUrlWithId(id)(this.endpointUrl))
//         return {
//             ...r,
//             data: r.data.friends
//         }
//     }
// }