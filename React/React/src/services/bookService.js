import axios from '../axios'

let getBookNew = (limit) => {
    return axios.get(`/api/get-book-new?limit=${limit}`)
}

let getBookByID = (id) => {
    return axios.get(`api/get-book-id?id=${id}`)
}

export {
    getBookNew, getBookByID
}