import axios from "axios";
import * as SecureStore from "expo-secure-store";

function isValidURL(url) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

const baseURL = `${process.env.EXPO_PUBLIC_API_URL}/api/mobile`;
if (!isValidURL(baseURL)) {
  throw new Error("Invalid baseURL");
}

const API = axios.create({
  baseURL
});

API.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync("userToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
