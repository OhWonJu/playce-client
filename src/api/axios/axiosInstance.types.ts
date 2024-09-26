import { AxiosInstance, AxiosRequestConfig } from "axios";

import { ErrorCode, ErrorMessage } from "../errorCode";

export interface CustomInstance extends AxiosInstance {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>;
  patch<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T>;
  put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>;
  delete<T>(url: string, confg?: AxiosRequestConfig): Promise<T>;
}

export type CustomResponseFormat<T = unknown> = {
  status: number;
  data?: T;
};

export type MutationResponse = {
  ok: boolean;
  data?: any;
  error?: ErrorMessage;
  errorCode?: ErrorCode;
};
