import {Observable, ReplaySubject} from "@hypertype/core";
import {shareReplay} from "@hypertype/core";
import {IWebSocketService} from "./i-web-socket.service";
import {HubConnection} from "./signalr/HubConnection";
import {IRequestService} from "./request.service";


export abstract class BaseWebSocketService extends IWebSocketService{
    private readonly connection: HubConnection;

    constructor(url: string = "http://localhost:8888/inventory", private requestService: IRequestService) {
        super();
        console.log('web-scoket', url);
        this.connection = this.buildConnection(url);
        this.connection.start().catch();
        this.connection.onclose(e => {
            console.error(e);
        });
    }

    protected abstract buildConnection(url: string): any;

    public Hub(hub: string) {
        return new WebSocketHub(this.connection, hub);
    }

    public send<T>(method: string, ...params): Promise<T> {
        return this.connection.start().then(() => {
            return this.connection.invoke<T>(method, ...params);
        })
    }

}

export class WebSocketHub {
    constructor(private connection: HubConnection, hub: string) {
        this.connection.on(hub, (...params) => this.messagesSubject.next(params));
    }

    private messagesSubject = new ReplaySubject();
    public messages$: Observable<any> = this.messagesSubject.asObservable().pipe(
        shareReplay(1)
    );
}