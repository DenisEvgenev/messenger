import { me } from 'services/auth';

const checkAuth = async () => {
    const userData = await me();
    window.store.set({ userData });
};

export default checkAuth;
