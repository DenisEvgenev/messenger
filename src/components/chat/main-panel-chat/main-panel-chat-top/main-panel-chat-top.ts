import Block from 'core/Block';
import { Photo } from 'components/photo';
import { Icon } from 'components/icon';
import AddUserIcon from 'assets/addUser.svg';
import DeleteChatIcon from 'assets/deleteChat.svg';
import RemoveUserIcon from 'assets/removeUser.svg';
import { SelectedChat } from 'services/setActiveCard';
import { connect } from 'utils/connect';
import isEqual from 'utils/isEqual';
import { FormModal } from 'components/form-modal';
import { Input } from 'components/input';
import {
    addUsers, changeChatAvatar, deleteChat, getChats, getChatUsers, removeUsers,
} from 'services/chats';
import { searchUser } from 'services/user';
import { UserDTO } from 'api/types';
import { REGEXP_LOGIN } from 'constants/constants';

type Props = {
    title: string;
    avatar: string | null;
    lastMessage: string;
    isYourLastMessage: boolean;
    time: string;
    countUnreadedMessages: number;
    selectedChat: SelectedChat;
    loginUser: string;
    userData?: UserDTO;
    users?: string;
}

class MainPanelChatTop extends Block<Props> {
    constructor(props: Props) {
        super({
            ...props,
            title: props.selectedChat?.title,
        });
    }

    init() {
        const EditPhotoBlock = new FormModal({
            formBody: 'Картинка: <input id="avatar" type="file" name="avatar" accept="image/*">',
            title: 'Поменять аватарку чата',
            id: 'change-chat-avatar',
            onSubmit: async (e: Event) => {
                e.preventDefault();
                const formModal = document.getElementById(
                    'form-modal__change-chat-avatar',
                ) as HTMLFormElement;
                const formData = new FormData(formModal);
                const chatId = this.props.selectedChat.id;
                formData.append('chatId', chatId.toString());
                const response = await changeChatAvatar(formData);

                if (!response.isError) {
                    EditPhotoBlock.setProps({ showModal: false });
                    this.children.Avatar.setProps({
                        avatar: response.avatar,
                    });
                    getChats();
                }
            },
        });

        const Avatar = new Photo({
            avatar: this.props.selectedChat?.avatar,
            className: 'edit',
            events: {
                click: () => {
                    if (this.props.selectedChat) {
                        EditPhotoBlock.setProps({ showModal: true });
                    }
                },
            },
        });
        const AddUser = new Icon({
            src: AddUserIcon,
            size: 's',
            events: {
                click: () => {
                    if (this.props.selectedChat) {
                        this.children.AddingUsersBlock.setProps({ showModal: true });
                    }
                },
            },
        });

        const RemoveUser = new Icon({
            src: RemoveUserIcon,
            size: 's',
            events: {
                click: async () => {
                    if (this.props.selectedChat) {
                        const users = await getChatUsers(
                            this.props.selectedChat.id,
                        ) as Array<UserDTO> || [];

                        this.children.RemovingUsersBlock.setProps({
                            showModal: true,
                            users: users
                                .filter((user) => user.id !== this.props.userData?.id)
                                .map(({ login }) => login).join(', '),
                        });
                    }
                },
            },
        });
        const AddingUsersBlock = new FormModal({
            formBody: new Input({
                type: 'text',
                label: 'Логин',
                onBlur: (event) => {
                    const target = event.target as HTMLInputElement;
                    const inputValue = target.value;
                    window.store.set({ loginUser: inputValue });

                    if (REGEXP_LOGIN.test(this.props.loginUser)) {
                        this.children.AddingUsersBlock.children.formBody.setProps({
                            error: false,
                            errorText: null,
                        });
                    } else {
                        this.children.AddingUsersBlock.children.formBody.setProps({
                            error: true,
                            errorText: 'Используйте только буквы, начиная с заглавной',
                        });
                    }
                },
                name: 'title',
            }),
            title: 'Добавить пользователя',
            onSubmit: async (e: Event) => {
                e.preventDefault();

                const focusableElements = document.querySelectorAll('input');

                focusableElements.forEach((element) => {
                    element.blur();
                });

                if (REGEXP_LOGIN.test(this.props.loginUser)) {
                    const user = await searchUser({
                        login: this.props.loginUser,
                    });

                    if (!user?.length || !this.props.selectedChat) {
                        this.children.AddingUsersBlock.children.formBody.setProps({
                            error: true,
                            errorText: 'Такой логин не существует',
                        });
                        return;
                    }

                    addUsers({
                        chatId: this.props.selectedChat.id,
                        users: [user[0].id],
                    });

                    this.children.AddingUsersBlock.setProps({ showModal: false });
                }
            },
        });

        const RemovingUsersBlock = new FormModal({
            formBody: new Input({
                type: 'text',
                label: 'Логин',
                onBlur: (event) => {
                    const target = event.target as HTMLInputElement;
                    const inputValue = target.value;
                    window.store.set({ loginUser: inputValue });

                    if (REGEXP_LOGIN.test(this.props.loginUser)) {
                        this.children.RemovingUsersBlock.children.formBody.setProps({
                            error: false,
                            errorText: null,
                        });
                    } else {
                        this.children.RemovingUsersBlock.children.formBody.setProps({
                            error: true,
                            errorText: 'Используйте только буквы, начиная с заглавной',
                        });
                    }
                },
                name: 'title',
            }),
            title: 'Удалить пользователя',
            users: this.props.users,
            onSubmit: async (e: Event) => {
                e.preventDefault();

                const focusableElements = document.querySelectorAll('input');

                focusableElements.forEach((element) => {
                    element.blur();
                });

                if (REGEXP_LOGIN.test(this.props.loginUser)) {
                    const user = await searchUser({
                        login: this.props.loginUser,
                    });

                    if (!user?.length || !this.props.selectedChat) {
                        this.children.RemovingUsersBlock.children.formBody.setProps({
                            error: true,
                            errorText: 'Такой логин не существует',
                        });
                        return;
                    }

                    removeUsers({
                        chatId: this.props.selectedChat.id,
                        users: [user[0].id],
                    });

                    this.children.RemovingUsersBlock.setProps({ showModal: false });
                }
            },
        });

        const DeletingChatBlock = new FormModal({
            title: 'Удалить чат?',
            label: 'Удалить',
            onSubmit: async (e: Event) => {
                e.preventDefault();

                await deleteChat({ chatId: this.props.selectedChat.id });
                this.children.DeletingChatBlock.setProps({ showModal: false });
                getChats();
            },
        });

        const DeleteChat = new Icon({
            src: DeleteChatIcon,
            size: 's',
            events: {
                click: () => {
                    if (this.props.selectedChat) {
                        this.children.DeletingChatBlock.setProps({ showModal: true });
                    }
                },
            },
        });

        this.children = {
            ...this.children,
            Avatar,
            AddUser,
            AddingUsersBlock,
            RemovingUsersBlock,
            RemoveUser,
            EditPhotoBlock,
            DeletingChatBlock,
            DeleteChat,
        };
    }

    componentDidUpdate(oldProps: Props, newProps: Props): boolean | { [x: string]: unknown; } {
        if (isEqual(oldProps, newProps)) {
            return false;
        }

        if (oldProps.selectedChat?.title !== newProps.selectedChat?.title) {
            this.setProps({
                ...newProps,
                title: newProps.selectedChat?.title,
            });
        }

        if (oldProps.selectedChat?.avatar !== newProps.selectedChat?.avatar) {
            this.children.Avatar.setProps({
                avatar: newProps.selectedChat?.avatar,
            });
        }

        return true;
    }

    render(): string {
        return (`
            <div class="main-panel-chat-top">
                {{{ AddingUsersBlock }}}
                {{{ RemovingUsersBlock }}}
                {{{ EditPhotoBlock }}}
                {{{ DeletingChatBlock }}}
                <div class="main-panel-chat-top__avatar">{{{ Avatar }}}</div>
                <p class="main-panel-chat-top__user-name">{{ title }}</p>
                <div class="main-panel-chat-top__settings">
                    {{{ AddUser }}}{{{ RemoveUser }}}{{{ DeleteChat }}}
                </div>
            </div>
        `);
    }
}

const mapStateToProps = ({ selectedChat, loginUser, userData }:
    { loginUser: string; selectedChat: SelectedChat, userData: UserDTO }) =>
    ({ selectedChat, loginUser, userData });

export default connect(mapStateToProps)(MainPanelChatTop);
