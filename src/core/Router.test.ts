import { expect } from 'chai';
import { createSandbox, SinonSandbox, SinonStub } from 'sinon';
import Router from './Router';
import Block from './Block';

class BlockMock extends Block<any> {
    render() {
        return '<div></div>';
    }
}

describe('Router', () => {
    let router: Router | null;
    let sandbox: SinonSandbox;
    let routerForwardStub: SinonStub;
    let routerBackStub: SinonStub;

    before(() => {
        sandbox = createSandbox();
        sandbox.stub(window.history, 'pushState');
        routerBackStub = sandbox.stub(window.history, 'back');
        routerForwardStub = sandbox.stub(window.history, 'forward');
    });

    after(() => {
        sandbox.restore();
    });

    beforeEach(() => {
        router = null;
        Router.clearInstance();
        router = Router.getInstance('#app');
    });

    it('use должен добавлять маршрут', () => {
        router?.use('/test', BlockMock, {});
        expect(router?.routes).to.have.lengthOf(1);
    });

    it('back должен вызывать back метод window.history', () => {
        router?.back();
        expect(routerBackStub.called).to.be.true;
    });

    it('forward должен вызывать forward метод window.history', () => {
        router?.forward();
        expect(routerForwardStub.called).to.be.true;
    });
});
