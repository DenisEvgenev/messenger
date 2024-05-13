import {
    UserData, UserDTO, UserLogin, UserPassword,
} from 'api/types';
import UserApi from 'api/user';

const userApi = new UserApi();

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

export const changeProfile = async (model: UserData) => {
    const makeRequest = () => userApi.changeProfile(model);
    handleSubmit(makeRequest);
    window.router.go('/settings');
};

export const changePassword = async (model: UserPassword): Promise<object | void> => {
    const makeRequest = () => userApi.changePassword(model);
    handleSubmit(makeRequest);
    window.router.go('/settings');
};

export const changeAvatar = async (model: FormData) => {
    const makeRequest = async () => {
        const { response } = await userApi.changeAvatar(model);
        return JSON.parse(response);
    };
    return handleSubmit(makeRequest);
};

export const searchUser = async (model: UserLogin): Promise<Array<UserDTO> | void> => {
    try {
        const { response } = await userApi.searchUser(model);
        return JSON.parse(response);
    } catch (error) {
        const { reason } = JSON.parse(error);
        return reason;
    }
};
