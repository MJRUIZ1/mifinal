import axios from 'axios'

export const API = axios.create({
    baseURL: `http://awsmj.ddns.net/api/v1/`,
})