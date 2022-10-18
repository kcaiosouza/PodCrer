import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.API_URL ||  'https://2de4-2804-29b8-505d-392b-cc4a-cb4a-1b82-f4a6.ngrok.io/'
})
