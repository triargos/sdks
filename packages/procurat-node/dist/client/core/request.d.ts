import type { AxiosResponse, AxiosInstance } from 'axios';
import type { ApiRequestOptions } from './ApiRequestOptions';
import type { ApiResult } from './ApiResult';
import { CancelablePromise } from './CancelablePromise';
import type { OnCancel } from './CancelablePromise';
import type { OpenAPIConfig } from './OpenAPI';
export declare const isString: (value: unknown) => value is string;
export declare const isStringWithValue: (value: unknown) => value is string;
export declare const isBlob: (value: any) => value is Blob;
export declare const isFormData: (value: unknown) => value is FormData;
export declare const isSuccess: (status: number) => boolean;
export declare const base64: (str: string) => string;
export declare const getQueryString: (params: Record<string, unknown>) => string;
export declare const getFormData: (options: ApiRequestOptions) => FormData | undefined;
type Resolver<T> = (options: ApiRequestOptions) => Promise<T>;
export declare const resolve: <T>(options: ApiRequestOptions, resolver?: T | Resolver<T>) => Promise<T | undefined>;
export declare const getHeaders: (config: OpenAPIConfig, options: ApiRequestOptions) => Promise<Record<string, string>>;
export declare const getRequestBody: (options: ApiRequestOptions) => unknown;
export declare const sendRequest: <T>(config: OpenAPIConfig, options: ApiRequestOptions, url: string, body: unknown, formData: FormData | undefined, headers: Record<string, string>, onCancel: OnCancel, axiosClient: AxiosInstance) => Promise<AxiosResponse<T>>;
export declare const getResponseHeader: (response: AxiosResponse<unknown>, responseHeader?: string) => string | undefined;
export declare const getResponseBody: (response: AxiosResponse<unknown>) => unknown;
export declare const catchErrorCodes: (options: ApiRequestOptions, result: ApiResult) => void;
/**
 * Request method
 * @param config The OpenAPI configuration object
 * @param options The request options from the service
 * @param axiosClient The axios client instance to use
 * @returns CancelablePromise<T>
 * @throws ApiError
 */
export declare const request: <T>(config: OpenAPIConfig, options: ApiRequestOptions, axiosClient?: AxiosInstance) => CancelablePromise<T>;
export {};
