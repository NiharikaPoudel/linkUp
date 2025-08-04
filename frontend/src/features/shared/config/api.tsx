import axios from "axios"

export const loginApi = (data: {username: string, password: string}) => {
    return axios.post('http://localhost:3000/api/auth/login', data)
}