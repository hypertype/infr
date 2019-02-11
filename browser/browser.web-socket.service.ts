import {BaseWebSocketService} from "../common/base-web-socket.service";
import {HubConnection} from "../common/signalr/HubConnection";
import {HubConnectionBuilder} from "../common/signalr/HubConnectionBuilder";
import {HttpTransportType} from "../common/signalr/contracts/ITransport";
import {BrowserHttpClient} from "./browser-http.client";

export class BrowserWebSocketService extends BaseWebSocketService {

    protected buildConnection(url: string): HubConnection {
        return new HubConnectionBuilder()
            .withUrl(url, {
                transport: HttpTransportType.WebSockets,
                httpClient: new BrowserHttpClient(),
                WebSocket: WebSocket,
                EventSource: EventSource
            })
            .configureLogging({log(){}})
            .build();
    }

}

