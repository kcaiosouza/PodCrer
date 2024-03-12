import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.API_URL ||  'https://80d0-2804-29b8-5077-9fcd-20c5-fe12-95c3-452d.ngrok-free.app'
})
