import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.API_URL ||  'https://206.42.29.10:3333'
})
