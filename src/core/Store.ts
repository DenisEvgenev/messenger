import EventBus, { Values, EVENTS } from './EventBus';

class Store extends EventBus<Values> {
    private static instance: Store;

    private state: object = {};

    constructor(defaultState: object) {
        if (Store.instance) {
            throw new Error('Нельзя создавать несколько инстансов для синглтона');
        }

        super();

        this.state = defaultState;
        this.set(defaultState);

        Store.instance = this;
    }

    public static getInstance(rootQuery: object) {
        if (!Store.instance) {
            Store.instance = new Store(rootQuery);
        }
        return Store.instance;
    }

    public getState() {
        return this.state;
    }

    public set(nextState: object) {
        const prevState = { ...this.state };

        this.state = { ...this.state, ...nextState };

        this.emit(EVENTS.UPDATED, prevState, nextState);
    }
}

export default Store;
