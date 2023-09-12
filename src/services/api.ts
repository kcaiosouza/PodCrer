import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.API_URL ||  'https://048e-2804-29b8-507a-129d-aa-cf56-9f8f-5bb8.ngrok-free.app'
})
