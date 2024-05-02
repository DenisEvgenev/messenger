enum METHODS {
    GET = 'GET',
    PUT = 'PUT',
    POST = 'POST',
    DELETE = 'DELETE',
}

type Method = METHODS;

interface RequestOptions {
    method: Method;
    timeout?: number;
    headers?: Record<string, string>;
    data?: Record<string, unknown>;
}

type HTTPMethod = (url: string, options: RequestOptions) => Promise<XMLHttpRequest>;

function queryStringify(data: Record<string, unknown>): string {
    if (typeof data !== 'object') {
        throw new Error('Data must be object');
    }

    const keys = Object.keys(data);
    return keys.reduce((result, key, index) =>
        `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`, '?');
}

export default class HTTPTransport {
    get: HTTPMethod = (url, options) =>
        this.request(url, { ...options, method: METHODS.GET }, options.timeout);

    post: HTTPMethod = (url, options) =>
        this.request(url, { ...options, method: METHODS.POST }, options.timeout);

    put: HTTPMethod = (url, options) =>
        this.request(url, { ...options, method: METHODS.PUT }, options.timeout);

    delete: HTTPMethod = (url, options) =>
        this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);

    request = (
        url: string,
        options: RequestOptions = { method: METHODS.GET },
        timeout: number = 5000,
    ): Promise<XMLHttpRequest> => {
        const { method, headers, data } = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            const isGet = method === METHODS.GET;

            xhr.open(
                method,
                isGet && data
                    ? `${url}${queryStringify(data)}`
                    : url,
            );

            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(xhr);
                } else {
                    reject(xhr.statusText);
                }
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            xhr.timeout = timeout;

            if (headers) {
                Object.entries(headers).forEach(([key, value]) => {
                    xhr.setRequestHeader(key, value);
                });
            }

            if (isGet || !data) {
                xhr.send();
            } else {
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(JSON.stringify(data));
            }
        });
    };
}
