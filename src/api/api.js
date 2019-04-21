import axios from 'axios'

export function getCoinsRequest() {
    axios.defaults.baseURL = 'https://coinlist.now.sh/coins';
    
    return (axios.get())
}

export function getUserRequest() {
    // const url = 'https://cryptoserverx.herokuapp.com/'
    const url = 'http://localhost:5000'

    const get = axios.get(url, {
        headers: {
            authorization: 'Bearer ' + localStorage.token 
        }
    })

    return get
}

export function getUsersCoinsRequest() {
    // const url = 'https://cryptoserverx.herokuapp.com/userscoins'
    const url = 'http://localhost:5000/userscoins'
    const get = axios.get(url, {
        headers: {
            authorization: 'Bearer ' + localStorage.token 
        }
    })

    return get
}