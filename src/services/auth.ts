import AuthApi from 'api/auth';
import { CreateUser, LoginRequestData } from 'api/types';

const authApi = new AuthApi();

export const login = async (model: LoginRequestData) => {
    window.store.set({ isLoading: true });
    try {
        await authApi.login(model);
        window.router.go('/messenger');
    } catch (error) {
        window.store.set({ popupErrorText: 'Неправильный логин или пароль' });
        setTimeout(() => {
            window.store.set({ popupErrorText: '' });
        }, 2000);
    } finally {
        window.store.set({ isLoading: false });
    }
};

export const me = async () => {
    window.store.set({ isLoading: true });
    try {
        await authApi.me();
    } catch (error) {
        console.error('Неизвестная ошибка', error);
    } finally {
        window.store.set({ isLoading: false });
    }
};

export const registration = async (model: CreateUser) => {
    window.store.set({ isLoading: true });
    try {
        await authApi.registration(model);
        window.router.go('/');
    } catch (error) {
        window.store.set({ popupErrorText: 'Заполнены не все поля' });
        setTimeout(() => {
            window.store.set({ popupErrorText: '' });
        }, 2000);
    } finally {
        window.store.set({ isLoading: false });
    }
};

export const logout = async () => {
    window.store.set({ isLoading: true });
    try {
        await authApi.logout();
        window.router.go('/');
    } catch (error) {
        console.error('Неизвестная ошибка');
    } finally {
        window.store.set({ isLoading: false });
    }
};
