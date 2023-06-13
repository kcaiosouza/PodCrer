import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.API_URL ||  'https://4e31-2804-29b8-505d-4226-1860-2472-e4c9-2b0f.ngrok-free.app/'
})
