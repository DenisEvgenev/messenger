import Handlebars from 'handlebars';
import { nanoid } from 'nanoid';
import EventBus from './EventBus';

export type Props = Record<string, any>;
type Children = Record<string, any>;

export default class Block {
    private _element: HTMLElement | null = null;

    private _meta: { tagName: string };

    public id: string;

    private eventbus: {
        emit(INIT: string, props?: Props, newProps?: Props): unknown;
        on: (arg0: string, arg1: unknown) => void
    };

    public props: Props;

    public children: Children;

    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render',
    };

    constructor(propsWithChildren: { props?: Props; children?: Children; } = {}) {
        this.id = nanoid(6);

        const { props, children } = this._getChildrenAndProps(propsWithChildren);
        this.props = this._makePropsProxy(props || {} as Props);
        this.children = children || {};

        this.eventbus = new EventBus();
        this._registerEvents(this.eventbus);
        this.eventbus.emit(Block.EVENTS.INIT);
    }

    _addEvents() {
        const { events = {} } = this.props;

        Object.keys(events).forEach((eventName) => {
            if (this._element !== null) {
                this._element.addEventListener(
                    eventName as string,
                    events[eventName] as EventListener,
                );
            }
        });
    }

    _registerEvents(eventBus: { on: (arg0: string, arg1: unknown) => void; }) {
        eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    _createResources() {
        const { tagName } = this._meta;
        this._element = this._createDocumentElement(tagName);
    }

    _init() {
        this.init();

        this.eventbus.emit(Block.EVENTS.FLOW_RENDER);
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
        this.eventbus.emit(Block.EVENTS.FLOW_CDM);
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
        propsAndChildren: { props?: Props; children?: Children; },
    ): { props: Props; children: Children } {
        const children: Children = {};
        const props: Props = {};

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

    _render() {
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

            if (content) {
                stub?.replaceWith(content);
            }
        });

        if (this._element) {
            this._element.replaceWith(newElement);
        }

        this._element = newElement;

        this._addEvents();
    }

    render() {}

    getContent() {
        return this.element;
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
                this.eventbus.emit(Block.EVENTS.FLOW_CDU, oldProps, target);
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

    show() {
        this.getContent()!.style.display = 'block';
    }

    hide() {
        this.getContent()!.style.display = 'none';
    }
}
