import {
    UserData, UserDTO, UserLogin, UserPassword,
} from 'api/types';
import UserApi from 'api/user';

const userApi = new UserApi();

export const changeProfile = async (model: UserData) => {
    window.store.set({ isLoading: true });
    try {
        await userApi.changeProfile(model);
        window.router.go('/settings');
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

export const changePassword = async (model: UserPassword): Promise<object | void> => {
    window.store.set({ isLoading: true });
    try {
        await userApi.changePassword(model);
        window.router.go('/settings');
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

export const changeAvatar = async (model: FormData) => {
    window.store.set({ isLoading: true });
    try {
        const { response } = await userApi.changeAvatar(model);
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

export const searchUser = async (model: UserLogin): Promise<Array<UserDTO> | void> => {
    window.store.set({ isLoading: true });
    try {
        const { response } = await userApi.searchUser(model);
        return JSON.parse(response);
    } catch (error) {
        const { reason } = JSON.parse(error);
        window.store.set({ popupErrorText: reason });
        setTimeout(() => {
            window.store.set({ popupErrorText: '' });
        }, 2000);
        return reason;
    } finally {
        window.store.set({ isLoading: false });
    }
};
