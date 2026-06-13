import type { News, NewsRequest } from "../types/News";
import { api } from "./Axios";


export const getNews = async (): Promise<News[]> => {
  const { data } = await api.get("/news/");
  return data;
};

export const postNews = async (post: NewsRequest): Promise<any> => {
  const { data } = await api.post("/news/", post);
  return data;
};
