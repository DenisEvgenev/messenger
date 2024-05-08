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

export const me = async (): Promise<object | void> => {
    window.store.set({ isLoading: true });
    try {
        const { response } = await authApi.me();
        if (['/', '/sign-up'].includes(window.location.pathname)) {
            window.router.go('/messenger');
        }
        return JSON.parse(response);
    } catch (error) {
        return !['/', '/sign-up'].includes(window.location.pathname)
            ? window.router.go('/') : undefined;
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
        const { reason } = JSON.parse(error);
        window.store.set({ popupErrorText: reason });
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
        const { reason } = JSON.parse(error);
        window.store.set({ popupErrorText: reason });
        setTimeout(() => {
            window.store.set({ popupErrorText: '' });
        }, 2000);
    } finally {
        window.store.set({ isLoading: false });
    }
};
