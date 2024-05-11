import HTTPTransport from 'core/HTTPTransport';
import { ChatUsers, CreateChat } from './types';

const chatsApi = new HTTPTransport('/chats');

export default class ChatsApi {
    async getChats(): Promise<XMLHttpRequest> {
        return chatsApi.get('');
    }

    async createChat(data: CreateChat): Promise<XMLHttpRequest> {
        return chatsApi.post('', { data });
    }

    async addUsers(data: ChatUsers): Promise<XMLHttpRequest> {
        return chatsApi.put('/users', { data });
    }

    async removeUsers(data: ChatUsers): Promise<XMLHttpRequest> {
        return chatsApi.delete('/users', { data });
    }

    async getToken(chatId: number): Promise<XMLHttpRequest> {
        return chatsApi.post(`/token/${chatId}`);
    }
}
