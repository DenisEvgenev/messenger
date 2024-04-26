type EventCallback<EventArgs extends unknown[] = []> = (...args: EventArgs) => void;

type EventMap = {
    [event: string]: unknown[];
}

export default class EventBus<Events extends EventMap> {
    private listeners: { [E in keyof Events]?: EventCallback<Events[E]>[] };

    constructor() {
        this.listeners = {} as { [E in keyof Events]?: EventCallback<Events[E]>[] };
    }

    on<K extends keyof Events>(event: K, callback: EventCallback<Events[K]>): void {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event]!.push(callback);
    }

    off<K extends keyof Events>(event: K, callback: EventCallback<Events[K]>): void {
        const eventListeners = this.listeners[event];
        if (!eventListeners) {
            throw new Error(`Нет события: ${String(event)}`);
        }
        this.listeners[event] = eventListeners.filter((listener) => listener !== callback);
    }

    emit<K extends keyof Events>(event: K, ...args: Events[K]): void {
        const eventListeners = this.listeners[event];
        if (!eventListeners) {
            return;
        }
        eventListeners.forEach((listener) => {
            listener(...args);
        });
    }
}
