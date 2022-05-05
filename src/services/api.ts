import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.API_URL || 'https://a39a-177-37-146-48.sa.ngrok.io/'
})
