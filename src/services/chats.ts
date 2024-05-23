import ChatsApi from 'api/chats';
import {
    ChatUsers, CreateChat, DeleteChat, UserDTO, UserId,
} from 'api/types';

const chatsApi = new ChatsApi();

const handleSubmit = async (
    request: () => Promise<object | void | Array<UserDTO>>,
    errorMessage = 'Неизвестная ошибка, попробуйте позже',
) => {
    window.store.set({ isLoading: true });
    try {
        return await request();
    } catch (error) {
        try {
            const { reason } = JSON.parse(error);
            window.store.set({ popupErrorText: reason });
        } catch (parseError) {
            window.store.set({
                popupErrorText: errorMessage,
            });
        }
        setTimeout(() => {
            window.store.set({ popupErrorText: '' });
        }, 2000);
        return { isError: true };
    } finally {
        window.store.set({ isLoading: false });
    }
};

export const getChats = async () => {
    const makeRequest = async () => {
        const { response } = await chatsApi.getChats();
        window.store.set({ chats: JSON.parse(response) });
    };
    handleSubmit(makeRequest);
};

export const createChat = async (data: CreateChat): Promise<void | object> => {
    const makeRequest = async () => {
        const response = await chatsApi.createChat(data);
        return response || {};
    };
    return handleSubmit(makeRequest);
};

export const deleteChat = async (data: DeleteChat): Promise<object | void> => {
    const makeRequest = async () => {
        const response = chatsApi.deleteChat(data);
        return response || {};
    };
    return handleSubmit(makeRequest);
};

export const addUsers = async (data: ChatUsers): Promise<object | void> => {
    const makeRequest = () => chatsApi.addUsers(data);
    handleSubmit(makeRequest);
};

export const removeUsers = async (data: ChatUsers): Promise<object | void> => {
    const makeRequest = () => chatsApi.removeUsers(data);
    handleSubmit(makeRequest);
};

export const getChatUsers = async (id: UserId) => {
    const makeRequest = async () => {
        const { response } = await chatsApi.getChatUsers(id);
        return JSON.parse(response);
    };
    return handleSubmit(makeRequest);
};

export const getToken = async (chatId: number) => {
    const makeRequest = async () => {
        const { response } = await chatsApi.getToken(chatId);
        return JSON.parse(response);
    };
    return handleSubmit(makeRequest);
};

export const changeChatAvatar = async (model: FormData) => {
    try {
        const { response } = await chatsApi.changeChatAvatar(model);
        return JSON.parse(response);
    } catch (error) {
        try {
            const { reason } = JSON.parse(error);
            window.store.set({ popupErrorText: reason });
        } catch (parseError) {
            window.store.set({
                popupErrorText: 'Произошла ошибка при изменении аватара чата. '
                + 'Возможно, нужно изображение меньшего размера.',
            });
        }
        setTimeout(() => {
            window.store.set({ popupErrorText: '' });
        }, 2000);
        return { isError: true };
    }
};
