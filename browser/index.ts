import {Container} from "@hypertype/core";
import {InfrContainer, IRequestService, IWebSocketService, WebSocketUrlInjectionToken}
from "@hypertype/infr";
import {FetchRequestService} from "./fetchRequestService";
import {BrowserWebSocketService} from "./browser.web-socket.service";

export * from './fetchRequestService';

export const BrowserContainer = new Container();
BrowserContainer.provide(InfrContainer);
BrowserContainer.provide([
    {provide: IRequestService, useClass: FetchRequestService},
    {provide: IWebSocketService, useClass: BrowserWebSocketService, deps: [WebSocketUrlInjectionToken]}
]);