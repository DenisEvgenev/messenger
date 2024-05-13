import AuthApi from 'api/auth';
import { CreateUser, LoginRequestData } from 'api/types';

const authApi = new AuthApi();

const handleSubmit = async (
    request: () => Promise<object | void>,
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

export const login = async (model: LoginRequestData) => {
    const makeRequest = () => authApi.login(model);
    handleSubmit(makeRequest);
    window.router.go('/messenger');
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
    const makeRequest = () => authApi.registration(model);
    handleSubmit(makeRequest);
    window.router.go('/');
};

export const logout = async () => {
    const makeRequest = () => authApi.logout();
    handleSubmit(makeRequest);
    window.router.go('/');
};
