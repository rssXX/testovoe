import axios from "axios";
import {ShortenInterface, ShortenResponse} from '../interface'

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL || "http://localhost:3000",
  'headers': {
    "Content-Type": "application/json",
  },
});

export const postShortenUrl = async (originalUrl: string, alias?: string, expiresAt?: number): Promise<ShortenResponse | {error: string}> => {
  try {
    const {data}: {data: ShortenResponse} = await api.post("/shorten", {
      originalUrl,
      alias,
      expiresAt
    });

    return data;
  } catch (error) {
    console.error("Ошибка при создании короткой ссылки:", error);
    return error.response.data;
  }
};

export const deleteShortenUrl = async (alias: string): Promise<ShortenResponse | {error: string}> => {
  try {
    const {data}: {data: ShortenResponse} = await api.delete(`/delete/${alias}`);

    return data;
  } catch (error) {
    console.error("Ошибка при удалении ссылки:", error);
    return error.response.data;
  }
};

export const getInfoShortenUrl = async (alias: string): Promise<ShortenInterface | {error: string}> => {
  try {
    const {data}: {data: Omit<ShortenInterface, 'alies'>} = await api.get(`/info/${alias}`);

    return {
      originalUrl: data.originalUrl,
      createdAt: data.createdAt,
      clickCount: data.clickCount,
      alias: alias
    };
  } catch (error) {
    console.error("Ошибка при удалении ссылки:", error);
    return error.response.data;
  }
};
