import axios, { AxiosRequestConfig } from 'axios';

export enum Methods {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

export interface RequestConfig extends AxiosRequestConfig {
  baseURL?: string;
  resource: string;
  method?: Methods;
}

const axiosInstance = axios.create({});

function setRequestConfig(method: Methods, url: string, config: any) {
  return {
    method,
    url,
    ...config,
  };
}

async function request<T = void>({ resource, baseURL, method = Methods.GET, ...config }: RequestConfig) {
  const url = `${baseURL ? baseURL : process.env.REACT_APP_PUBLIC_URL}${resource}`;
  const requestConfig = setRequestConfig(method, url, config);
  const { data: response } = await axiosInstance.request<T>(requestConfig);
  return response;
}

export default request;