import * as axios from "axios";

const base_url = 'https://corona.lmao.ninja/v2/'

const instance = axios.create({
    baseURL: base_url
})

const receiveCountryData = (name) => {
    let url = `countries/${name}`
    return instance.get(url).then(response => response.data)
}

export const receiveCountries = (names, callback) => {
    for (const name of names) {
        receiveCountryData(name).then(callback)
    }
}
