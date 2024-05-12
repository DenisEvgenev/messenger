import Block from './Block';

type Props = {
    rootQuery: string;
}

type BlockClass = new (...args: unknown[]) => Block<object>;

export type Middlewares = {
    [key: string]: () => void;
}

class Route {
    private pathname: string;

    private BlockClass: BlockClass;

    private block: Block<object>;

    private props: Props;

    private middlewares: Middlewares;

    constructor(pathname: string, view: BlockClass, props: Props, middlewares: Middlewares) {
        this.pathname = pathname;
        this.BlockClass = view;
        this.props = props;
        this.middlewares = middlewares;
    }

    runMiddlewares() {
        const middlewares = Object.values(this.middlewares);
        middlewares?.forEach((middleware) => middleware());
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this.pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this.block) {
            this.block.remove();
        }
    }

    match(pathname: string) {
        return pathname === this.pathname;
    }

    renderDOM(query: string, block: Block<object>) {
        const root = document.querySelector(query) as Element;
        const content = block.getContent() as HTMLElement;
        root.append(content);
    }

    render() {
        this.block = new this.BlockClass();
        this.renderDOM(this.props.rootQuery, this.block);
    }
}

export default Route;
