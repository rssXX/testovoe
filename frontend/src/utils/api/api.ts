import axios from "axios";
import {ShortenResponse} from '../interface'

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL || "http://localhost:3000",
  'headers': {
    "Content-Type": "application/json",
  },
});

export const postShortenUrl = async (originalUrl: string, alias?: string, expiresAt?: number): Promise<ShortenResponse | undefined> => {
  try {
    const {data}: {data: ShortenResponse} = await api.post("/shorten", {
      originalUrl,
      alias,
      expiresAt
    });

    return data;
  } catch (error) {
    console.error("Ошибка при создании короткой ссылки:", error);
    return ;
  }
};
