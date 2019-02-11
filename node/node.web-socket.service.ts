import {fetchUrl} from 'fetch';
import {BaseWebSocketService} from "../common/base-web-socket.service";
import {HubConnection} from "../common/signalr/HubConnection";
import {HubConnectionBuilder} from "../common/signalr/HubConnectionBuilder";
import {HttpTransportType} from "../common/signalr/contracts/ITransport";
import * as WebSocket from 'ws'
import {NodeHttpClient} from "./node-http.client";
import * as EventSource from 'eventsource';

export class NodeWebSocketService extends BaseWebSocketService {

    protected buildConnection(url: string): HubConnection {
        return new HubConnectionBuilder()
            .withUrl(url, {
                transport: HttpTransportType.WebSockets,
                httpClient: new NodeHttpClient(),
                WebSocket: WebSocketAuth as any,
                EventSource: EventSource,
            })
            .configureLogging({log(){}})
            .build();
    }
}


export class WebSocketAuth extends WebSocket{
    private static token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiIxIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6ImFkbWluIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiR2xvYmFsQWRtaW4iLCJleHAiOjE1NzkxNDI4MjksImlzcyI6Ik1hcE1ha2Vycy5BdXRoIn0.wm9rlRQirPAIH5xXCE012hd4ani9xBKHeFS6qmFCGB0';
    constructor(url, transports, options) {
        super(url, transports, {
            ...(options || {}),
            headers: {
                ...(options|| {}).headers,
                'Authorization': WebSocketAuth.token
            }
        });
    }

    static readonly CLOSED: number = WebSocket.CLOSED;
    static readonly CLOSING: number = WebSocket.CLOSING;
    static readonly CONNECTING: number = WebSocket.CONNECTING;
    static readonly OPEN: number = WebSocket.OPEN;

}