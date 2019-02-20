import {suite, test} from "@hypertype/tools/test";
import {NodeContainer} from "@hypertype/infr-node";
import {IWebSocketService} from "@hypertype/infr";

@suite
export class NodeWebsocketSpec {

    @test
    connectWebSocket(){
        const service = NodeContainer.get<IWebSocketService>(IWebSocketService);
    }
}