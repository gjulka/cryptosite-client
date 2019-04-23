import axios from 'axios'

export function getCoinsRequest() {
    axios.defaults.baseURL = 'https://coinlist.now.sh/coins';
    
    return (axios.get())
}

export function getUserRequest() {
    const url = 'https://yourcryptoserver.herokuapp.com/'

    const get = axios.get(url, {
        headers: {
            authorization: 'Bearer ' + localStorage.token 
        }
    })

    return get
}

export function getUsersCoinsRequest() {
    const url = 'https://yourcryptoserver.herokuapp.com/userscoins'
    const get = axios.get(url, {
        headers: {
            authorization: 'Bearer ' + localStorage.token 
        }
    })

    return get
}

export function signUpUserRequest(body) {
    const apiUrl = 'https://yourcryptoserver.herokuapp.com/auth/signup'

    const post = axios(apiUrl, {
        method: 'post',
        data: JSON.stringify(body),
        headers: {
            'content-type': 'application/json'
        }
    })

    return post
}

export function loginUserRequest(body) {
    const apiUrl = 'https://yourcryptoserver.herokuapp.com/auth/login'

    const post = axios(apiUrl, {
        method: 'post',
        data: JSON.stringify(body),
        headers: {
            'content-type': 'application/json'
        }
    })

    return post
}

export function postUsersCoinsRequest(body) {
    const apiUrl = 'https://yourcryptoserver.herokuapp.com/userscoins'
    const post = axios(apiUrl, {
        method: 'post',
        data: JSON.stringify(body),
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.token}`
        }
    })

    return post
}

export function postDeleteUsersCoinsRequest(body) {
    const apiUrl = 'https://yourcryptoserver.herokuapp.com/userscoins/delete'
    const post = axios(apiUrl, {
        method: 'post',
        data: JSON.stringify(body),
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.token}`
        }
    })

    return post
}