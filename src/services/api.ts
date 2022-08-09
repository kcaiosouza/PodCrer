import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.API_URL || 'https://cdbe-177-37-147-192.sa.ngrok.io/'
})
