import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.API_URL ||  'https://api.igcgmusic.com.br:3333'
})
