export type APIError = {
    reason: string;
};

export type SignUpResponse = {
    id: number
}

export type UserDTO = {
    id: number;
    login: string;
    first_name: string;
    second_name: string;
    display_name: string;
    avatar: string;
    phone: string;
    email: string;
};

export type CreateUser = Omit<UserDTO, 'avatar' | 'display_name' | 'id'> & {
    password: string
}

export type CreateChat = {
    title?: string
}

export type DeleteChat = {
    chatId: number;
}

export type LoginRequestData = {
    login: string,
    password: string
}

type LastMessage = {
    user: UserDTO,
    time: string,
    content: string
}

export type ChatDTO = {
    id: number;
    created_by: number;
    title: string;
    avatar: string | null;
    unread_count: number;
    last_message: LastMessage | null;
}

export type UserData = {
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
}

export type UserPassword = {
    oldPassword: string;
    newPassword: string;
}

export type UserLogin = {
    login: string;
}

export type ChatUsers = {
    chatId: number;
    users: Array<number>;
}

export type UserId = number;

export type Message = {
    id: number;
    user_id: number;
    chat_id: number;
    type: string;
    time: string;
    content: string;
    is_read: boolean;
    file: null;
}

export type Messages = Array<Message>;
