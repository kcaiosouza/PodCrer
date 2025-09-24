import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.API_URL ||  'https://server.igrejaemcampinagrande.com.br:3333'
})

