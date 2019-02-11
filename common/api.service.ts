import {fromEvent, InjectionToken, map, mergeMap, Observable, of, tap} from '@hypertype/core';
import {IRequestOptions, IRequestService} from "./request.service";

export const ApiUrlInjectionToken = new InjectionToken('apiUrl');

export class ApiService {
    // protected http: IRequestService;

    private isBSON = false;

    constructor(protected http: IRequestService,
                public ApiUrl: string) {
    }

    get<T>(url: string, options: IRequestOptions = {}): Observable<T> {
        return this.request<T>('GET', url, null, options);
    }

    post<T>(url: string, body: any, options: IRequestOptions = {}): Observable<T> {
        return this.request<T>('POST', url, body, options);
    }

    delete<T>(url: string): Observable<T> {
        return this.request<T>('DELETE', url);
    }

    put<T>(url: string, body: any, options: IRequestOptions = {}): Observable<T> {
        return this.request<T>('PUT', url, body, options);
    }

    protected request<T>(method, url, body = null, options: IRequestOptions = {}): Observable<T> {
        url = this.ApiUrl.toString() + url;
        return this.http.request(method, url, body, {
            headers: {
                ...(options.headers || {}),
                'Accept': this.isBSON ? 'application/bson' : 'application/json'
            },
            params: options.params,
            responseType: this.isBSON ? 'blob' : 'json'
        }).pipe(
            // filter(event => {
            //   return (event instanceof HttpResponse);
            // }),
            // map(event => (<HttpResponse<Blob>>event).body),
            mergeMap(this.processResult)
        );
    }

    private processResult = (body) => {
        if (!this.isBSON) {
            return of(body);
        }
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(body);
        return fromEvent(fileReader, 'loadend').pipe(
            map(_ => fileReader.result as ArrayBuffer),
            map(array => new Uint8Array(array)),
            // map(array => bson.deserialize(array)),
            tap(console.log)
        );
    };
}
