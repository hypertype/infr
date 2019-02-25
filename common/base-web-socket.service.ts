import {filter, first, Fn, Observable, ReplaySubject, shareReplay} from "@hypertype/core";
import {IWebSocketService} from "./i-web-socket.service";
import {HubConnection} from "./signalr/HubConnection";
import {IHttpConnectionOptions} from "./signalr";
import {LogLevel} from "./signalr/contracts/ILogger";
import {HubConnectionBuilder} from "./signalr/HubConnectionBuilder";


export abstract class BaseWebSocketService extends IWebSocketService {
    private connectionSubject$ = new ReplaySubject<HubConnection>(1);
    private connection$: Observable<HubConnection> = this.connectionSubject$.asObservable().pipe(
        filter(Fn.Ib),
    );

    constructor(private url: string = "http://localhost:8888/inventory") {
        super();
        this.initConnection();
    }

    public Hub(hub: string) {
        return new WebSocketHub(this.connection$, hub);
    }

    public send<T>(method: string, ...params): Promise<T> {
        return this.connection$.pipe(
            first(),
        ).toPromise()
            .then(connection => connection.start().then(() => {
                return connection.invoke<T>(method, ...params);
            }));
    }

    protected abstract getConfig(): IHttpConnectionOptions;

    private initConnection() {
        const config = this.getConfig();
        const connection = new HubConnectionBuilder()
            .withUrl(this.url, config)
            .configureLogging({
                log: (type: LogLevel, message) => {
                    if (type >= LogLevel.Error) {
                        connection.stop().catch();
                        // this.restartConnection(connection);
                    }
                }
            })
            .build();
        connection.start().catch();
        connection.onclose(e => {
            this.restartConnection(connection);
        });
        console.warn('connected');
        this.connectionSubject$.next(connection);
    }

    private restartConnection(connection){
        this.connectionSubject$.next(null);
        console.warn('disconnected');
        setTimeout(() => {
            this.initConnection();
        }, 1000);
    }

}

export class WebSocketHub {
    private messagesSubject = new ReplaySubject();
    public messages$: Observable<any> = this.messagesSubject.asObservable().pipe(
        shareReplay(1)
    );

    constructor(private connection: Observable<HubConnection>, hub: string) {
        this.connection.subscribe(connection =>
            connection.on(hub, (...params) => this.messagesSubject.next(params))
        );
    }
}