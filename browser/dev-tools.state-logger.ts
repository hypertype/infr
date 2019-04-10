import {StateLogger} from "@hypertype/infr";

export class DevToolsStateLogger extends StateLogger {
    private devTools: any;

    constructor() {
        super();
        this.devTools = window['__REDUX_DEVTOOLS_EXTENSION__'];
        if (this.devTools) {
            this.devTools.connect();
        }
    }


    public send({type, payload}: { type: any; payload: any; }, state: any) {
        if (this.devTools) {
            this.devTools.send({
                type, payload
            }, state);
        }
    }

}