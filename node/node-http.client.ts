import {HttpClient, HttpRequest, HttpResponse} from "../common/signalr/HttpClient";
import {fetchUrl} from 'fetch';

export class NodeHttpClient extends HttpClient {
    private token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiIxIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6ImFkbWluIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiR2xvYmFsQWRtaW4iLCJleHAiOjE1NzkxNDI4MjksImlzcyI6Ik1hcE1ha2Vycy5BdXRoIn0.wm9rlRQirPAIH5xXCE012hd4ani9xBKHeFS6qmFCGB0';

    send(request: HttpRequest): Promise<HttpResponse> {
        return new Promise<HttpResponse>((resolve, reject) => {
            fetchUrl(request.url, {
                method: request.method,
                payload: request.content,
                headers: {
                    ...request.headers,
                    'Authorization': this.token
                }
            }, (error, meta, body) => {
                if (error) {
                    reject(error);
                }
                resolve(new HttpResponse(meta.status, meta.status, body));
            });
        });
    }

}