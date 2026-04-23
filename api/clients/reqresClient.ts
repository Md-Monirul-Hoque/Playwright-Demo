import { APIRequestContext, APIResponse } from '@playwright/test';

export interface ProductPayload {
  name: string;
  price: number;
}

export class ReqResClient {
  private baseURL = process.env.API_BASE_URL || 'https://reqres.in/api';
  private projectId = process.env.REQRES_PROJECT_ID || '14563';

  constructor(private request: APIRequestContext) {}

  // -------------------------------
  // HEADERS
  // -------------------------------

  private getPublicHeaders() {
    return {
      'x-api-key': process.env.REQRES_PUBLIC_KEY!,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
  }

  private getManageHeaders() {
    return {
      'x-api-key': process.env.REQRES_MANAGE_KEY!,
      'X-Reqres-Env': 'production',
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
  }

  // -------------------------------
  // ENDPOINT
  // -------------------------------

  private get productsEndpoint() {
    return `${this.baseURL}/collections/products/records?project_id=${this.projectId}`;
  }

  // -------------------------------
  // READ (PUBLIC KEY)
  // -------------------------------

  async getProducts(): Promise<APIResponse> {
    return this.request.get(this.productsEndpoint, {
      headers: this.getPublicHeaders(),
    });
  }

  async getProductById(id: string): Promise<APIResponse> {
    return this.request.get(`${this.productsEndpoint}&id=${id}`, {
      headers: this.getPublicHeaders(),
    });
  }

  // -------------------------------
  // WRITE (MANAGE KEY)
  // -------------------------------

  async createProduct(payload: ProductPayload): Promise<APIResponse> {
    return this.request.post(this.productsEndpoint, {
      data: {
        data: payload, // ✅ FIX: wrap payload
      },
      headers: this.getManageHeaders(),
    });
  }

  async updateProduct(
    id: string,
    payload: Partial<ProductPayload>
  ): Promise<APIResponse> {
    return this.request.put(`${this.productsEndpoint}&id=${id}`, {
      data: {
        data: payload, // ✅ FIX
      },
      headers: this.getManageHeaders(),
    });
  }

  async deleteProduct(id: string): Promise<APIResponse> {
    return this.request.delete(`${this.productsEndpoint}&id=${id}`, {
      headers: this.getManageHeaders(),
    });
  }

  // -------------------------------
  // UTIL
  // -------------------------------

  async getJson<T>(response: APIResponse): Promise<T> {
    return (await response.json()) as T;
  }
}