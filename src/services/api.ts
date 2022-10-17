import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.API_URL ||  'https://a249-2804-29b8-505d-5df3-7cbd-3174-7218-ebd.sa.ngrok.io/'
})
