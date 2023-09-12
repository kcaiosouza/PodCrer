import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.API_URL ||  'https://f3eb-2804-29b8-507a-129d-e833-5b0d-c5df-ff4.ngrok-free.app'
})
