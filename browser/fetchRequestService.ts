import {from, mergeMap, Observable, throwError} from '@hypertype/core';
import {IRequestOptions, IRequestService} from "@hypertype/infr";
import URLSearchParams from '@ungap/url-search-params';

export class FetchRequestService implements IRequestService {

    public request<T>(method,
                      url,
                      body = null,
                      options: IRequestOptions = {}): Observable<T> {
        if (options.params) {
            const urlSearchParams = new URLSearchParams();
            this.fillParams(options.params, urlSearchParams);
            url += '?' + urlSearchParams.toString();
        }

        return from(fetch(url, {
            method: method,
            body: body && JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            }
        })).pipe(
            mergeMap(t => {
                if (t.status >= 300) {

                    return throwError({
                        code: t.status,
                        message: t.text()
                    })
                }
                if (/json/.test(t.headers.get('Content-Type')))
                    return t.json();
                return t.text();
            }),
        );
    }

    private fillParams(data, urlSearchParams: URLSearchParams, keys = []) {
        if (Array.isArray(data)) {
            data.forEach((val, i) => {
                this.fillParams(val, urlSearchParams, keys);
            });
        } else if (typeof data == "object") {
            Object.entries(data).reduce((urlSearchParams, [key, value]) => {
                this.fillParams(value, urlSearchParams, [...keys, key]);
                return urlSearchParams;
            }, urlSearchParams || new URLSearchParams())
        } else {
            urlSearchParams.append(keys.join('.'), data.toString());
        }
    }

}
