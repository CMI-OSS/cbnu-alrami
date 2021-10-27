import axios from'axios'

export default axios.create({
    baseURL: 'https://api.github.com/users/kingyong9169',
    headers: {
        'Content-type':'application/json',
    }
})