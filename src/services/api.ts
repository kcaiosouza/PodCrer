import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.API_URL || 'http://0.tcp.sa.ngrok.io:12648/'
})