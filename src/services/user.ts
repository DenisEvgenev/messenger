import { UserData, UserPassword } from 'api/types';
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
        await userApi.changeAvatar(model);
        window.router.go('/profile-edit');
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

// export const logout = async () => {
//     window.store.set({ isLoading: true });
//     try {
//         await authApi.logout();
//         window.router.go('/');
//     } catch (error) {
//         console.error('Неизвестная ошибка');
//     } finally {
//         window.store.set({ isLoading: false });
//     }
// };
