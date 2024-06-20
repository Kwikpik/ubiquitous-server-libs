import { HttpResponseTypes, HttpStatusCodes } from "../constants";
export interface ResponseInterface<T> {
  responseType: HttpResponseTypes;
  statusCode: HttpStatusCodes;
  data: T;
}
export declare class SharedHTTPModule {
  private axiosInstance;
  constructor(baseURL: string, headers?: Record<string, any>);
  static constructWithBaseURL(baseURL: string): SharedHTTPModule;
  post<S, T>(
    path: string,
    body: S,
    headers?: Record<string, any>,
    params?: Record<string, any>
  ): Promise<ResponseInterface<T> | ResponseInterface<string>>;
  get<T>(
    path: string,
    headers?: Record<string, any>,
    params?: Record<string, any>
  ): Promise<ResponseInterface<T> | ResponseInterface<string>>;
  patch<S, T>(
    path: string,
    body: S,
    headers?: Record<string, any>,
    params?: Record<string, any>
  ): Promise<ResponseInterface<T> | ResponseInterface<string>>;
  put<S, T>(
    path: string,
    body: S,
    headers?: Record<string, any>,
    params?: Record<string, any>
  ): Promise<ResponseInterface<T> | ResponseInterface<string>>;
  delete<T>(
    path: string,
    headers?: Record<string, any>,
    params?: Record<string, any>
  ): Promise<ResponseInterface<T> | ResponseInterface<string>>;
}
//# sourceMappingURL=http.d.ts.map
