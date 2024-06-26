import Block from './Block';
import Route, { Middlewares } from './Route';

class Router {
    private static instance: Router | null = null;

    private currentRoute: Route | null;

    private rootQuery: string;

    public routes: Array<Route>;

    public history: History;

    constructor(rootQuery: string) {
        if (Router.instance) {
            throw new Error('Нельзя создавать несколько инстансов для синглтона');
        }

        this.routes = [];
        this.history = window.history;
        this.currentRoute = null;
        this.rootQuery = rootQuery;

        Router.instance = this;
    }

    public static getInstance(rootQuery: string) {
        if (!Router.instance) {
            Router.instance = new Router(rootQuery);
        }
        return Router.instance;
    }

    use(
        pathname: string,
        block: new (...args: unknown[]) => Block<object>,
        middlewares: Middlewares,
    ) {
        const route = new Route(
            pathname,
            block,
            { rootQuery: this.rootQuery },
            middlewares,
        );
        this.routes.push(route);
        return this;
    }

    start() {
        window.onpopstate = (event: PopStateEvent) => {
            const currentWindow = event.currentTarget as Window;
            this.onRoute(currentWindow.location.pathname);
        };

        this.onRoute(window.location.pathname);
    }

    private onRoute(pathname: string) {
        const route = this.getRoute(pathname);

        if (!route) {
            return;
        }

        if (this.currentRoute && this.currentRoute !== route) {
            this.currentRoute.leave();
        }
        route.runMiddlewares();

        this.currentRoute = route;

        route.render();
    }

    public static clearInstance(): void {
        Router.instance = null;
    }

    go(pathname: string) {
        this.history.pushState({}, '', pathname);
        this.onRoute(pathname);
    }

    back() {
        this.history.back();
    }

    forward() {
        this.history.forward();
    }

    getRoute(pathname: string) {
        const currentRoute = this.routes.find((route) => route.match(pathname));
        return currentRoute ?? this.routes.find((route) => route.match('*'));
    }
}

export default Router;
