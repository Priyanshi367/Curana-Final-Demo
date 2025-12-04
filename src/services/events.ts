// src/services/events.ts
import axios from 'axios';

const API_URL = import.meta.env.VITE_STRAPI_API_URL;
const API_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN;

// Create an axios instance with default config
console.log(API_TOKEN,'API_TOKEN')
console.log(API_URL,'API_URL')
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_TOKEN?.replace(/"/g, '')}`
  }
});

export const fetchEvents = async () => {
  try {
    const response = await api.get('/events?populate=*');
    console.log(response,'response.data.data')
    return response.data.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const formatEventDate = (dateString: string) => {
  const date = new Date(dateString);
  return {
    month: date.toLocaleString('default', { month: 'short' }).toUpperCase(),
    day: date.getDate().toString().padStart(2, '0'),
    time: date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    })
  };
};