import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://igcg-next.vercel.app/'
})