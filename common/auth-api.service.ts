import {Observable} from "@hypertype/core";
import {ApiService} from "./api.service";
import {IRequestOptions} from "./request.service";

function camelCase<T>(value: T): T {
    if (Array.isArray(value)){
        return value.map(camelCase) as any as T;
    }
    if (typeof value === "object" && value != null) {
        return Object.entries(value).reduce((obj, [key, value]) => {

            obj[key[0].toUpperCase() + key.substr(1)] = camelCase(value);
            return obj;
        }, {} as T);
    }
    return value;
}

export class AuthApiService extends ApiService {

    private token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiIxIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6ImFkbWluIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiR2xvYmFsQWRtaW4iLCJleHAiOjE1NzkxNDI4MjksImlzcyI6Ik1hcE1ha2Vycy5BdXRoIn0.wm9rlRQirPAIH5xXCE012hd4ani9xBKHeFS6qmFCGB0';

    request<T>(method: any, url: any, body?: any, options?: IRequestOptions): Observable<T> {
        return super.request<T>(method, url, body, {
            ...options,
            headers: {
                ...(options.headers || {}),
                Authorization: this.token
            }
        }).pipe(
            // map(t => t && camelCase<T>(t))
        );
    }
}