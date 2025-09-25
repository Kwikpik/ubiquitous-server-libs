import axios, { type AxiosInstance } from "axios";
import { HttpResponseTypes, HttpStatusCodes } from "../constants";

export interface ResponseInterface<T> {
  responseType: HttpResponseTypes;
  statusCode: HttpStatusCodes;
  data: T;
}

export class HTTPModule {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string, headers?: Record<string, any>) {
    this.axiosInstance = axios.create({
      baseURL,
      headers,
    });
  }

  static constructWithBaseURL(baseURL: string) {
    return new HTTPModule(baseURL);
  }

  public async post<S, T>(
    path: string,
    body: S,
    headers?: Record<string, any>,
    params?: Record<string, any>
  ): Promise<ResponseInterface<T> | ResponseInterface<string>> {
    try {
      // console.table(body);
      // console.table(headers);
      // console.table(params);
      const res = await this.axiosInstance.post<T>(path, body, { headers, params });
      return { statusCode: res.status, responseType: HttpResponseTypes.SUCCESS, data: res.data };
    } catch (error: any) {
      console.error({
        error: error.response?.data,
        path,
      }); // Log error
      return {
        statusCode: error.response?.status ?? HttpStatusCodes.INTERNAL_SERVER_ERROR,
        responseType: HttpResponseTypes.FAILED,
        data: error.response?.data?.error ?? error.message,
      };
    }
  }

  public async get<T>(
    path: string,
    headers?: Record<string, any>,
    params?: Record<string, any>
  ): Promise<ResponseInterface<T> | ResponseInterface<string>> {
    try {
      // console.table(headers);
      // console.table(params);
      const res = await this.axiosInstance.get<T>(path, { headers, params });
      return { statusCode: res.status, responseType: HttpResponseTypes.SUCCESS, data: res.data };
    } catch (error: any) {
      console.error({
        error: error.response?.data,
        path,
      });
      return {
        statusCode: error.response?.status ?? HttpStatusCodes.INTERNAL_SERVER_ERROR,
        responseType: HttpResponseTypes.FAILED,
        data: error.response?.data?.error ?? error.message,
      };
    }
  }

  public async patch<S, T>(
    path: string,
    body: S,
    headers?: Record<string, any>,
    params?: Record<string, any>
  ): Promise<ResponseInterface<T> | ResponseInterface<string>> {
    try {
      console.table(body);
      console.table(headers);
      console.table(params);
      const res = await this.axiosInstance.patch<T>(path, body, { headers, params });
      return { statusCode: res.status, responseType: HttpResponseTypes.SUCCESS, data: res.data };
    } catch (error: any) {
      console.error(error.response?.data);
      return {
        statusCode: error.response?.status ?? HttpStatusCodes.INTERNAL_SERVER_ERROR,
        responseType: HttpResponseTypes.FAILED,
        data: error.response?.data?.error ?? error.message,
      };
    }
  }

  public async put<S, T>(
    path: string,
    body: S,
    headers?: Record<string, any>,
    params?: Record<string, any>
  ): Promise<ResponseInterface<T> | ResponseInterface<string>> {
    try {
      // console.table(body);
      // console.table(headers);
      // console.table(params);
      const res = await this.axiosInstance.put<T>(path, body, { headers, params });
      return { statusCode: res.status, responseType: HttpResponseTypes.SUCCESS, data: res.data };
    } catch (error: any) {
      console.error(error.response?.data);
      return {
        statusCode: error.response?.status ?? HttpStatusCodes.INTERNAL_SERVER_ERROR,
        responseType: HttpResponseTypes.FAILED,
        data: error.response?.data?.error ?? error.message,
      };
    }
  }

  public async delete<T>(
    path: string,
    headers?: Record<string, any>,
    params?: Record<string, any>
  ): Promise<ResponseInterface<T> | ResponseInterface<string>> {
    try {
      // console.table(headers);
      // console.table(params);
      const res = await this.axiosInstance.delete<T>(path, { headers, params });
      return { statusCode: res.status, responseType: HttpResponseTypes.SUCCESS, data: res.data };
    } catch (error: any) {
      console.error(error.response?.data);
      return {
        statusCode: error.response?.status ?? HttpStatusCodes.INTERNAL_SERVER_ERROR,
        responseType: HttpResponseTypes.FAILED,
        data: error.response?.data?.error ?? error.message,
      };
    }
  }

  public getHeaders() {
    return this.axiosInstance.defaults.headers;
  }
}
