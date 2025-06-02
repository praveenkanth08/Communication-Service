import { HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';

export interface MiddlewareResponse {
    status: number;
    jsonBody: any;
    headers?: Record<string, string>;
}

export type MiddlewareFunction = (
    request: HttpRequest, 
    context: InvocationContext
) => Promise<MiddlewareResponse | null>;

export type HandlerFunction = (
    request: HttpRequest, 
    context: InvocationContext
) => Promise<HttpResponseInit>;

export interface ExtendedContext extends InvocationContext {
    parsedBody?: any;
    user?: UserInfo;
    [key: string]: any;
}

export interface UserInfo {
    id: string;
    email: string;
    roles?: string[];
}

export interface ValidationError {
    field: string;
    message: string;
}