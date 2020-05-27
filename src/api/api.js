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
            if (['st'].includes(username)) {
                resolve({data: true})
            } else {
                resolve({data: false})
            }
        })
    }

    static logout = () => {
        return new Promise((resolve, reject) => {
            resolve({data: true})
        })
    }
}

export class TestApi {
    static testPosts = () => {
        // fetch('api/posts/1')
        fetch('127.0.0.1:8000/api/posts/1/')
            .then((r) => {
                console.log('Success')
                console.log(r)
            })
            .catch(err => {
                console.log('Error')
                console.log(err)
            })


    }
}
