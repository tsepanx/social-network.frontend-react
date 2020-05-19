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
    // _instance = axios.create({})

    static authUser = (username, password) => {
        // TODO logic for validating user using real api
        return new Promise((resolve, reject) => {
            resolve({data: true})
        })
    }

    static logout = () => {
        return new Promise((resolve, reject) => {
            resolve({data: true})
        })
    }
}
