import {HttpClient, HttpRequest, HttpResponse} from "../common/signalr/HttpClient";

export class BrowserHttpClient extends HttpClient {
    send(request: HttpRequest): Promise<HttpResponse> {
        return fetch(request.url, {
            method: request.method,
            body: request.content,
            headers: request.headers
        }).then(res => res.text()
            .then(data => new HttpResponse(res.status, res.statusText, data)));
    }

}