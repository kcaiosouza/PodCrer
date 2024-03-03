import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.API_URL ||  'https://a7e0-2804-29b8-5077-9fcd-f871-7274-ba99-74ad.ngrok-free.app'
})
