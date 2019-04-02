import {
    ApiService,
    BaseWebSocketService,
    HttpTransportType,
    IHttpConnectionOptions,
    ITokenStore,
    WebSocketUrlInjectionToken
} from "@hypertype/infr";
import {BrowserHttpClient} from "./browser-http.client";
import {Inject, Injectable} from "@hypertype/core";

@Injectable()
export class BrowserWebSocketService extends BaseWebSocketService {

    constructor(@Inject(WebSocketUrlInjectionToken) url,
                private apiService: ApiService,
                private tokenStore: ITokenStore) {
        super(url);
    }

    protected getConfig(): IHttpConnectionOptions {
        return {
            transport: HttpTransportType.WebSockets,
            httpClient: new BrowserHttpClient(this.apiService),
            WebSocket: WebSocket,
            EventSource: EventSource,
            accessTokenFactory: () => {
                return this.tokenStore.get();
            }
        };
    }

}