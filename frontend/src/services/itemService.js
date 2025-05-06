import axios from 'axios';
import { API_URL } from '../config';

const API = `${API_URL}/items`;

export const getItems = async () => {
  const response = await axios.get(API);
  return response.data;
};

export const getItem = async (id) => {
  const response = await axios.get(`${API}/${id}`);
  return response.data;
};

export const createItem = async (item) => {
  const response = await axios.post(API, item);
  return response.data;
};

export const updateItem = async (id, item) => {
  const response = await axios.put(`${API}/${id}`, item);
  return response.data;
};

export const deleteItem = async (id) => {
  const response = await axios.delete(`${API}/${id}`);
  return response.data;
};
