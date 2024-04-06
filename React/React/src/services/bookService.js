import axios from '../axios'

let getBookNew = (limit) => {
    return axios.get(`/api/get-book-new?limit=${limit}`)
}

export {
    getBookNew
}