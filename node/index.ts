import {Container} from "@hypertype/core";
import {InfrContainer, IRequestService, IWebSocketService, WebSocketUrlInjectionToken} from "../common";
import {NodeFetchService} from "./nodeFetchService";
import {NodeWebSocketService} from "./node.web-socket.service";

export * from '../common';
export * from './nodeFetchService';

export const NodeContainer = new Container();
NodeContainer.provide(InfrContainer);
NodeContainer.provide([
    {provide: IRequestService, useClass: NodeFetchService},
    {provide: IWebSocketService, useClass: NodeWebSocketService, deps: [WebSocketUrlInjectionToken]}
]);