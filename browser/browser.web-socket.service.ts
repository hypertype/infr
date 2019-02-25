import {BaseWebSocketService, HttpTransportType} from "@hypertype/infr";
import {BrowserHttpClient} from "./browser-http.client";
import {IHttpConnectionOptions} from "@hypertype/infr";

export class BrowserWebSocketService extends BaseWebSocketService {


    protected getConfig(): IHttpConnectionOptions {
        return {
            transport: HttpTransportType.WebSockets,
            httpClient: new BrowserHttpClient(),
            WebSocket: WebSocket,
            EventSource: EventSource
        };
    }

}

