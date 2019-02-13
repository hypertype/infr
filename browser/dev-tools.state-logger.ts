import {StateLogger} from "@hypertype/infr";

export class DevToolsStateLogger extends StateLogger {
    private devTools: any;

    constructor() {
        super();
        this.devTools = window['__REDUX_DEVTOOLS_EXTENSION__'];
        this.devTools.connect();
    }


    public send({type, payload}: { type: any; payload: any; }, state: any) {
        this.devTools.send({
            type, payload
        }, state);
    }

}