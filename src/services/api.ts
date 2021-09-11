import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.API_URL || '0.tcp.sa.ngrok.io:17521/'
})