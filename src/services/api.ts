import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.API_URL || 'https://6742-177-37-146-48.sa.ngrok.io/'
})
