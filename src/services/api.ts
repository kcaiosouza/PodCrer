import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://0.tcp.sa.ngrok.io:12496/'
})