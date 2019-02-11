import {BaseWebSocketService, HttpTransportType, HubConnection, HubConnectionBuilder} from "@hypertype/infr";
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
            .configureLogging({
                log() {
                }
            })
            .build();
    }

}

