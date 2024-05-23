export const fillNewPassword = (value: string) => {
    window.store.set({ newPasswordField: value });
};

export const fillOldPassword = (value: string) => {
    window.store.set({ oldPasswordField: value });
};
