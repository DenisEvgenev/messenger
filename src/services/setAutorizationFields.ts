export const fillLogin = (value: string) => {
    window.store.set({ loginField: value });
};

export const fillPassword = (value: string) => {
    window.store.set({ passwordField: value });
};

export const fillFirstName = (value: string) => {
    window.store.set({ firstNameField: value });
};

export const fillSecondName = (value: string) => {
    window.store.set({ secondNameField: value });
};

export const fillPhone = (value: string) => {
    window.store.set({ phoneField: value });
};

export const fillEmail = (value: string) => {
    window.store.set({ emailField: value });
};
