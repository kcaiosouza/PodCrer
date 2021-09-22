import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.API_URL || 'https://5ee0-177-37-146-48.sa.ngrok.io/'
})