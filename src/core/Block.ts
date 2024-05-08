import Handlebars from 'handlebars';
import { nanoid } from 'nanoid';
import EventBus, { Values, EVENTS } from './EventBus';

export type Children = {
    [key: string]: Block<object>;
};

export default class Block<Props extends object> {
    private _element: HTMLElement | null = null;

    private _meta: { tagName: string };

    private eventListeners: { [key: string]: EventListener};

    public id: string;

    private eventbus: EventBus<Values>;

    public props: Props;

    public children: Children;

    constructor(propsWithChildren: Props = {} as Props) {
        this.id = nanoid(6);

        const { props, children } = this._getChildrenAndProps(propsWithChildren);

        this.props = this._makePropsProxy(props || {} as Props);
        this.children = children || {};

        this.eventbus = new EventBus();
        this.registerEvents(this.eventbus);
        this.eventbus.emit(EVENTS.INIT);
    }

    private addEvents() {
        const { events = {} } = this.props as { events?: { [key: string]: EventListener } };
        Object.keys(events).forEach((eventName) => {
            const eventListener = events[eventName];
            if (this._element !== null) {
                this._element.addEventListener(
                    eventName as string,
                    events[eventName] as EventListener,
                );
                this.eventListeners[eventName] = eventListener;
            }
        });
    }

    private removeEvents() {
        if (this._element !== null) {
            Object.keys(this.eventListeners).forEach((eventName) => {
                this._element?.removeEventListener(eventName, this.eventListeners[eventName]);
            });
        }
        this.eventListeners = {};
    }

    private registerEvents(eventBus: { on: (arg0: string, arg1: unknown) => void; }) {
        eventBus.on(EVENTS.INIT, this._init.bind(this));
        eventBus.on(EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    _createResources() {
        const { tagName } = this._meta;
        this._element = this._createDocumentElement(tagName);
    }

    _init() {
        this.init();

        this.eventbus.emit(EVENTS.FLOW_RENDER);
    }

    init() {
    }

    _componentDidMount() {
        this.componentDidMount();
        Object.values(this.children).forEach((child) => {
            child.dispatchComponentDidMount();
        });
    }

    componentDidMount() {}

    dispatchComponentDidMount() {
        this.eventbus.emit(EVENTS.FLOW_CDM);

        // Object.values(this.children).forEach((child) => child.dispatchComponentDidMount());
    }

    private _componentDidUpdate(oldProps: Props, newProps: Props) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (!response) {
            return;
        }

        this._render();
    }

    componentDidUpdate(oldProps: Props, newProps: Props): { [x: string]: any; } | boolean {
        return { ...oldProps, ...newProps };
    }

    private _getChildrenAndProps(
        propsAndChildren: Props,
    ): { props: Props; children: Children } {
        const children = {} as Children;
        const props = {} as Props;

        Object.entries(propsAndChildren).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value;
            } else {
                (props as unknown as Record<string, unknown>)[key] = value;
            }
        });

        return { children, props };
    }

    setProps = (nextProps: Props) => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    get element() {
        return this._element;
    }

    private _componentWillUnmount() {
        this.componentWillUnmount();
    }

    componentWillUnmount() {
        this.removeEvents();
    }

    _render() {
        this.removeEvents();

        const propsAndStubs = { ...this.props };

        Object.entries(this.children).forEach(([key, child]) => {
            (propsAndStubs as Record<string, unknown>)[key] = `<div data-id="${child.id}"></div>`;
        });

        const fragment = this._createDocumentElement('template') as HTMLTemplateElement;

        fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);
        const newElement = fragment.content.firstElementChild as HTMLElement;

        Object.values(this.children).forEach((child) => {
            const stub = fragment.content.querySelector(`[data-id="${child.id}"]`);

            const content = child.getContent();

            if (content && stub && stub.parentNode) {
                stub.replaceWith(content);
            }
        });

        if (this._element && this._element.parentNode) {
            this._element.replaceWith(newElement);
        }

        this._element = newElement;

        this.addEvents();
    }

    render() {}

    getContent() {
        if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
            setTimeout(() => {
                if (
                    this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE
                ) {
                    this.dispatchComponentDidMount();
                }
            }, 100);
        }

        return this._element;
    }

    private _makePropsProxy(props: Props): Props {
        return new Proxy(props, {
            get: (target, prop) => {
                const value = target[prop as keyof Props];
                return typeof value === 'function' ? value.bind(this) : value;
            },
            set: (target, prop, value) => {
                const oldProps = { ...target };
                target[prop as keyof Props] = value;
                this.eventbus.emit(EVENTS.FLOW_CDU, oldProps, target);
                return true;
            },
            deleteProperty: () => {
                throw new Error('Нет доступа');
            },
        });
    }

    _createDocumentElement(tagName: string) {
        return document.createElement(tagName);
    }

    remove() {
        this._componentWillUnmount();
        this.getContent()?.remove();
    }
}
