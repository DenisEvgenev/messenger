import { expect } from 'chai';
import sinon from 'sinon';

import HTTPTransport from './HTTPTransport';

describe('HTTPTransport', () => {
    let xhr: sinon.SinonFakeXMLHttpRequestStatic;
    let requests: any[];

    beforeEach(() => {
        xhr = sinon.useFakeXMLHttpRequest();
        requests = [];
        xhr.onCreate = (req) => {
            requests.push(req);
        };
    });

    afterEach(() => {
        xhr.restore();
    });

    const http = new HTTPTransport('/user');
    const data = { key: 'value' };

    it('должен сделать GET запрос', async () => {
        const responseData = { message: 'Запрос GET прошел успешно' };

        const promise = http.get('');
        requests[0].respond(
            200,
            { 'Content-Type': 'application/json' },
            JSON.stringify(responseData),
        );

        const { response } = await promise;
        expect(JSON.parse(response)).to.deep.equal(responseData);
    });

    it('должен сделать POST запрос', async () => {
        const responseData = { message: 'Запрос POST прошел успешно' };

        const promise = http.post('', { data });
        requests[0].respond(
            200,
            { 'Content-Type': 'application/json' },
            JSON.stringify(responseData),
        );

        const { response } = await promise;
        expect(JSON.parse(response)).to.deep.equal(responseData);
    });

    it('должен сделать DELETE запрос', async () => {
        const responseData = { message: 'Запрос DELETE прошел успешно' };

        const promise = http.delete('');
        requests[0].respond(
            200,
            { 'Content-Type': 'application/json' },
            JSON.stringify(responseData),
        );

        const { response } = await promise;
        expect(JSON.parse(response)).to.deep.equal(responseData);
    });

    it('должен сделать PUT запрос', async () => {
        const responseData = { message: 'Запрос PUT прошел успешно' };

        const promise = http.put('', { data });
        requests[0].respond(
            200,
            { 'Content-Type': 'application/json' },
            JSON.stringify(responseData),
        );

        const { response } = await promise;
        expect(JSON.parse(response)).to.deep.equal(responseData);
    });
});
