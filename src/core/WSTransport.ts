import { getToken } from 'services/chats';

let currentSocket: WebSocket | null;

export const closeCurrentWebSocket = () => {
    if (currentSocket) {
        currentSocket.close();
        currentSocket = null;
    }
};

export const sendMessage = (message: string) => {
    if (currentSocket) {
        currentSocket.send(JSON.stringify({
            content: message,
            type: 'message',
        }));
    }
};

export const getOldMessages = (count: string) => {
    if (currentSocket) {
        currentSocket.send(JSON.stringify({ type: 'get old', content: count }));
    }
};

export const createWebSocket = async (chatid: number, userId: number) => {
    const { token } = await getToken(chatid) as { token: string };
    const socket = new WebSocket(
        `wss://ya-praktikum.tech/ws/chats/${userId}/${chatid}/${token}`,
    );

    socket.addEventListener('open', () => {
        socket.send(JSON.stringify({ type: 'get old', content: '0' }));
    });

    socket.addEventListener('close', () => {
        window.store.set({ chatActive: false });
    });

    socket.addEventListener('message', (event) => {
        try {
            const data = JSON.parse(event.data);
            if (data.type === 'user connected') {
                return;
            }
            if (Array.isArray(data)) {
                window.store.set({ messages: data });
                if (data.length === 20) {
                    getOldMessages(data[data.length - 1].id);
                }
            } else {
                window.store.set({ messages: data });
            }
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error('Ошибка разбора JSON:', error);
        }
    });

    socket.addEventListener('error', () => {
    });

    currentSocket = socket;
};
