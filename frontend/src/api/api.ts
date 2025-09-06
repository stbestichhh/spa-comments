import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const api = axios.create({ baseURL: API_URL });

export interface User {
  user_id: string;
  username: string;
  email: string;
}

export interface Comment {
  comment_id: string;
  parentId: string;
  text: string;
  createdAt: Date;
  user: User;
  attachment: Attachment;
}

export interface Attachment {
  attachment_id: string;
  commentId: number;
  filePath: string;
  type: "image" | "text" | "unknown";
}

export interface LoginData {
  email: string;
  password: string;
}

export interface SignupData extends LoginData {
  password: string;
}

export const register = (data: SignupData) => {
  return api.post('/auth/signup', data);
}

export const login = (data: LoginData) => {
  return api.post<{ token: string }>('/auth/login', data);
}

export const me = (token: string) => {
  return api.get<User>('/auth/me', {
    headers: { Authorization: `Bearer ${token}` }
  });
}

export const getCaptcha = () => {
  return api.get<{ sessionId: string; svg: string }>('/auth/captcha');
}

export const getComments = (params: {
  page: number;
  limit: number;
  sortBy?: "username" | "email" | "createdAt";
  order?: "ASC" | "DESC";
}) => api.get<Comment[]>("/comments", { params });

export const createComment = (
  token: string,
  formData: FormData
) =>
  api.post<Comment>("/comments", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

export const getReplies = (id: string) =>
  api.get<Comment[]>(`/comments/${id}/replies`);
