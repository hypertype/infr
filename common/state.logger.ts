export abstract class StateLogger {
    public abstract send({type, payload}, state);
}
