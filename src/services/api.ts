import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.API_URL ||  'https://8bd1-2804-29b8-5077-9fcd-610f-8a72-4b78-a2c2.ngrok-free.app'
})
