export type SelectedChat = {
    id: number;
    avatar: string | null;
    title: string;
}

export const setActiveCard = (data: SelectedChat) => {
    window.store.set({ selectedChat: data });
};
