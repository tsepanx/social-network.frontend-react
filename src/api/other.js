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

export let storage = {
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