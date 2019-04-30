import axios from 'axios'


export function getCoinsRequest() {
    axios.defaults.baseURL = 'https://coinlist.now.sh/coins';
    
    return (axios.get())
}

export function getUserRequest() {
    // const url = 'https://yourcryptoserver.herokuapp.com/'
    const apiUrl = 'http://localhost:5000/'

    const get = axios.get(apiUrl, {
        headers: {
            authorization: 'Bearer ' + localStorage.token 
        }
    })

    return get
}

export function getUsersCoinsRequest() {
    // const url = 'https://yourcryptoserver.herokuapp.com/userscoins'
    const apiUrl = 'http://localhost:5000/userscoins'

    const get = axios.get(apiUrl, {
        headers: {
            authorization: 'Bearer ' + localStorage.token 
        }
    })
    return get
}

export function signUpUserRequest(body) {
    // const apiUrl = 'https://yourcryptoserver.herokuapp.com/auth/signup'
    const apiUrl = 'http://localhost:5000/auth/signup'


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
    // const apiUrl = 'https://yourcryptoserver.herokuapp.com/auth/login'
    const apiUrl = 'http://localhost:5000/auth/login'


    const post = axios(apiUrl, {
        method: 'post',
        data: JSON.stringify(body),
        headers: {
            'content-type': 'application/json'
        }
    })

    return post
}

export function updateUserRequest(body) {
    // const apiUrl = 'https://yourcryptoserver.herokuapp.com/auth/login'
    const apiUrl = 'http://localhost:5000/auth/update'


    const post = axios(apiUrl, {
        method: 'post',
        data: JSON.stringify(body),
        headers: {
            'content-type': 'application/json',
            authorization: 'Bearer ' + localStorage.token
        }
    })

    return post
}

export function postUsersCoinsRequest(body) {
    // const apiUrl = 'https://yourcryptoserver.herokuapp.com/userscoins'
    const apiUrl = 'http://localhost:5000/userscoins'

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
    // const apiUrl = 'https://yourcryptoserver.herokuapp.com/userscoins/delete'
    const apiUrl = 'http://localhost:5000/userscoins/delete'

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