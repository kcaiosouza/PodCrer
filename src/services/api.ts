import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.API_URL ||  'http://ecf6-2804-29b8-505d-7d11-c1cc-52fc-c531-c50c.ngrok-free.app/'
})
