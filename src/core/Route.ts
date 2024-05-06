import Block from './Block';

type Props = {
    rootQuery: string;
}

type BlockClass = new (...args: any[]) => Block<object>;

class Route {
    private pathname: string;

    private BlockClass: BlockClass;

    private block: Block<object>;

    private props: Props;

    constructor(pathname: string, view: BlockClass, props: Props) {
        this.pathname = pathname;
        this.BlockClass = view;
        this.props = props;
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

    renderDOM(query: string, block: Block<any>) {
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
