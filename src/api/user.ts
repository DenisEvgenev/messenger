import HTTPTransport from 'core/HTTPTransport';
import {
    UserData, UserLogin, UserPassword,
} from './types';

const userApi = new HTTPTransport('/user');

export default class UserApi {
    async changeProfile(data: UserData): Promise<XMLHttpRequest> {
        return userApi.put('/profile', { data });
    }

    async changeAvatar(data: FormData): Promise<XMLHttpRequest> {
        return userApi.put('/profile/avatar', { data });
    }

    async changePassword(data: UserPassword): Promise<XMLHttpRequest> {
        return userApi.put('/password', { data });
    }

    async searchUser(data: UserLogin): Promise<XMLHttpRequest> {
        return userApi.get('/search', { data });
    }
}
