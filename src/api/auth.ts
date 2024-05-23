import HTTPTransport from 'core/HTTPTransport';
import { CreateUser, LoginRequestData } from './types';

const authApi = new HTTPTransport('/auth');

export default class AuthApi {
    async registration(data: CreateUser): Promise<XMLHttpRequest> {
        return authApi.post('/signup', { data });
    }

    async login(data: LoginRequestData): Promise<XMLHttpRequest> {
        return authApi.post('/signin', { data });
    }

    async me(): Promise<XMLHttpRequest> {
        return authApi.get('/user');
    }

    async logout(): Promise<XMLHttpRequest> {
        return authApi.post('/logout');
    }
}
