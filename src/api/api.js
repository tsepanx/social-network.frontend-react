import * as axios from "axios";


const instance = axios.create({
    baseURL: 'https://corona.lmao.ninja/v2/'
})

const Api = {
    receiveCountryData: (name) => {
        let url = `countries/${name}`
        return instance.get(url).then(response => response.data)
    }
}

export default Api

