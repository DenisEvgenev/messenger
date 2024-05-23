enum METHODS {
    GET = 'GET',
    PUT = 'PUT',
    POST = 'POST',
    DELETE = 'DELETE',
}

type Method = METHODS;

interface RequestOptions {
    method?: Method;
    timeout?: number;
    headers?: Record<string, string>;
    data?: Record<string, unknown> | FormData;
}

type HTTPMethod = (url: string, options?: RequestOptions) => Promise<XMLHttpRequest>;

function queryStringify(data: Record<string, unknown>): string {
    if (typeof data !== 'object') {
        throw new Error('Data must be object');
    }

    const keys = Object.keys(data);
    return keys.reduce((result, key, index) =>
        `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`, '?');
}

const host = 'https://ya-praktikum.tech';

export default class HTTPTransport {
    private apiUrl: string = '';

    constructor(apiPath: string) {
        this.apiUrl = `${host}/api/v2${apiPath}`;
    }

    get: HTTPMethod = (url, options) =>
        this.request(`${this.apiUrl}${url}`, { ...options, method: METHODS.GET }, options?.timeout);

    post: HTTPMethod = (url, options) => this.request(
        `${this.apiUrl}${url}`,
        { ...options, method: METHODS.POST },
        options?.timeout,
    );

    put: HTTPMethod = (url, options) =>
        this.request(`${this.apiUrl}${url}`, { ...options, method: METHODS.PUT }, options?.timeout);

    delete: HTTPMethod = (url, options) =>
        this.request(
            `${this.apiUrl}${url}`,
            { ...options, method: METHODS.DELETE },
            options?.timeout,
        );

    request = (
        url: string,
        options: RequestOptions = { method: METHODS.GET },
        timeout: number = 5000,
    ): Promise<XMLHttpRequest> => {
        const { method = METHODS.GET, headers, data } = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            const isGet = method === METHODS.GET;
            xhr.withCredentials = true;

            xhr.open(
                method,
                isGet && !(data instanceof FormData) && data
                    ? `${url}${queryStringify(data)}`
                    : url,
            );

            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(xhr);
                } else {
                    reject(xhr.responseText);
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
            } else if (data instanceof FormData) {
                xhr.send(data);
            } else {
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(JSON.stringify(data));
            }
        });
    };
}
