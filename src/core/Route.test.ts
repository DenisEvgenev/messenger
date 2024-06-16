import { expect } from 'chai';
import {
    spy, createSandbox, SinonSandbox, SinonStub,
} from 'sinon';
import Route from './Route';
import Block from './Block';

class BlockMock extends Block<any> {
    render() {
        return '<div></div>';
    }
}

describe('Route', () => {
    let sandbox: SinonSandbox;
    let removeStub: SinonStub;

    beforeEach(() => {
        sandbox = createSandbox();
        removeStub = sandbox.stub(Block.prototype, 'remove');
        sandbox.stub(Block.prototype, 'getContent').callsFake(() => {
            const div = document.createElement('div');
            div.id = 'test';
            return div;
        });

        sandbox
            .stub(document, 'querySelector')
            .callsFake(() => document.createElement('div'));
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('должен выполнить middlewares', () => {
        const middlewareSpy = spy();
        const route = new Route(
            '/',
            BlockMock,
            { rootQuery: '#app' },
            { testMiddleware: middlewareSpy },
        );

        route.runMiddlewares();

        expect(middlewareSpy.called).to.be.true;
    });

    it('должна рендерить блок при переходе по соответствующему пути', () => {
        const route = new Route('/', BlockMock, { rootQuery: '#app' }, {});
        const spyRender = spy(route, 'render');

        route.navigate('/');

        expect(spyRender.called).to.be.true;
    });

    it('не должна рендерить блок при переходе по несоответствующему пути', () => {
        const route = new Route('/test', BlockMock, { rootQuery: '#app' }, {});
        const spyRender = spy(route, 'render');

        route.navigate('/non-match');

        expect(spyRender.called).to.be.false;
    });

    it('должна удалять блок при уходе - leave', () => {
        const route = new Route('/', BlockMock, { rootQuery: '#app' }, {});
        route.render();
        route.leave();

        expect(removeStub.called).to.be.true;
    });
});
