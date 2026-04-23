import { APIRequestContext, APIResponse } from '@playwright/test';

export interface PostPayload {
  title: string;
  body: string;
  userId: number;
}

export class JSONPlaceholderClient {
  private baseURL =
    process.env.JSON_BASE_URL || 'https://jsonplaceholder.typicode.com';

  constructor(private request: APIRequestContext) {}

  // -------- POSTS --------

  async getPosts(): Promise<APIResponse> {
    return this.request.get(`${this.baseURL}/posts`);
  }

  async getPostById(id: number): Promise<APIResponse> {
    return this.request.get(`${this.baseURL}/posts/${id}`);
  }

  async createPost(payload: PostPayload): Promise<APIResponse> {
    return this.request.post(`${this.baseURL}/posts`, {
      data: payload,
    });
  }

  async updatePost(
    id: number,
    payload: Partial<PostPayload>
  ): Promise<APIResponse> {
    return this.request.put(`${this.baseURL}/posts/${id}`, {
      data: payload,
    });
  }

  async deletePost(id: number): Promise<APIResponse> {
    return this.request.delete(`${this.baseURL}/posts/${id}`);
  }

  // -------- UTIL --------

  async getJson<T>(response: APIResponse): Promise<T> {
    return (await response.json()) as T;
  }
}