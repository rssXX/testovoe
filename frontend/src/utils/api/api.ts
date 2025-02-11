import axios, {AxiosError} from "axios";
import {ShortenInterface, ShortenResponse} from '../interface'

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL || "http://localhost:3000",
  'headers': {
    "Content-Type": "application/json",
  },
});

type ApiError = AxiosError<{ error: string }>;
type ApiResult<T> = T | { error: string };

export const postShortenUrl = async (originalUrl: string, alias?: string, expiresAt?: number): Promise<ApiResult<ShortenResponse>> => {
  try {
    const {data}: {data: ShortenResponse} = await api.post("/shorten", {
      originalUrl,
      alias,
      expiresAt
    });

    return data;
  } catch (err: unknown) {
    const error = err as ApiError;
    console.error("Ошибка при создании короткой ссылки:", error);
    return error.response?.data || { error: "Неизвестная ошибка" };
  }
};

export const deleteShortenUrl = async (alias: string): Promise<ApiResult<ShortenResponse>> => {
  try {
    const {data}: {data: ShortenResponse} = await api.delete(`/delete/${alias}`);

    return data;
  } catch (err: unknown) {
    const error = err as ApiError;
    console.error("Ошибка при удалении ссылки:", error);
    return error.response?.data || { error: "Неизвестная ошибка" };
  }
};

export const getInfoShortenUrl = async (alias: string): Promise<ApiResult<ShortenInterface>> => {
  try {
    const {data}: {data: Omit<ShortenInterface, 'alias'>} = await api.get(`/info/${alias}`);

    return {
      originalUrl: data.originalUrl,
      createdAt: data.createdAt,
      clickCount: data.clickCount,
      alias: alias
    };
  } catch (err: unknown) {
    const error = err as ApiError;
    console.error("Ошибка при удалении ссылки:", error);
    return error.response?.data || { error: "Неизвестная ошибка" };
  }
};
