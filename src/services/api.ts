import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.API_URL ||  'https://34b4-2804-29b8-507a-23-ad74-8f9f-48b2-4a41.ngrok-free.app'
})
