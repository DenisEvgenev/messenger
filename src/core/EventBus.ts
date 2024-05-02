export const EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
} as const;

type Keys = keyof typeof EVENTS;
export type Values = typeof EVENTS[Keys]

export default class EventBus<E extends Values> {
    private listeners: { [key in E]?: Array<() => void> } = {};

    on<F extends(...args: Parameters<F>) => void>(event: E, callback: F) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event]!.push(callback);
    }

    off<F extends(...args: Parameters<F>) => void>(event: E, callback: F) {
        const eventListeners = this.listeners[event];
        if (!eventListeners) {
            throw new Error(`Нет события: ${String(event)}`);
        }
        this.listeners[event] = eventListeners.filter((listener) => listener !== callback);
    }

    emit<F extends(...args: any) => void>(event: E, ...args: Parameters<F>): void {
        const eventListeners = this.listeners[event];
        if (!eventListeners) {
            return;
        }
        eventListeners!.forEach((listener: F) => {
            listener(...args);
        });
    }
}
