import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { Task } from "../types";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

//@ts-ignore
api.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = sessionStorage.getItem("sessionToken");
  if (token && config.headers) {
    config.headers.Authorization = token;
  }
  return config;
});
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      toast.warn("Session expired. Refresh session...");
    }

    return Promise.reject(error);
  }
);
export const getSessionToken = async (): Promise<string> => {
  const { data } = await api.post("/auth/token");
  sessionStorage.setItem("sessionToken", data.token);
  return data.token;
};

export const getTasks = async (): Promise<Task[]> => {
  const token = sessionStorage.getItem("sessionToken");
  const { data } = await api.get<Task[]>("/tasks", {
    headers: { Authorization: token },
  });
  return data;
};

export const getTaskAnswer = async (id: number): Promise<string[]> => {
  const token = sessionStorage.getItem("sessionToken");
  const { data } = await api.get<string[]>("/tasks/answer", {
    headers: { Authorization: token },
    params: { id },
  });
  return data;
};

export const getAnswer = async (): Promise<string> => {
  const token = sessionStorage.getItem("sessionToken");
  const { data } = await api.get<string>(`/tasks/answers`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const submitTaskAnswers = async (
  answers: Task[]
): Promise<{ result: Task[]; score: number; correctCount: number; totalQuestions: number }[]> => {
  return await api.post("/tasks/submit", answers).then((res) => res.data);
};

export const createTask = async (newTask: Task): Promise<Task> => {
  return await api.post("/tasks", newTask).then((res) => res.data);
};
