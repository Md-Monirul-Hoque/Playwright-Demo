import { APIRequestContext, APIResponse } from '@playwright/test';

export interface CreateUserPayload {
  name: string;
  job: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export class ReqResClient {
  private baseURL = process.env.API_BASE_URL || 'https://reqres.in/api';

  constructor(private request: APIRequestContext) {}

  // -------------------------------
  // COMMON HEADERS
  // -------------------------------
  private getHeaders() {
    return {
      'x-api-key': process.env.REQRES_API_KEY || '', // set in .env
      'Content-Type': 'application/json',
    };
  }

  // -------------------------------
  // USERS
  // -------------------------------

  async getUsers(page = 2): Promise<APIResponse> {
    return this.request.get(`${this.baseURL}/users?page=${page}`, {
      headers: this.getHeaders(),
    });
  }

  async getSingleUser(userId: number): Promise<APIResponse> {
    return this.request.get(`${this.baseURL}/users/${userId}`, {
      headers: this.getHeaders(),
    });
  }

  async createUser(payload: CreateUserPayload): Promise<APIResponse> {
    return this.request.post(`${this.baseURL}/users`, {
      data: payload,
      headers: this.getHeaders(),
    });
  }

  async updateUser(
    userId: number,
    payload: Partial<CreateUserPayload>
  ): Promise<APIResponse> {
    return this.request.put(`${this.baseURL}/users/${userId}`, {
      data: payload,
      headers: this.getHeaders(),
    });
  }

  async deleteUser(userId: number): Promise<APIResponse> {
    return this.request.delete(`${this.baseURL}/users/${userId}`, {
      headers: this.getHeaders(),
    });
  }

  // -------------------------------
  // AUTH
  // -------------------------------

  async login(payload: LoginPayload): Promise<APIResponse> {
    return this.request.post(`${this.baseURL}/login`, {
      data: payload,
      headers: this.getHeaders(),
    });
  }

  async register(payload: LoginPayload): Promise<APIResponse> {
    return this.request.post(`${this.baseURL}/register`, {
      data: payload,
      headers: this.getHeaders(),
    });
  }

  // -------------------------------
  // UTIL
  // -------------------------------

  async getJson<T>(response: APIResponse): Promise<T> {
    return (await response.json()) as T;
  }
}