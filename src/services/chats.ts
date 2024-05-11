import ChatsApi from 'api/chats';
import { ChatUsers, CreateChat } from 'api/types';

const chatsApi = new ChatsApi();

export const getChats = async () => {
    window.store.set({ isLoading: true });
    try {
        const { response } = await chatsApi.getChats();
        window.store.set({ chats: JSON.parse(response) });
    } catch (error) {
        const { reason } = JSON.parse(error);
        window.store.set({ popupErrorText: reason });
        setTimeout(() => {
            window.store.set({ popupErrorText: '' });
        }, 2000);
    } finally {
        window.store.set({ isLoading: false });
    }
};

export const createChat = async (data: CreateChat): Promise<object | void> => {
    window.store.set({ isLoading: true });
    try {
        await chatsApi.createChat(data);
    } catch (error) {
        const { reason } = JSON.parse(error);
        window.store.set({ popupErrorText: reason });
        setTimeout(() => {
            window.store.set({ popupErrorText: '' });
        }, 2000);
    } finally {
        window.store.set({ isLoading: false });
    }
};

export const addUsers = async (data: ChatUsers): Promise<object | void> => {
    window.store.set({ isLoading: true });
    try {
        await chatsApi.addUsers(data);
    } catch (error) {
        const { reason } = JSON.parse(error);
        window.store.set({ popupErrorText: reason });
        setTimeout(() => {
            window.store.set({ popupErrorText: '' });
        }, 2000);
    } finally {
        window.store.set({ isLoading: false });
    }
};

export const removeUsers = async (data: ChatUsers): Promise<object | void> => {
    window.store.set({ isLoading: true });
    try {
        await chatsApi.removeUsers(data);
    } catch (error) {
        const { reason } = JSON.parse(error);
        window.store.set({ popupErrorText: reason });
        setTimeout(() => {
            window.store.set({ popupErrorText: '' });
        }, 2000);
    } finally {
        window.store.set({ isLoading: false });
    }
};

export const getToken = async (chatId: number) => {
    window.store.set({ isLoading: true });
    try {
        const { response } = await chatsApi.getToken(chatId);
        return JSON.parse(response);
    } catch (error) {
        const { reason } = JSON.parse(error);
        window.store.set({ popupErrorText: reason });
        setTimeout(() => {
            window.store.set({ popupErrorText: '' });
        }, 2000);
        return null;
    } finally {
        window.store.set({ isLoading: false });
    }
};
