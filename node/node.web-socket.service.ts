import {fetchUrl} from 'fetch';
import * as WebSocket from 'ws'
import {NodeHttpClient} from "./node-http.client";
import * as EventSource from 'eventsource';
import {BaseWebSocketService, HttpTransportType} from "@hypertype/infr";
import {IHttpConnectionOptions} from "@hypertype/infr";

export class NodeWebSocketService extends BaseWebSocketService {
    protected getConfig(): IHttpConnectionOptions {
        return {
            transport: HttpTransportType.WebSockets,
            httpClient: new NodeHttpClient(),
            WebSocket: WebSocketAuth as any,
            EventSource: EventSource,
        }
    }
}


export class WebSocketAuth  {
    static readonly CLOSED: number = WebSocket.CLOSED;
    static readonly CLOSING: number = WebSocket.CLOSING;
    static readonly CONNECTING: number = WebSocket.CONNECTING;
    static readonly OPEN: number = WebSocket.OPEN;
    private static token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiIxIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6ImFkbWluIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiR2xvYmFsQWRtaW4iLCJleHAiOjE1NzkxNDI4MjksImlzcyI6Ik1hcE1ha2Vycy5BdXRoIn0.wm9rlRQirPAIH5xXCE012hd4ani9xBKHeFS6qmFCGB0';

    constructor(url, transports, options) {
        const ws = new WebSocket(url, transports, {
            ...(options || {}),
            headers: {
                ...(options || {}).headers,
                'Authorization': WebSocketAuth.token
            }
        });
        return ws;
    }

}